import Config from 'webpack-chain';

export default ({ config }: { config: Config }): void => {
  const cssRule = config.module.rule('css').test(/\.css$/);
  cssRule.use('styleLoader').loader('style-loader');
  cssRule.use('cssLoader').loader('css-loader');
};
