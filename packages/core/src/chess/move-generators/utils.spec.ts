import test from 'ava'
import { Move, MoveFlag, MoveGeneratorUtilities } from './utils'
import { Vector2 } from '../../lib/vector2'
import { Board } from '../board'

class TestMoveGenerator {
  private utils: MoveGeneratorUtilities

  private board: Board

  constructor() {
    this.board = new Board({ width: 8, height: 8 })
    this.utils = new MoveGeneratorUtilities(this.board)
  }

  public generateMoves(): Move[] {
    return []
  }

  public getVector(index: number, v: Vector2) {
    const result: Move[] = []

    this.utils.generateWithOffset(index, this.board.getSquare(index), v, result)

    return result
  }
}

test('gets single step directions', (t) => {
  const g = new TestMoveGenerator()

  t.deepEqual(g.getVector(20, new Vector2(0, 1)), [
    { flags: MoveFlag.None, from: 20, to: 28 },
  ])
  t.deepEqual(g.getVector(20, new Vector2(2, 1)), [
    { flags: MoveFlag.None, from: 20, to: 30 },
  ])
  t.deepEqual(g.getVector(20, new Vector2(-1, -2)), [
    { flags: MoveFlag.None, from: 20, to: 3 },
  ])
})
