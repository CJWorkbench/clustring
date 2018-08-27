clustring
=========

Sort groups of strings into buckets.

Inspired by [OpenRefine's clustering](https://github.com/OpenRefine/OpenRefine/wiki/Clustering-In-Depth).

API
===

The unit of analysis is a _bucket_. It looks like this:

```javascript
const bucket = {
	"commonWord": 3,
	"CommonWord": 20,
	"SuperRareWord": 1
}
```

Binning
-------

strcluster can break your bucket into _bins_ by computing a bin _key_ for each
string. Here's a code sample, using the `bucket` from above:

```javascript
import { clusterByKey } from 'clustring'
import fingerprint from 'clustring/key/fingerprint'

const clusterer = clusterByKey(bucket, fingerprint())

clusterer.cluster()
  .then(bins => { ... })
// bins is:
// [
//   {
//     "name": "CommonWord",
//     "key": "commonword",
//     "count": 23,
//     "bucket": { "commonWord": 3, "CommonWord": 20 }
//   }
// ]
```

KNN
---

strcluster can also break your bucket into bins using a _distance function_
to compare two strings.

Distance functions aren't cheap. A _block_-based approach avoids comparisons
by grouping strings into "blocks" that all contain the same _N_ sequence of
characters. (Effectively, this skips comparisons by assuming infinite distance
if there is no such sequence). **TODO: implement this**

Here's some sample code:

```javascript
import { clusterByKnn } from 'clustring'
import levenshtein from 'clustring/knn/levenshtein'

// levenshtein(2) is an optimization of levenshtein() that returns 0, 1, 2, or
// Infinity. You may use levenshtein(), but it's not recommended.
const clusterer = clusterByKnn(bucket, levenshtein(2), 2, { blockSize: 5 })
clusterer.cluster()
  .then(bins => { ... })
// bins will be same as in previous example, minus "key"
```

Progress reporting
------------------

`cluster()` returns a
[Promise](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise)
immediately and processes in the background (in the current thread). It cedes
control to the event loop every few milliseconds so your app remains
responsive.

To track progress, try something like this:

```javascript
const clusterer = clusterByKey(bucket, fingerprint(), { tickMs: 8 })

let timeout = null
function reportProgressAndReschedule () {
  console.log('Progress: ', clusterer.progress)
  timeout = setTimeout(reportProgressAndReschedule, 1)
}
// start progress-report loop
timeout = setTimeout(reportProgressAndReschedule, 1)

clusterer.cluster()
  .then(bins => {
    clearTimeout(timeout)
    // ... handle bins
  })
```

During `cluster()`, clustring will periodically check whether it has blocked
the main thread for more than `tickMs` milliseconds. if it has, it will cede
control to the event loop for one event-loop "tick" before resuming. Your
`setTimeout()` callback will only be called once `cluster()` cedes control,
even though it requests to be called after `1` millisecond.

Cancellation
------------

If you wish to stop clustering, run `clusterer.cancel()`. Of course, you can
only execute `clusterer.cancel()` during a tick, so consider your `tickMs`.

Developing
==========

```bash
npm install
npm test -- --watch             # runs tests continuously
npm run-script build -- --watch # builds continuously
```

Pick a feature; write a test; make it pass; commit.

Deploying
---------

1. Update `version` in `package.json`
1. `npm install` to update `package-lock.json`
1. `git commit -am 'vx.x.x && git tag vx.x.x && git push && git push origin vx.x.x`
1. `npm publish`
