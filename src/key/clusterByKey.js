export default function clusterByKey (bucket, keyer) {
  const bins = []
  const keyToBin = {}

  for (const str in bucket) {
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

  return bins
}
