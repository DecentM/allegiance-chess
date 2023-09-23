export class Hex {
  static utf8ToHex(id: string) {
    return Buffer.from(id, 'utf8').toString('hex')
  }

  static hexToUtf8(hex: string) {
    return Buffer.from(hex, 'hex').toString('utf8')
  }
}
