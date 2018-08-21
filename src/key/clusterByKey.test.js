import clusterByKey from './clusterByKey'

describe('clusterByKey', () => {
  it('should cluster by key', () => {
    const bucket = {
      a: 3,
      b: 4,
      c: 2
    }

    const fn = (s) => s === 'a' ? 'x' : 'y'

    const result = clusterByKey(bucket, fn)
    expect(result.sort((x, y) => x.count - y.count)).toEqual([
      {
        name: 'a',
        key: 'x',
        count: 3,
        bucket: { a: 3 }
      },
      {
        key: 'y',
        name: 'b',
        count: 6,
        bucket: { b: 4, c: 2 }
      }
    ])
  })

  it('should pick highest-count name', () => {
    const bucket = {
      a: 3,
      b: 4
    }

    const fn = _ => 'x'

    const result = clusterByKey(bucket, fn)
    expect(result[0].name).toEqual('b')
  })

  it('should localeCompare if counts are equal', () => {
    const bucket = {
      a: 3,
      c: 3,
      b: 3
    }

    const fn = _ => 'x'

    const result = clusterByKey(bucket, fn)
    expect(result[0].name).toEqual('a')
  })
})
