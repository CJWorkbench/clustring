import levenshtein from './levenshtein'

const distance = levenshtein()

const Tests = [
  [ 'equal', 'equal', 0 ],
  [ 'add at end', 'add at endx', 1 ],
  [ 'diff at end', 'diff at ene', 1 ],
  [ 'nix at end', 'nix at en', 1 ],
  [ 'add at start', 'xadd at start', 1 ],
  [ 'diff at start', 'eiff at start', 1 ],
  [ 'nix at start', 'ix at start', 1 ],
  [ 'add in middle', 'add xin middle', 1 ],
  [ 'diff in middle', 'diff ix middle', 1 ],
  [ 'nix in middle', 'nix n middle', 1 ],
  [ 'right empty', '', 11 ],
  [ '', 'left empty', 10 ],
  [ 'accentś', 'accėnts', 2 ],
]

describe('levenshtein', () => {
  for (const [ a, b, d ] of Tests) {
    it(`should find distance ${d} between "${a}" and "${b}"`, () => {
      expect(distance(a, b)).toEqual(d)
    })
  }
})
