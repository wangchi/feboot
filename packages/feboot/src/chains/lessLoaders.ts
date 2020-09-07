import Config from 'webpack-chain';

export default ({ config }: { config: Config }): void => {
  // function createCssRule(lang: string, test: RegExp, loader?: string) {
  //   const baseRule = config.module.rule(lang).test(test);

  //   baseRule.use('style-loader').loader('style-loader');
  //   baseRule.use('css-loader').loader('css-loader');

  //   if (loader) {
  //     baseRule.use(loader).loader(loader);
  //   }
  // }

  // createCssRule('css', /\.css$/);
  // createCssRule('less', /\.less$/, 'less-loader');

  // const cssRule = config.module.rule('css').test(/\.css$/);
  // cssRule.use('styleLoader').loader('style-loader');
  // cssRule.use('cssLoader').loader('css-loader');

  const lessRule = config.module.rule('less').test(/\.less$/);
  lessRule.use('styleLoader').loader('style-loader');
  lessRule.use('cssLoader').loader('css-loader');
  lessRule.use('lessLoader').loader('less-loader');
};
