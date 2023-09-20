import VError from 'verror'

import { Rank } from '../notation/declarations'
import {
  AllegianceNode,
  AnyMoveNode,
  CaptureNode,
  CastleNode,
  Coordinates,
  DefaultNode,
  EnPassantNode,
  MoveNode,
  Node,
  PromotionNode,
} from '../notation/parser'
import { Vector2 } from '../lib/vector2'
import { BoardMemory, BoardSquare } from './board-memory'
import { coordinatesEqual } from '../lib/coordinate'
import { allegianceSide } from '../lib/allegiance'

export const PieceAllegiance = {
  Black: 0,
  DarkGrey: 1,
  LightGrey: 2,
  White: 3,
} as const

export type PieceAllegiance =
  (typeof PieceAllegiance)[keyof typeof PieceAllegiance]

type ExecuteMoveTypeInput<NodeType extends MoveNode<string | void>> = {
  node: NodeType
  from: BoardSquare
  to: BoardSquare
  fromSide: 'white' | 'black'
  toSide: 'white' | 'black'
}

export class Board {
  private memory: BoardMemory

  public clone() {
    const board = new Board()

    board.memory = this.memory.clone()

    return board
  }

  public dump() {
    return this.memory.dump()
  }

  public importAFEN(afen: string) {
    this.memory.importAFEN(afen)
  }

  public toAFEN() {
    return this.memory.toAFEN()
  }

  public getSquares() {
    return this.memory.getSquares()
  }

  public get enPassantTarget() {
    return this.memory.enPassantTarget
  }

  constructor() {
    this.memory = new BoardMemory()
  }

  private executeAllegianceMoveNode(
    input: ExecuteMoveTypeInput<AllegianceNode>
  ) {
    this.memory.setSquare(input.node.to, {
      allegiance: (input.fromSide === 'white'
        ? input.to.allegiance + 1
        : input.to.allegiance - 1) as PieceAllegiance,
      piece: input.to.piece,
    })
  }

  private executeCaptureMoveNode(input: ExecuteMoveTypeInput<CaptureNode>) {
    this.memory.setSquare(input.node.to, input.from)
    this.memory.setSquare(input.node.from, null)

    this.memory.removeCastlingRights(input.node.from)
    this.memory.removeCastlingRights(input.node.to)
  }

  private executeCastleMoveNode(input: ExecuteMoveTypeInput<CastleNode>) {
    const rank: Rank = input.fromSide === 'white' ? 1 : 8
    const rookCoords: Coordinates =
      input.node.side === 'king' ? { file: 8, rank } : { file: 1, rank }

    const king = input.from
    const rook = this.memory.getSquare(rookCoords)

    const kingToCoords: Coordinates =
      input.node.side === 'king' ? { file: 7, rank } : { file: 3, rank }

    const rookToCoords: Coordinates =
      input.node.side === 'king' ? { file: 6, rank } : { file: 4, rank }

    this.memory.setSquare(kingToCoords, king)
    this.memory.setSquare(rookToCoords, rook)
    this.memory.setSquare(rookCoords, null)
    this.memory.setSquare(input.node.from, null)

    this.memory.removeCastlingRights(input.node.from)
    this.memory.removeCastlingRights(rookCoords)
  }

  private executeEnPassantMoveNode(input: ExecuteMoveTypeInput<EnPassantNode>) {
    this.memory.setSquare(
      {
        rank: (input.fromSide === 'white'
          ? input.node.to.rank - 1
          : input.node.to.rank + 1) as Rank,
        file: input.node.to.file,
      },
      null
    )

    this.memory.setSquare(input.node.to, input.from)
    this.memory.setSquare(input.node.from, null)
  }

  private executePromotionMoveNode(input: ExecuteMoveTypeInput<PromotionNode>) {
    this.memory.setSquare(input.node.to, {
      allegiance: input.from.allegiance,
      piece: input.node.promotionTo,
    })
    this.memory.setSquare(input.node.from, null)
  }

  private executeDefaultMoveNode(input: ExecuteMoveTypeInput<DefaultNode>) {
    this.memory.setSquare(input.node.from, null)
    this.memory.setSquare(input.node.to, input.from)

    if (
      input.node.piece === null &&
      Math.abs(input.node.from.rank - input.node.to.rank) === 2
    ) {
      this.memory.enPassantTarget = {
        file: input.node.from.file,
        rank: (input.fromSide === 'white'
          ? input.node.from.rank + 1
          : input.node.from.rank - 1) as Rank,
      }
    }
  }

  private executeMoveNode(node: AnyMoveNode) {
    if (!node.from.file) {
      throw new VError(
        `Cannot execute node without "from.file": ${JSON.stringify(
          node,
          null,
          2
        )}`
      )
    }

    const from = this.memory.getSquare(node.from)
    const to = this.memory.getSquare(node.to)

    if (!from) {
      throw new VError(
        `There is no piece on file ${node.from.file} rank ${node.from.rank}`
      )
    }

    this.memory.enPassantTarget = null

    const fromSide = allegianceSide(from.allegiance)
    const toSide = to ? allegianceSide(to.allegiance) : null

    // TODO: Non-capture and non-allegiance nodes should check if their targets
    // TODO  are empty

    switch (node.type) {
      case 'allegiance':
        this.executeAllegianceMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        })
        break

      case 'capture':
        this.executeCaptureMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        })
        break

      case 'castle':
        this.executeCastleMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        })
        break

      case 'en-passant':
        this.executeEnPassantMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        })
        break

      case 'promotion':
        this.executePromotionMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        })
        break

      default:
        this.executeDefaultMoveNode({
          from,
          to,
          fromSide,
          toSide,
          node,
        })
        break
    }

    if (this.memory.activeColour === 'white') this.memory.halfmoveClock++

    this.memory.fullmoveNumber++

    this.memory.activeColour =
      this.memory.activeColour === 'white' ? 'black' : 'white'
  }

  public executeInferredNode(node: Node) {
    switch (node.kind) {
      case 'move': {
        this.executeMoveNode(node)

        break
      }
    }
  }

  public executeNode(node: Partial<Node>) {
    const fullNode = this.inferNode(node)

    this.executeInferredNode(fullNode)
  }

  public executeNodes(nodes: Node[]) {
    nodes.forEach((node) => {
      this.executeNode(node)
    })
  }

  public getSquare(coords: Coordinates) {
    return this.memory.getSquare(coords)
  }

  public inferNode(node: Partial<Node>): Node {
    if (node.kind !== 'move') {
      return node as Node
    }

    // No inferrence needed on fully qualified nodes
    if (
      node.from &&
      Object.keys(node.from).length === 2 &&
      node.to &&
      Object.keys(node.to).length === 2 &&
      (node.piece || node.piece === null)
    ) {
      return node as Node
    }

    if (node.type === 'castle') {
      const side = this.memory.activeColour
      const rank = side === 'white' ? 1 : 8

      return {
        kind: 'move',
        type: 'castle',
        side: node.side,
        piece: 'K',
        from: side === 'white' ? { rank, file: 5 } : { rank, file: 5 },
        to: node.side === 'king' ? { rank, file: 7 } : { rank, file: 3 },
      }
    }

    const result: Partial<Node> = { ...node }

    const possibleMoves: MoveNode[] = (
      this.getPossibleMoves().filter(
        (move) => move.kind === 'move'
      ) as MoveNode[]
    ).filter((moveNode) => {
      const square = this.memory.getSquare(moveNode.from)

      return allegianceSide(square.allegiance) === this.memory.activeColour
    })

    let moves = possibleMoves

    if (node.to && Object.keys(node.to).length === 2) {
      moves = moves.filter((validMove) =>
        coordinatesEqual(validMove.to, node.to)
      )
    }

    if (node.from && Object.keys(node.from).length === 2) {
      moves = moves.filter((validMove) =>
        coordinatesEqual(validMove.from, node.from)
      )
    }

    if (node.piece || node.piece === null) {
      moves = moves.filter((validMove) => validMove.piece === node.piece)
    } else if (moves.length > 1 && !node.piece) {
      // If there are multiple valid moves for this node but the node has no
      // piece defined, we can assume it's a pawn
      moves = moves.filter((validMove) => validMove.piece === null)
    }

    if (moves.length > 1) {
      throw new VError(
        `Move node is not qualified enough for this board. Matching valid moves: ${
          moves.length
        }. Node: ${JSON.stringify({
          from: node.from,
          to: node.to,
          piece: node.piece,
        })}`
      )
    }

    if (moves.length === 1) {
      const move = moves[0]

      result.from = move.from
      result.to = move.to
      result.piece = move.piece
    }

    if (moves.length === 0) {
      throw new VError(
        `Move node does not qualify a valid move: ${JSON.stringify({
          from: node.from,
          to: node.to,
          piece: node.piece,
        })}`
      )
    }

    return result as Node
  }

  private getCoordsRelative(
    coords: Coordinates,
    direction: Vector2
  ): Coordinates {
    // Not typed as Coords because we don't know if it's valid yet
    const newCoords = {
      file: coords.file + direction.x,
      rank: coords.rank + direction.y,
    }

    if (newCoords.file > 8 || newCoords.file <= 0) {
      return null
    }

    if (newCoords.rank > 8 || newCoords.rank <= 0) {
      return null
    }

    return newCoords as Coordinates
  }

  public traceCaptureSteps(
    coords: Coordinates,
    direction: Vector2
  ): Coordinates[] {
    if (
      Math.abs(direction.x) !== Math.abs(direction.y) &&
      direction.x !== 0 &&
      direction.y !== 0
    ) {
      throw new VError('Cannot trace in a non-continuous direction')
    }

    const startSquare = this.memory.getSquare(coords)

    if (!startSquare) {
      // No captures can be made from a square with no piece on it
      return []
    }

    const steps: Coordinates[] = []
    const singleStepVector = new Vector2(
      Math.sign(direction.x),
      Math.sign(direction.y)
    )

    let currentCoords = coords

    // eslint-disable-next-line no-constant-condition
    while (true) {
      currentCoords = this.getCoordsRelative(currentCoords, singleStepVector)

      if (!currentCoords) {
        break
      }

      const currentSquare = this.memory.getSquare(currentCoords)

      if (!currentSquare) {
        steps.push({ ...currentCoords })
        continue
      }

      if (
        // Cannot capture own piece
        allegianceSide(currentSquare.allegiance) ===
        allegianceSide(startSquare.allegiance)
      ) {
        break
      }

      if (
        // Can capture enemy piece, but not beyond
        allegianceSide(currentSquare.allegiance) !==
        allegianceSide(startSquare.allegiance)
      ) {
        steps.push({ ...currentCoords })

        break
      }

      steps.push({ ...currentCoords })
    }

    return steps
  }

  private getPossibleMoves(): Node[] {
    const result: Node[] = []
    const squares = this.memory.getSquares()

    squares.forEach((square) => {
      // No piece on square
      if (!square) {
        return
      }

      const side = allegianceSide(square.allegiance)

      /**
       * PAWN
       */
      if (square.piece === null) {
        const inFront = this.getCoordsRelative(
          square,
          new Vector2(0, side === 'white' ? 1 : -1)
        )

        const diagLeft = this.getCoordsRelative(
          square,
          new Vector2(side === 'white' ? -1 : 1, side === 'white' ? 1 : -1)
        )

        const diagRight = this.getCoordsRelative(
          square,
          new Vector2(side === 'white' ? 1 : -1, side === 'white' ? 1 : -1)
        )

        if (
          this.memory.enPassantTarget &&
          diagLeft &&
          coordinatesEqual(this.memory.enPassantTarget, diagLeft)
        ) {
          result.push({
            kind: 'move',
            type: 'en-passant',
            from: square,
            to: this.memory.enPassantTarget,
            piece: this.memory.getSquare(square).piece,
          })
        }

        if (
          this.memory.enPassantTarget &&
          diagRight &&
          coordinatesEqual(this.memory.enPassantTarget, diagRight)
        ) {
          result.push({
            kind: 'move',
            type: 'en-passant',
            from: square,
            to: this.memory.enPassantTarget,
            piece: this.memory.getSquare(square).piece,
          })
        }

        if (inFront && !this.memory.getSquare(inFront)) {
          result.push({
            kind: 'move',
            type: null,
            piece: this.memory.getSquare(square).piece,
            from: square,
            to: inFront,
          })
        }

        if (diagLeft) {
          const diagLeftSquare = this.memory.getSquare(diagLeft)

          if (
            diagLeftSquare &&
            allegianceSide(diagLeftSquare.allegiance) !== side
          ) {
            result.push({
              kind: 'move',
              type: 'capture',
              from: square,
              to: diagLeft,
              piece: this.memory.getSquare(square).piece,
            })
          }
        }

        if (diagRight) {
          const diagRightSquare = this.memory.getSquare(diagRight)

          if (
            diagRightSquare &&
            allegianceSide(diagRightSquare.allegiance) !== side
          ) {
            result.push({
              kind: 'move',
              type: 'capture',
              from: square,
              to: diagRight,
              piece: this.memory.getSquare(square).piece,
            })
          }
        }

        // TODO: Scan for promotions and self-checks after all steps are
        // TODO  calculated

        // Starting jump
        if (
          (square.rank === 2 && side === 'white') ||
          (square.rank === 7 && side === 'black')
        ) {
          const inFront2 = this.getCoordsRelative(
            square,
            new Vector2(0, side === 'white' ? 2 : -2)
          )

          if (
            !this.memory.getSquare(inFront) &&
            !this.memory.getSquare(inFront2)
          ) {
            result.push({
              kind: 'move',
              type: null,
              from: square,
              to: inFront2,
              piece: this.memory.getSquare(square).piece,
            })
          }
        }
      }

      /**
       * ROOK
       */
      if (square.piece === 'R') {
        const steps: Coordinates[] = [
          // X pos
          ...this.traceCaptureSteps(square, new Vector2(1, 0)),
          // X neg
          ...this.traceCaptureSteps(square, new Vector2(-1, 0)),
          // Y pos
          ...this.traceCaptureSteps(square, new Vector2(0, 1)),
          // Y neg
          ...this.traceCaptureSteps(square, new Vector2(0, -1)),
        ]

        result.push(
          ...steps.map((step) => {
            const target = this.memory.getSquare(step)

            return {
              kind: 'move',
              type: target ? 'capture' : null,
              from: square,
              to: step,
              piece: square.piece,
            } as const
          })
        )
      }

      /**
       * KNIGHT
       */
      if (square.piece === 'N') {
        const targets = [
          this.getCoordsRelative(square, new Vector2(1, 2)),
          this.getCoordsRelative(square, new Vector2(2, 1)),
          this.getCoordsRelative(square, new Vector2(2, -1)),
          this.getCoordsRelative(square, new Vector2(1, -2)),
          this.getCoordsRelative(square, new Vector2(-1, -2)),
          this.getCoordsRelative(square, new Vector2(-2, -1)),
          this.getCoordsRelative(square, new Vector2(-2, 1)),
          this.getCoordsRelative(square, new Vector2(-1, 2)),
        ].filter(Boolean)

        targets.forEach((target) => {
          const targetSquare = this.memory.getSquare(target)

          if (
            targetSquare &&
            allegianceSide(targetSquare.allegiance) === side
          ) {
            return
          }

          result.push({
            kind: 'move',
            type: targetSquare ? 'capture' : null,
            from: square,
            to: target,
            piece: square.piece,
          })
        })
      }

      /**
       * BISHOP
       */
      if (square.piece === 'B') {
        const steps: Coordinates[] = [
          // NE
          ...this.traceCaptureSteps(square, new Vector2(1, 1)),
          // SE
          ...this.traceCaptureSteps(square, new Vector2(1, -1)),
          // SW
          ...this.traceCaptureSteps(square, new Vector2(-1, -1)),
          // NW
          ...this.traceCaptureSteps(square, new Vector2(-1, 1)),
        ]

        result.push(
          ...steps.map((step) => {
            const target = this.memory.getSquare(step)

            return {
              kind: 'move',
              type: target ? 'capture' : null,
              from: square,
              to: step,
              piece: square.piece,
            } as const
          })
        )
      }

      /**
       * QUEEN
       */
      if (square.piece === 'Q') {
        const steps: Coordinates[] = [
          // X pos
          ...this.traceCaptureSteps(square, new Vector2(1, 0)),
          // X neg
          ...this.traceCaptureSteps(square, new Vector2(-1, 0)),
          // Y pos
          ...this.traceCaptureSteps(square, new Vector2(0, 1)),
          // Y neg
          ...this.traceCaptureSteps(square, new Vector2(0, -1)),
          // NE
          ...this.traceCaptureSteps(square, new Vector2(1, 1)),
          // SE
          ...this.traceCaptureSteps(square, new Vector2(1, -1)),
          // SW
          ...this.traceCaptureSteps(square, new Vector2(-1, -1)),
          // NW
          ...this.traceCaptureSteps(square, new Vector2(-1, 1)),
        ]

        result.push(
          ...steps.map((step) => {
            const target = this.memory.getSquare(step)

            return {
              kind: 'move',
              type: target ? 'capture' : null,
              from: square,
              to: step,
              piece: square.piece,
            } as const
          })
        )
      }

      /**
       * KING
       */
      if (square.piece === 'K') {
        const possibleMoves: Coordinates[] = [
          this.getCoordsRelative(square, new Vector2(0, 1)),
          this.getCoordsRelative(square, new Vector2(1, 1)),
          this.getCoordsRelative(square, new Vector2(1, 0)),
          this.getCoordsRelative(square, new Vector2(1, -1)),
          this.getCoordsRelative(square, new Vector2(0, -1)),
          this.getCoordsRelative(square, new Vector2(-1, -1)),
          this.getCoordsRelative(square, new Vector2(-1, 0)),
          this.getCoordsRelative(square, new Vector2(-1, 1)),
        ].filter(Boolean)

        possibleMoves.forEach((possibleMove) => {
          const toSquare = this.memory.getSquare(possibleMove)

          if (toSquare && allegianceSide(toSquare.allegiance) === side) {
            return
          }

          result.push({
            kind: 'move',
            type: toSquare ? 'capture' : null,
            from: square,
            to: possibleMove,
            piece: square.piece,
          })
        })

        const whiteCastling = this.memory.castlingRights('white')

        whiteCastling.forEach((castling) => {
          if (castling === 'king') {
            result.push({
              kind: 'move',
              type: 'castle',
              from: square,
              to: this.getCoordsRelative(square, new Vector2(2, 0)),
              piece: this.memory.getSquare(square).piece,
              side: 'king',
            })
          }

          if (castling === 'queen') {
            result.push({
              kind: 'move',
              type: 'castle',
              from: square,
              to: this.getCoordsRelative(square, new Vector2(-2, 0)),
              piece: this.memory.getSquare(square).piece,
              side: 'queen',
            })
          }
        })

        const blackCastling = this.memory.castlingRights('black')

        blackCastling.forEach((castling) => {
          if (castling === 'king') {
            result.push({
              kind: 'move',
              type: 'castle',
              from: square,
              to: this.getCoordsRelative(square, new Vector2(2, 0)),
              piece: this.memory.getSquare(square).piece,
              side: 'king',
            })
          }

          if (castling === 'queen') {
            result.push({
              kind: 'move',
              type: 'castle',
              from: square,
              to: this.getCoordsRelative(square, new Vector2(-2, 0)),
              piece: this.memory.getSquare(square).piece,
              side: 'queen',
            })
          }
        })
      }
    })

    return result
  }

  private getCheckMoves(): Node[] {
    const moves = this.getPossibleMoves()

    return moves.filter((move) => {
      if (move.kind !== 'move') {
        return
      }

      const targetSquare = this.memory.getSquare(move.to)

      return targetSquare && targetSquare.piece === 'K'
    })
  }

  public getValidMoves(): Node[] {
    const moveNodes = this.getPossibleMoves()

    return moveNodes.filter((moveNode) => {
      if (moveNode.kind !== 'move') {
        return false
      }

      const fromSquare = this.memory.getSquare(moveNode.from)

      // Filter out moves that the other side makes
      if (allegianceSide(fromSquare.allegiance) !== this.memory.activeColour) {
        return false
      }

      // Sets up a clone of the board with this move applied so wee can scan for
      // checks
      const virtualBoard = this.clone()
      virtualBoard.executeInferredNode(moveNode)

      const checkMoveNodes = virtualBoard.getCheckMoves()

      // Filter out moves that would result in us getting checked
      return checkMoveNodes.every((checkMoveNode) => {
        if (checkMoveNode.kind !== 'move') {
          return false
        }

        const toSquare = virtualBoard.memory.getSquare(checkMoveNode.to)

        return allegianceSide(toSquare.allegiance) !== this.memory.activeColour
      })
    })
  }
}
