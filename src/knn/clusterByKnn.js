import { tick } from '../util'

class KnnClusterer {
  constructor (bucket, distance, radius, options) {
    this.bucket = bucket
    this.distance = distance
    this.radius = radius
    this.options = options

    this.progress = 0
    this.canceled = false
  }

  cancel () {
    this.canceled = true
  }

  async cluster () {
    const { bucket, distance, radius } = this
    const { tickMs, nIterationsBetweenTickChecks } = this.options

    const strs = Object.keys(bucket)
    const nStrs = strs.length
    const bins = []

    let t1 = new Date()
    let i = 0
    const nComparisons = Math.max(0, nStrs * (nStrs - 1))

    for (let ai = 0; ai < nStrs; ai++) {
      const a = strs[ai]
      const aCount = bucket[a]
      let bin = null // set iff any b clusters with a

      for (let bi = ai + 1; bi < nStrs; bi++) {
        i += 1
        if ((i & nIterationsBetweenTickChecks) === 0) {
          const t2 = new Date()
          if (t2 - t1 >= tickMs) {
            this.progress = (i - 1) / nComparisons

            await tick()

            // We can only be canceled while we aren't executing. So now that
            // we're back from our tick is the only time we need to check.
            if (this.canceled) {
              throw new Error('canceled')
            }
            t1 = new Date()
          }
        }

        const b = strs[bi]
        const d = distance(a, b)

        if (d <= radius) {
          if (!bin) {
            bin = {
              name: a,
              count: aCount,
              bucket: { [a]: aCount }
            }
            bins.push(bin)
          }

          const maxCount = bin.bucket[bin.name]
          const bCount = bucket[b]
          if (bCount > maxCount || (bCount === maxCount && b.localeCompare(bin.name) < 0)) {
            bin.name = b
          }
          bin.count += bCount
          bin.bucket[b] = bCount
        }
      }
    }

    this.progress = 1
    return bins
  }
}

export default function clusterByKnn (bucket, distance, radius, options={}) {
  options = Object.assign({
    tickMs: 8,
    nIterationsBetweenTickChecks: 0xfff // must be power of two, minus one
  }, options)

  return new KnnClusterer(bucket, distance, radius, options)
}
