// import path from 'path';
import { PresetOptions, PresetFn } from '../types/index.d';
// import Config from 'webpack-chain';
// const VueLoaderPlugin = require('vue-loader/lib/plugin')
// import { VueLoaderPlugin } from 'vue-loader';
// plugins: [new VueLoaderPlugin()],

export default ({
  chainConfig,
  presetConfig = {},
}: PresetOptions): PresetFn => {
  return () => {
    const vueRule = chainConfig.module.rule('vue').test(/.vue$/);

    vueRule.use('vue-loader').loader('vue-loader').options(presetConfig);

    chainConfig.plugin('vue-loader').use(require('vue-loader/lib/plugin'));
  };
};
