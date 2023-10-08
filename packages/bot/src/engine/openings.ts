import openingsJson from './openings-data.json'

const openingsData = openingsJson as [string, string[]][]
const openings = new Map(openingsData)

export const getNamesByFen = (fen: string): string[] => {
  const result: string[] = []

  for (const opening of openingsData) {
    if (opening[1].includes(fen)) {
      result.push(opening[0])
    }
  }

  return result
}

export const fenExists = (fen: string): boolean => {
  return openingsData.some((opening) => opening[1].includes(fen))
}

export const getFensByName = (openingName: string): string[] => {
  return openings.get(openingName)
}
