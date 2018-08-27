import boundedLevenshtein from 'bounded-levenshtein'

export default function levenshtein (d=Infinity) {
  return (a, b) => boundedLevenshtein(a, b, d)
}
