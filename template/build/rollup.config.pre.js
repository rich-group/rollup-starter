import baseConfig from './rollup.config.base';
import terser from '@rollup/plugin-terser';
import { merge } from 'webpack-merge';

const prdConfig = {
  output: {
    plugins: [terser()]
  }
}

export default merge(baseConfig, prdConfig)
