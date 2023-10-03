import VError from 'verror'

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
import { coordinatesEqual } from '../lib/coordinate'
import { allegianceSide } from '../lib/allegiance'
import { isPromotion } from '../lib/board'

import * as Notation from '../notation'
import * as Afen from '../afen'

import { BoardMemory, BoardSquare } from './board-memory'

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

export const PROMOTION_PIECES: Notation.Piece[] = ['B', 'N', 'Q', 'R']

export class Board {
  private memory: BoardMemory

  public clone() {
    const board = new Board()

    board.memory = this.memory.clone()
    board.lastKnownValidMoves = this.lastKnownValidMoves

    return board
  }

  public dump() {
    return this.memory.dump()
  }

  public importAFEN(afen: string) {
    this.memory.fromAFEN(Afen.parse(Afen.tokenize(afen)))
  }

  public importMoveHistory(history: string) {
    this.memory.moveHistory = Notation.parse(Notation.tokenize(history))
  }

  public toAFEN() {
    return Afen.write(this.memory.toAFEN())
  }

  public getSquares() {
    return this.memory.getSquares()
  }

  public get enPassantTarget() {
    return this.memory.enPassantTarget
  }

  public get activeColour() {
    return this.memory.activeColour
  }

  public get halfmoveClock() {
    return this.memory.halfmoveClock
  }

  public get fullmoveNumber() {
    return this.memory.fullmoveNumber
  }

  public get castlingRights() {
    return {
      black: this.memory.castlingRights('black'),
      white: this.memory.castlingRights('white'),
    }
  }

  public getMoveHistory() {
    return Notation.write(this.memory.moveHistory)
  }

  public getMoveHistoryAst() {
    return this.memory.moveHistory
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
  }

  private executeCastleMoveNode(input: ExecuteMoveTypeInput<CastleNode>) {
    const kingFrom = input.node.from
    const kingTo = input.node.to

    const king = input.from
    const to = input.to

    if (to) {
      throw new VError(
        `Castling cannot cause a capture on ${JSON.stringify(input.node.to)}`
      )
    }

    this.memory.setSquare(kingTo, king)
    this.memory.setSquare(kingFrom, null)

    const rank: Notation.Rank = input.fromSide === 'white' ? 1 : 8
    const rookFrom: Coordinates =
      input.node.side === 'king' ? { file: 8, rank } : { file: 1, rank }
    const rookTo: Coordinates =
      input.node.side === 'king' ? { file: 6, rank } : { file: 4, rank }

    this.memory.setSquare(rookTo, this.memory.getSquare(rookFrom))
    this.memory.setSquare(rookFrom, null)
  }

  private executeEnPassantMoveNode(input: ExecuteMoveTypeInput<EnPassantNode>) {
    this.memory.setSquare(
      {
        rank: (input.fromSide === 'white'
          ? input.node.to.rank - 1
          : input.node.to.rank + 1) as Notation.Rank,
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
          : input.node.from.rank - 1) as Notation.Rank,
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

    if (from.piece === 'K') {
      this.memory.removeCastlingRights(this.activeColour, 'king')
      this.memory.removeCastlingRights(this.activeColour, 'queen')
    }

    if (from.piece === 'R' && node.from.file === 8) {
      this.memory.removeCastlingRights(this.activeColour, 'king')
    }

    if (from.piece === 'R' && node.from.file === 1) {
      this.memory.removeCastlingRights(this.activeColour, 'queen')
    }

    this.memory.enPassantTarget = null

    const fromSide = allegianceSide(from.allegiance)
    const toSide = to ? allegianceSide(to.allegiance) : null

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

    if (this.memory.activeColour === 'black') this.memory.halfmoveClock++

    this.memory.fullmoveNumber++

    this.memory.activeColour =
      this.memory.activeColour === 'white' ? 'black' : 'white'
  }

  private executeNode(node: Node) {
    switch (node.kind) {
      case 'move': {
        this.executeMoveNode(node)

        break
      }
    }

    this.memory.moveHistory.children.push(node)
    this.lastKnownValidMoves = null
  }

  public executeMoveIndex(moveIndex: number) {
    if (moveIndex < 0) {
      throw new VError(`Move index must be positive, got ${moveIndex}`)
    }

    const moves = this.getValidMoves()
    const move = moves.at(moveIndex)

    if (!move) {
      throw new VError(`Move with index ${moveIndex} does not exist`)
    }

    this.executeNode(move)

    return move
  }

  public getSquare(coords: Coordinates) {
    return this.memory.getSquare(coords)
  }

  public findMoveIndex(node: Partial<Node>): number {
    const validMoves = this.getValidMoves()

    let moves = validMoves

    if (node.kind === 'draw-offer') {
      moves = moves.filter((move) => move.kind === 'draw-offer')
    }

    if (node.kind === 'game-over') {
      moves = moves.filter(
        (move) => move.kind === 'game-over' && move.outcome === node.outcome
      )
    }

    if (node.kind === 'move') {
      if (node.to && Object.keys(node.to).length === 2) {
        moves = moves.filter(
          (validMove) =>
            validMove.kind === 'move' && coordinatesEqual(validMove.to, node.to)
        )
      }

      if (node.from && Object.keys(node.from).length === 2) {
        moves = moves.filter(
          (validMove) =>
            validMove.kind === 'move' &&
            coordinatesEqual(validMove.from, node.from)
        )
      }

      if (node.type) {
        moves = moves.filter(
          (move) => 'type' in move && move.type === node.type
        )
      }

      if (node.piece || node.piece === null) {
        moves = moves.filter(
          (validMove) =>
            validMove.kind === 'move' && validMove.piece === node.piece
        )
      } else if (moves.length > 1 && !node.piece) {
        // If there are multiple valid moves for this node but the node has no
        // piece defined, we can assume it's a pawn
        moves = moves.filter(
          (validMove) => validMove.kind === 'move' && validMove.piece === null
        )
      }

      if (node.type === 'promotion') {
        moves = moves.filter(
          (validMove) =>
            'promotionTo' in validMove &&
            validMove.promotionTo === node.promotionTo &&
            coordinatesEqual(validMove.to, node.to) &&
            coordinatesEqual(validMove.from, node.from)
        )
      }
    }

    if (moves.length === 1) {
      return validMoves.indexOf(moves[0])
    }

    return -1
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

  private getAttackedCoordsBySide(bySide: 'white' | 'black') {
    const pieces = this.memory.getSquares().filter((square) => {
      return square && allegianceSide(square.allegiance) === bySide
    })

    const result: Coordinates[] = []

    pieces.forEach((piece) => {
      result.push(...this.getAttackedCoordsByCoords(piece))
    })

    return result
  }

  private getAttackedCoordsByCoords(byCoords: Coordinates): Coordinates[] {
    const result: Coordinates[] = []
    const bySquare = this.memory.getSquare(byCoords)

    if (!bySquare) {
      return result
    }

    const side = allegianceSide(bySquare.allegiance)

    if (bySquare.piece === null) {
      const diagLeft = this.getCoordsRelative(
        byCoords,
        new Vector2(side === 'white' ? -1 : 1, side === 'white' ? 1 : -1)
      )

      const diagRight = this.getCoordsRelative(
        byCoords,
        new Vector2(side === 'white' ? 1 : -1, side === 'white' ? 1 : -1)
      )

      return [diagLeft, diagRight]
    }

    if (bySquare.piece === 'R') {
      return [
        // X pos
        ...this.traceCaptureSteps(byCoords, new Vector2(1, 0)),
        // X neg
        ...this.traceCaptureSteps(byCoords, new Vector2(-1, 0)),
        // Y pos
        ...this.traceCaptureSteps(byCoords, new Vector2(0, 1)),
        // Y neg
        ...this.traceCaptureSteps(byCoords, new Vector2(0, -1)),
      ].filter(Boolean)
    }

    if (bySquare.piece === 'N') {
      return [
        this.getCoordsRelative(byCoords, new Vector2(1, 2)),
        this.getCoordsRelative(byCoords, new Vector2(2, 1)),
        this.getCoordsRelative(byCoords, new Vector2(2, -1)),
        this.getCoordsRelative(byCoords, new Vector2(1, -2)),
        this.getCoordsRelative(byCoords, new Vector2(-1, -2)),
        this.getCoordsRelative(byCoords, new Vector2(-2, -1)),
        this.getCoordsRelative(byCoords, new Vector2(-2, 1)),
        this.getCoordsRelative(byCoords, new Vector2(-1, 2)),
      ].filter(Boolean)
    }

    if (bySquare.piece === 'B') {
      return [
        // NE
        ...this.traceCaptureSteps(byCoords, new Vector2(1, 1)),
        // SE
        ...this.traceCaptureSteps(byCoords, new Vector2(1, -1)),
        // SW
        ...this.traceCaptureSteps(byCoords, new Vector2(-1, -1)),
        // NW
        ...this.traceCaptureSteps(byCoords, new Vector2(-1, 1)),
      ].filter(Boolean)
    }

    if (bySquare.piece === 'Q') {
      return [
        // X pos
        ...this.traceCaptureSteps(byCoords, new Vector2(1, 0)),
        // X neg
        ...this.traceCaptureSteps(byCoords, new Vector2(-1, 0)),
        // Y pos
        ...this.traceCaptureSteps(byCoords, new Vector2(0, 1)),
        // Y neg
        ...this.traceCaptureSteps(byCoords, new Vector2(0, -1)),
        // NE
        ...this.traceCaptureSteps(byCoords, new Vector2(1, 1)),
        // SE
        ...this.traceCaptureSteps(byCoords, new Vector2(1, -1)),
        // SW
        ...this.traceCaptureSteps(byCoords, new Vector2(-1, -1)),
        // NW
        ...this.traceCaptureSteps(byCoords, new Vector2(-1, 1)),
      ].filter(Boolean)
    }

    if (bySquare.piece === 'K') {
      return [
        this.getCoordsRelative(byCoords, new Vector2(0, 1)),
        this.getCoordsRelative(byCoords, new Vector2(1, 1)),
        this.getCoordsRelative(byCoords, new Vector2(1, 0)),
        this.getCoordsRelative(byCoords, new Vector2(1, -1)),
        this.getCoordsRelative(byCoords, new Vector2(0, -1)),
        this.getCoordsRelative(byCoords, new Vector2(-1, -1)),
        this.getCoordsRelative(byCoords, new Vector2(-1, 0)),
        this.getCoordsRelative(byCoords, new Vector2(-1, 1)),
      ].filter(Boolean)
    }

    return result
  }

  private getPossibleMoves(): Node[] {
    const result: Node[] = []
    const squares = this.memory.getSquares()
    const coordsAttackedByOpponent = this.getAttackedCoordsBySide(
      this.activeColour === 'white' ? 'black' : 'white'
    )

    const hasGameOver = this.memory.moveHistory.children.some(
      (move) => move.kind === 'game-over'
    )

    if (!hasGameOver) {
      if (this.memory.activeColour === 'black') {
        result.push(
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.White,
          },
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.Draw,
          },
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.Forfeit,
          },
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.ForfeitWhite,
          }
        )
      }

      if (this.memory.activeColour === 'white') {
        result.push(
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.Black,
          },
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.Draw,
          },
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.Forfeit,
          },
          {
            kind: 'game-over',
            outcome: Notation.GameOutcome.ForfeitBlack,
          }
        )
      }

      result.push({ kind: 'draw-offer' })
    }

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

        const generatePossiblePromotionNodes = (to: Coordinates): Node[] => {
          return PROMOTION_PIECES.map((piece) => ({
            kind: 'move',
            type: 'promotion',
            from: square,
            to,
            piece: this.memory.getSquare(square).piece,
            promotionTo: piece,
          }))
        }

        if (
          this.memory.enPassantTarget &&
          diagLeft &&
          coordinatesEqual(this.memory.enPassantTarget, diagLeft) &&
          !isPromotion(diagLeft, side)
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
          coordinatesEqual(this.memory.enPassantTarget, diagRight) &&
          !isPromotion(diagRight, side)
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
          inFront &&
          !this.memory.getSquare(inFront) &&
          !isPromotion(inFront, side)
        ) {
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
            if (isPromotion(diagLeft, side)) {
              result.push(...generatePossiblePromotionNodes(diagLeft))
            } else {
              result.push(
                {
                  kind: 'move',
                  type: 'capture',
                  from: square,
                  to: diagLeft,
                  piece: this.memory.getSquare(square).piece,
                },
                {
                  kind: 'move',
                  type: 'allegiance',
                  from: square,
                  to: diagLeft,
                  piece: this.memory.getSquare(square).piece,
                }
              )
            }
          }
        }

        if (diagRight) {
          const diagRightSquare = this.memory.getSquare(diagRight)

          if (
            diagRightSquare &&
            allegianceSide(diagRightSquare.allegiance) !== side
          ) {
            if (isPromotion(diagRight, side)) {
              result.push(...generatePossiblePromotionNodes(diagRight))
            } else {
              result.push(
                {
                  kind: 'move',
                  type: 'capture',
                  from: square,
                  to: diagRight,
                  piece: this.memory.getSquare(square).piece,
                },
                {
                  kind: 'move',
                  type: 'allegiance',
                  from: square,
                  to: diagRight,
                  piece: this.memory.getSquare(square).piece,
                }
              )
            }
          }
        }

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

        // Promotions
        if (isPromotion(inFront, side)) {
          result.push(...generatePossiblePromotionNodes(inFront))
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
          }),

          ...steps
            .map((step) => {
              const target = this.memory.getSquare(step)

              if (!target) {
                return null
              }

              return {
                kind: 'move',
                type: 'allegiance',
                from: square,
                to: step,
                piece: square.piece,
              } as const
            })
            .filter(Boolean)
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

          if (targetSquare) {
            result.push({
              kind: 'move',
              type: 'allegiance',
              from: square,
              to: target,
              piece: square.piece,
            })
          }
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
          }),

          ...steps
            .map((step) => {
              const target = this.memory.getSquare(step)

              if (!target) {
                return null
              }

              return {
                kind: 'move',
                type: 'allegiance',
                from: square,
                to: step,
                piece: square.piece,
              } as const
            })
            .filter(Boolean)
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
          }),
          ...steps
            .map((step) => {
              const target = this.memory.getSquare(step)

              if (!target) {
                return null
              }

              return {
                kind: 'move',
                type: 'allegiance',
                from: square,
                to: step,
                piece: square.piece,
              } as const
            })
            .filter(Boolean)
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

          if (toSquare) {
            result.push({
              kind: 'move',
              type: 'allegiance',
              from: square,
              to: possibleMove,
              piece: square.piece,
            })
          }
        })

        const whiteCastling = this.memory.castlingRights('white')
        const checked = coordsAttackedByOpponent.some((attackedCoord) =>
          coordinatesEqual(square, attackedCoord)
        )

        if (this.activeColour === 'white' && whiteCastling.length > 0) {
          const a1 = this.memory.getSquare({ file: 1, rank: 1 })
          const b1 = this.memory.getSquare({ file: 2, rank: 1 })
          const c1 = this.memory.getSquare({ file: 3, rank: 1 })
          const d1 = this.memory.getSquare({ file: 4, rank: 1 })
          const f1 = this.memory.getSquare({ file: 6, rank: 1 })
          const g1 = this.memory.getSquare({ file: 7, rank: 1 })
          const h1 = this.memory.getSquare({ file: 8, rank: 1 })

          const b1Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 2,
              rank: 1,
            })
          )

          const c1Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 3,
              rank: 1,
            })
          )

          const d1Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 4,
              rank: 1,
            })
          )

          const f1Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 6,
              rank: 1,
            })
          )

          const g1Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 7,
              rank: 1,
            })
          )

          whiteCastling.forEach((castling) => {
            if (
              castling === 'king' &&
              !checked &&
              !f1 &&
              !g1 &&
              h1 &&
              h1.piece === 'R' &&
              allegianceSide(h1.allegiance) === 'white' &&
              !f1Attacked &&
              !g1Attacked
            ) {
              result.push({
                kind: 'move',
                type: 'castle',
                from: square,
                to: this.getCoordsRelative(square, new Vector2(2, 0)),
                piece: this.memory.getSquare(square).piece,
                side: 'king',
              })
            }

            if (
              castling === 'queen' &&
              !checked &&
              !b1 &&
              !c1 &&
              !d1 &&
              a1 &&
              a1.piece === 'R' &&
              allegianceSide(a1.allegiance) === 'white' &&
              !b1Attacked &&
              !c1Attacked &&
              !d1Attacked
            ) {
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

        const blackCastling = this.memory.castlingRights('black')

        if (this.activeColour === 'black' && blackCastling.length > 0) {
          const a8 = this.memory.getSquare({ file: 1, rank: 8 })
          const b8 = this.memory.getSquare({ file: 2, rank: 8 })
          const c8 = this.memory.getSquare({ file: 3, rank: 8 })
          const d8 = this.memory.getSquare({ file: 4, rank: 8 })
          const f8 = this.memory.getSquare({ file: 6, rank: 8 })
          const g8 = this.memory.getSquare({ file: 7, rank: 8 })
          const h8 = this.memory.getSquare({ file: 8, rank: 8 })

          const b8Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 2,
              rank: 8,
            })
          )

          const c8Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 3,
              rank: 8,
            })
          )

          const d8Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 4,
              rank: 8,
            })
          )

          const f8Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 6,
              rank: 8,
            })
          )

          const g8Attacked = coordsAttackedByOpponent.some((attackedCoord) =>
            coordinatesEqual(attackedCoord, {
              file: 7,
              rank: 8,
            })
          )

          blackCastling.forEach((castling) => {
            if (
              castling === 'king' &&
              !checked &&
              !f8 &&
              !g8 &&
              h8 &&
              h8.piece === 'R' &&
              allegianceSide(h8.allegiance) === 'black' &&
              !f8Attacked &&
              !g8Attacked
            ) {
              result.push({
                kind: 'move',
                type: 'castle',
                from: square,
                to: this.getCoordsRelative(square, new Vector2(2, 0)),
                piece: this.memory.getSquare(square).piece,
                side: 'king',
              })
            }

            if (
              castling === 'queen' &&
              !checked &&
              !b8 &&
              !c8 &&
              !d8 &&
              a8 &&
              a8.piece === 'R' &&
              allegianceSide(a8.allegiance) === 'black' &&
              !b8Attacked &&
              !c8Attacked &&
              !d8Attacked
            ) {
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
      }
    })

    return result
  }

  /**
   * @returns Moves that check a king
   */
  public getCheckMoves(possibleMoves: Node[]): Node[] {
    return possibleMoves.filter((node) => {
      if (node.kind !== 'move' || !node.to) {
        return
      }

      const targetSquare = this.memory.getSquare(node.to)

      return targetSquare && targetSquare.piece === 'K'
    })
  }

  private lastKnownValidMoves: Node[] | null = null

  public getValidMoves(from?: Coordinates | null): Node[] {
    if (!from && this.lastKnownValidMoves) {
      return this.lastKnownValidMoves
    }

    const moveNodes = this.getPossibleMoves()

    const result = moveNodes.filter((moveNode) => {
      if (moveNode.kind !== 'move') {
        return true
      }

      if (from && !coordinatesEqual(from, moveNode.from)) {
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
      virtualBoard.executeNode(moveNode)

      const possibleMoves = virtualBoard.getPossibleMoves()
      const checkMoveNodes = virtualBoard.getCheckMoves(possibleMoves)

      // Filter out moves that would result in us getting checked
      return checkMoveNodes.every((checkMoveNode) => {
        if (checkMoveNode.kind !== 'move') {
          return false
        }

        const toSquare = virtualBoard.memory.getSquare(checkMoveNode.to)

        return allegianceSide(toSquare.allegiance) !== this.memory.activeColour
      })
    })

    if (!from) this.lastKnownValidMoves = result

    return result
  }
}
