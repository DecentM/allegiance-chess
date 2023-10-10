import test from 'ava'
import { Move, MoveGenerator } from './utils'
import { Vector2 } from '../../lib/vector2'
import { NeoBoard } from '../neo-board'

class TestMoveGenerator extends MoveGenerator {
  public generateMoves(): Move[] {
    return []
  }

  public getVector(index: number, v: Vector2) {
    const result: Move[] = []

    this.generateWithOffset(index, this.board.getSquare(index), v, result)

    return result
  }
}

test('gets single step directions', (t) => {
  const b = new NeoBoard({ width: 8, height: 8 })
  const g = new TestMoveGenerator(b)

  t.deepEqual(g.getVector(20, new Vector2(0, 1)), { from: 20, to: 28 })
  t.deepEqual(g.getVector(20, new Vector2(2, 1)), { from: 20, to: 30 })
  t.deepEqual(g.getVector(20, new Vector2(-1, -2)), { from: 20, to: 3 })
})
