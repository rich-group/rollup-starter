const { nodeResolve } = require('@rollup/plugin-node-resolve');
const commonjs = require('@rollup/plugin-commonjs');
const terser = require('@rollup/plugin-terser');
const babel = require('@rollup/plugin-babel');
const pkg = require('../package.json')
const replace = require('@rollup/plugin-replace');
const VERSIONS = require(`../config/version.${process.env.ENV}.ts`)
const typescript = require('@rollup/plugin-typescript');

const json = require('@rollup/plugin-json')
module.exports = {
  input: './src/index.ts',
  output: [
    {
      file: 'dist/bundle.min.js',
      name: 'CUPSHE_VERSIONS',
      banner:
      `/**
        * @name ${pkg.name}
        * @author ${pkg.author}
        * @description ${pkg.description}
        */`,
      format: 'umd',
      plugins: [terser()]
    }
  ],
  plugins: [
    nodeResolve({
    }),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    json(),
    replace({
      'process.env.VERSIONS': JSON.stringify(VERSIONS),
      preventAssignment: true
    }),
    typescript()
  ]
}

