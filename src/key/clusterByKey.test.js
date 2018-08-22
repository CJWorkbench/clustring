import clusterByKey from './clusterByKey'

describe('clusterByKey', () => {
  it('should cluster by key', async () => {
    const bucket = {
      a: 3,
      b: 4,
      c: 2
    }

    const fn = (s) => s === 'a' ? 'x' : 'y'

    const result = await clusterByKey(bucket, fn).cluster()
    expect(result).toEqual([
      {
        key: 'y',
        name: 'b',
        count: 6,
        bucket: { b: 4, c: 2 }
      }
    ])
  })

  it('should pick highest-count name', async () => {
    const bucket = {
      a: 3,
      b: 4
    }

    const fn = _ => 'x'

    const result = await clusterByKey(bucket, fn).cluster()
    expect(result[0].name).toEqual('b')
  })

  it('should localeCompare if counts are equal', async () => {
    const bucket = {
      a: 3,
      c: 3,
      b: 3
    }

    const fn = _ => 'x'

    const result = await clusterByKey(bucket, fn).cluster()
    expect(result[0].name).toEqual('a')
  })

  it('should cede control to the main loop after too many iterations', async () => {
    const bucket = {
      a: 3,
      c: 3,
      b: 3
    }
    const fn = _ => 'x'

    const ticks = []

    const clusterer = clusterByKey(bucket, fn, {
      tickMs: 0,
      nIterationsBetweenTickChecks: 0x1
    })
    const interval = setInterval((_ => ticks.push(clusterer.progress)), 0)
    await clusterer.cluster()
    clearInterval(interval)

    expect(ticks).toEqual([ 1.0/3 ])
    expect(clusterer.progress).toEqual(1)
  })

  it('should cancel', async () => {
    const bucket = {
      a: 3,
      c: 3,
      b: 3
    }
    const fn = _ => 'x'
    const clusterer = clusterByKey(bucket, fn, {
      tickMs: 0,
      nIterationsBetweenTickChecks: 0x1
    })
    setTimeout((() => clusterer.cancel()), 0)

    await expect(clusterer.cluster()).rejects.toThrow('canceled')
  })
})
