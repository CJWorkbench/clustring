import babel from 'rollup-plugin-babel'
import pkg from './package.json'

const plugins = [
  babel({
    exclude: ['node_modules/**']
  })
]

const entries = [
  {
    input: 'src/main.js',
    plugins,
    output: {
      name: 'clustring',
      format: 'cjs',
      file: 'index.js'
    }
  }
]

for (const keyFunction of [ 'fingerprint' ]) {
  entries.push({
    input: `src/key/${keyFunction}.js`,
    plugins,
    output: {
      name: `key/${keyFunction}.js`,
      format: 'cjs',
      file: `key/${keyFunction}.js`
    }
  })
}

export default entries
