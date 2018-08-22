import babel from 'rollup-plugin-babel'
import commonjs from 'rollup-plugin-commonjs'
import nodeResolve from 'rollup-plugin-node-resolve'
import pkg from './package.json'

const plugins = [
  babel({
    exclude: ['node_modules/**']
  }),
  nodeResolve(),
  commonjs()
]

const entries = [
  {
    input: 'src/main.js',
    plugins,
    output: {
      name: 'clustring',
      format: 'es',
      sourcemap: true,
      file: 'index.js'
    }
  }
]

for (const fn of [ 'key/fingerprint', 'knn/levenshtein' ]) {
  entries.push({
    input: `src/${fn}.js`,
    plugins,
    output: {
      name: `${fn}.js`,
      format: 'es',
      sourcemap: true,
      file: `${fn}.js`
    }
  })
}

export default entries
