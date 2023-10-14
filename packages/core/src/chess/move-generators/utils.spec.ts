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

  public getVector(index: number, v: Vector2): Move {
    const targetIndex = this.utils.generateIndexWithOffset(
      index,
      this.board.getSquare(index),
      v
    )
    return this.utils.generateMove(
      index,
      targetIndex,
      this.board.getSquare(targetIndex)
    )
  }
}

test('gets single step directions', (t) => {
  const g = new TestMoveGenerator()

  t.deepEqual(g.getVector(20, new Vector2(0, 1)), {
    flags: MoveFlag.None,
    from: 20,
    to: 28,
    promotion: null,
    undo: null,
  })
  t.deepEqual(g.getVector(20, new Vector2(2, 1)), {
    flags: MoveFlag.None,
    from: 20,
    to: 30,
    promotion: null,
    undo: null,
  })
  t.deepEqual(g.getVector(20, new Vector2(-1, -2)), {
    flags: MoveFlag.None,
    from: 20,
    to: 3,
    promotion: null,
    undo: null,
  })
})
