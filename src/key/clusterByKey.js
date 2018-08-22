function tick () {
  return new Promise(resolve => setTimeout(resolve, 0))
}

class Clusterer {
  constructor (bucket, keyer, options) {
    this.bucket = bucket
    this.keyer = keyer
    this.options = options

    this.progress = 0
    this.canceled = false
  }

  cancel () {
    this.canceled = true
  }
 
  async cluster () {
    const { bucket, keyer } = this
    const { tickMs, nIterationsBetweenTickChecks } = this.options

    const bins = []
    const keyToBin = {}

    let i = 0
    const t1 = new Date()

    const strs = Object.keys(bucket)

    for (const str of strs) {
      i += 1
      if ((i & nIterationsBetweenTickChecks) === 0) {
        const t2 = new Date()
        if (t2 - t1 >= tickMs) {
          this.progress = (i - 1) / strs.length

          await tick()

          // We can only be canceled while we aren't executing. So now that
          // we're back from our tick is the only time we need to check.
          if (this.canceled) {
            throw new Error('canceled')
          }
        }
      }

      const count = bucket[str]
      const key = keyer(str)

      let bin = keyToBin[key]
      if (!bin) {
        bin = {
          key: key,
          name: str,
          count: 0,
          bucket: {}
        }
        keyToBin[key] = bin
        bins.push(bin)
      } else {
        // Maybe change name. We do it in this loop so we're O(n)
        const maxCount = bin.bucket[bin.name]
        if (count > maxCount || (count === maxCount && str.localeCompare(bin.name) < 0)) {
          bin.name = str
        }
      }
      bin.count += count
      bin.bucket[str] = count
    }

    this.progress = 1
    return bins
  }
}

export default function clusterByKey (bucket, keyer, options={}) {
  options = {
    tickMs: 8,
    nIterationsBetweenTickChecks: 0xfff, // must be power of two, minus one
    ...options
  }

  return new Clusterer(bucket, keyer, options)
}
