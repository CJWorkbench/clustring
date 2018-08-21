import { clusterByKey } from './main'
import fingerprint from './key/fingerprint'

describe('main.js', () => {
  it('should handle README clusterByKey example', () => {
    const bucket = {
      "commonWord": 3,
      "CommonWord": 20,
      "SuperRareWord": 1
    }

    const bins = clusterByKey(bucket, fingerprint())
    expect(bins.sort((a, b) => a.key.localeCompare(b.key))).toEqual([
      {
        "name": "CommonWord",
        "key": "commonword",
        "count": 23,
        "bucket": { "commonWord": 3, "CommonWord": 20 }
      },
      {
        "name": "SuperRareWord",
        "key": "superrareword",
        "count": 1,
        "bucket": { "SuperRareWord": 1}
      }
    ])
  })
})
