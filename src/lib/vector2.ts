export class Vector2 {
  constructor(public x: number, public y: number) {}

  clone() {
    return new Vector2(this.x, this.y);
  }
}
