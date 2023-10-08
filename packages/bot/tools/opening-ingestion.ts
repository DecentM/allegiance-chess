import { AfenPreset, Board, Notation } from '@decentm/allegiance-chess-core'
import fs from 'node:fs/promises'

const [inFileName, outFileName] = process.argv.filter((arg) => {
  return !arg.endsWith('node') && !__filename.endsWith(arg)
})

if (!outFileName) {
  console.log('2 arguments must be provided: inFileName, outFileName')
  process.exit(1)
}

const main = async () => {
  console.log('opening file stream')
  const inFile = await fs.readFile(inFileName)

  let count = 0
  let cps = 0
  const result = new Map<string, string[]>()
  let start = performance.now()

  const fileString = inFile.toString('utf8')
  const openings = fileString.split('\n').map((game) => `[${game}`)

  for (let i = 0; i < openings.length; i++) {
    try {
      const opening = openings[i].trim()

      if (performance.now() - start > 1000) {
        start = performance.now()
        console.log('opening', count, 'cps', cps)
        cps = 0
      }

      const [, name, pgn] = opening.split('\t')

      if (!pgn) {
        count++
        cps++
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

      result.set(name, fens)
    } catch {
      //
    }

    count++
    cps++
  }

  console.log('writing output file')

  await fs.writeFile(outFileName, JSON.stringify([...result]), 'utf8')
  console.log('end')
}

main().catch((error) => {
  console.error(error)

  process.exitCode = 1
})
