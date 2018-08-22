import { clusterByKey } from './main'
import fingerprint from './key/fingerprint'

describe('main.js', () => {
  it('should handle README clusterByKey example', async () => {
    const bucket = {
      "commonWord": 3,
      "CommonWord": 20,
      "SuperRareWord": 1
    }

    const bins = await clusterByKey(bucket, fingerprint()).cluster()
    expect(bins).toEqual([
      {
        "name": "CommonWord",
        "key": "commonword",
        "count": 23,
        "bucket": { "commonWord": 3, "CommonWord": 20 }
      }
    ])
  })
})
