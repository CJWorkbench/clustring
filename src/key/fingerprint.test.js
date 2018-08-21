import fingerprint from './fingerprint'

const Tests = [
  [ ' strip ', 'strip' ],
  [ 'accėñtś', 'accents' ],
  [ 'CAPS', 'caps' ],
  [ 'punc.tua{tion}', 'punctuation' ],
  [ 'lots of \t\nwhitespace', 'lots of whitespace' ],
  [ 'words out of order', 'of order out words' ],
  [ 'words duplicate words', 'duplicate words' ],
  [ '', '' ],
  [ ' ', '' ]
]

describe('fingerprint', () => {
  for (const [ input, expected ] of Tests) {
    it(`should fingerprint "${input}"`, () => {
      const result = fingerprint()(input)
      expect(result).toEqual(expected)
    })
  }
})
