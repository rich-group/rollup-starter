import { nodeResolve } from '@rollup/plugin-node-resolve';
import terser from '@rollup/plugin-terser';
import commonjs from '@rollup/plugin-commonjs';
import babel from '@rollup/plugin-babel';
import pkg from '../package.json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import type { RollupOptions } from 'rollup'
import json from '@rollup/plugin-json';
import Config from '../config';

const banner = `/**
* @name ${pkg.name}
* @author ${pkg.author}
* @description ${pkg.description}
*/`;
export default {
  input: './src/index.ts',
  output: [{
    file: 'dist/resource.common.js',
    name: pkg.name, // UMD 导出全局变量名
    banner,
    format: 'umd'
  }, {
    file: 'dist/resource.min.js',
    name: pkg.name, // UMD 导出全局变量名
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
      preventAssignment: true,
      'process.env.NODE_ENV': JSON.stringify(Config[process.env.NODE_ENV])
    }),
    typescript()
  ]
} as RollupOptions

