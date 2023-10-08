import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'
import fs from 'node:fs'

const [inFileName, outFileName] = process.argv.filter((arg) => {
  return !arg.endsWith('node') && !__filename.endsWith(arg)
})

if (!outFileName) {
  console.log('2 arguments must be provided: inFileName, outFileName')
  process.exit(1)
}

const main = async () => {
  console.log('opening file stream')
  const inStream = fs.createReadStream(inFileName)

  let gameCount = 0
  let gps = 0
  const result = new Map<string, string[][]>()
  let start = performance.now()

  inStream.on('data', (chunk) => {
    const fileString = chunk.toString('utf8')
    const games = fileString.split('\n\n[').map((game) => `[${game}`)

    for (let i = 0; i < games.length; i++) {
      try {
        const game = games[i].trim()

        if (performance.now() - start > 1000) {
          start = performance.now()
          console.log('game', gameCount, 'gps', gps)
          gps = 0
        }

        const [metadataString, pgn] = game.split('\n\n')

        const metadata = {}

        metadataString.split('\n').forEach((metadataLine) => {
          const [key, ...values] = metadataLine
            .substring(1, metadataLine.length - 1)
            .split(' ')

          const value = values.join(' ')

          metadata[key] = value.substring(1, value.length - 1)
        })

        if ('Opening' in metadata && typeof metadata.Opening === 'string') {
          const knownOpening = result.get(metadata['Opening'])

          if (knownOpening && knownOpening.length > 10) {
            gameCount++
            gps++
            continue
          }

          if (!pgn) {
            gameCount++
            gps++
            continue
          }

          const tokens = Notation.tokenize(pgn).filter(
            (token) =>
              token.kind !== 'game-over' &&
              token.kind !== 'checkmate' &&
              token.kind !== 'draw-offer' &&
              token.kind !== 'comment' &&
              token.kind !== 'annotation-symbol'
          )
          const ast = Notation.parse(tokens)
          const fens: string[] = []

          const virtualBoard = new Board()
          virtualBoard.importAFEN(AfenPreset.VanillaDefault)

          ast.children.forEach((node) => {
            virtualBoard.executeMoveIndex(
              Board.findMoveIndex(virtualBoard.getValidMoves(), node)
            )
            fens.push(virtualBoard.toAFEN({ sections: ['positions'] }))
          })

          if (knownOpening) {
            result.set(metadata['Opening'], [...knownOpening, fens])
          } else {
            result.set(metadata['Opening'], [fens])
          }
        }
      } catch {
        //
      }

      gameCount++
      gps++
    }
  })

  inStream.on('end', () => {
    const openings = [...result]
    const out = new Map<string, string[]>()

    for (const opening of openings) {
      const [name, pgnsOrUndefineds] = opening
      const pgns = pgnsOrUndefineds.filter(Boolean)

      if (pgns.length < 10) {
        continue
      }

      pgns.sort((a, b) => a.length - b.length)

      out.set(name, pgns.at(0))
    }

    console.log('clearing output file')
    fs.writeFileSync(outFileName, '', 'utf8')
    const outStream = fs.createWriteStream(outFileName)

    outStream.write(JSON.stringify([...out]))
    console.log('end')
  })
}

main().catch((error) => {
  console.error(error)

  process.exitCode = 1
})
