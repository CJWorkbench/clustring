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

const bins = clusterByKey(bucket, fingerprint())
// bins is:
// [
//   {
//     "name": "CommonWord",
//     "key": "commonword",
//     "count": 23,
//     "bucket": { "commonWord": 3, "CommonWord": 20 }
//   },
//   {
//     "name": "SuperRareWord",
//     "key": "superrareword",
//     "count": 1,
//     "bucket": { "SuperRareWord": 1}
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
if there is no such sequence).

Here's some sample code:

```javascript
import { clusterByKnn } from 'clustring'
import levenshtein from 'clustring/knn/levenshtein'

const bins = clusterByKnn(bucket, levenshtein(2), { blockSize: 5 })
// bins will be same as in previous example.
```

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
2. `git commit -m 'vx.x.x && git tag vx.x.x && git push && git push vx.x.x`
2. `npm publish`
