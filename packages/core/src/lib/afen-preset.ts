export const AfenPreset = {
  VanillaDefault: 'rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 0',
  GreyDefault:
    'r>n>b>q>kb>n>r>/p>p>p>p>p>p>p>p>/8/8/8/8/P>P>P>P>P>P>P>P>/R>N>B>Q>KB>N>R> w KQkq - 0 0',
} as const

export type AfenPreset = (typeof AfenPreset)[keyof typeof AfenPreset]