import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from '../package.json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup'
import json from '@rollup/plugin-json';
const banner = `/**
* @name ${pkg.name}
* @author ${pkg.author}
* @description ${pkg.description}
*/`;
export default {
  input: './src/index.ts',
  output: [{
    file: 'dist/resource.bundle.js',
    name: 'RMANAGER', // UMD 导出全局变量名
    banner,
    format: 'umd'
  }, {
    file: 'dist/resource.dist.js',
    name: 'RMANAGER', // UMD 导出全局变量名
    banner,
    format: 'umd',
    plugins: [
      terser()
    ]
  }],
  plugins: [
    nodeResolve(),
    commonjs(),
    babel({ babelHelpers: 'bundled' }),
    json(),
    replace({
      preventAssignment: true
    }),
    typescript()
  ]
} as RollupOptions

