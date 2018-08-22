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
    const bins = []
    const strToBin = {} // a => bin, only if buckets has >1 element

    let t1 = new Date()
    let i = 0

    for (const a of strs) {
      const aCount = bucket[a]

      for (const b of strs) {
        i += 1
        if ((i & nIterationsBetweenTickChecks) === 0) {
          const t2 = new Date()
          if (t2 - t1 >= tickMs) {
            this.progress = (i - 1) / (strs.length * strs.length)

            await tick()

            // We can only be canceled while we aren't executing. So now that
            // we're back from our tick is the only time we need to check.
            if (this.canceled) {
              throw new Error('canceled')
            }
            t1 = new Date()
          }
        }

        if (a === b) continue
        if (a in strToBin && b in strToBin[a].bucket) continue
        if (b in strToBin && a in strToBin[b].bucket) continue

        const d = distance(a, b)
        if (d <= radius) {
          const bCount = bucket[b]
          let bin = strToBin[a]
          if (!bin) {
            bin = {
              name: a,
              count: aCount,
              bucket: { [a]: aCount }
            }
            strToBin[a] = bin
            bins.push(bin)
          }

          const maxCount = bin.bucket[bin.name]
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
  options = {
    tickMs: 8,
    nIterationsBetweenTickChecks: 0xfff, // must be power of two, minus one
    ...options
  }

  return new KnnClusterer(bucket, distance, radius, options)
}
