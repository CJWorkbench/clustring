import clusterByKnn from './clusterByKnn'

describe('clusterByKnn', () => {
  it('should cluster by distance and radius', async () => {
    const bucket = {
      '123': 1,
      '234': 2,
      '127': 3
    }

    const distance = (a, b) => {
      const m = Number(a) - Number(b)
      return m < 0 ? -m : m
    }

    const bins = await clusterByKnn(bucket, distance, 4).cluster()
    expect(bins).toEqual([
      {
        name: '127',
        count: 4,
        bucket: {
          '123': 1,
          '127': 3
        }
      }
    ])

    const bins2 = await clusterByKnn(bucket, distance, 3).cluster()
    expect(bins2).toEqual([])
  })

  it('should pick highest-count name', async () => {
    const bucket = { a: 3, b: 4 }
    const distance = () => 1
    const result = await clusterByKnn(bucket, distance, 1).cluster()
    expect(result[0].name).toEqual('b')
  })

  it('should localeCompare if counts are equal', async () => {
    const bucket = { c: 3, a: 3, b: 3 }
    const distance = () => 1
    const result = await clusterByKnn(bucket, distance, 1).cluster()
    expect(result[0].name).toEqual('a')
  })

  it('should cede control to the main loop after too many iterations', async () => {
    const bucket = { a: 1, b: 1, c: 1 }
    const distance = () => 1
    let progressReport = null
    setTimeout((() => progressReport = clusterer.progress), 0)
    const clusterer = clusterByKnn(bucket, distance, 1, {
      tickMs: 0,
      nIterationsBetweenTickChecks: 0x1
    })
    expect(clusterer.progress).toEqual(0)
    await clusterer.cluster()
    expect(progressReport).toEqual(1 / 6)
    expect(clusterer.progress).toEqual(1)
  })

  it('should cancel', async () => {
    const bucket = { a: 1, b: 1, c: 1 }
    const distance = () => 1
    const clusterer = clusterByKnn(bucket, distance, 1, {
      tickMs: 0,
      nIterationsBetweenTickChecks: 0x1
    })
    setTimeout((() => clusterer.cancel()), 0)

    await expect(clusterer.cluster()).rejects.toThrow('canceled')
  })
})
