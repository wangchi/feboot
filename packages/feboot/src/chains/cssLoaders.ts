import Config from 'webpack-chain';

export default ({ config }: { config: Config }): void => {
  function createCssRule(lang: string, test: RegExp, loader?: string) {
    const cssRule = config.module.rule(lang).test(test);

    cssRule.use('style-loader').loader('style-loader');
    cssRule.use('css-loader').loader('css-loader');

    if (lang === 'css') {
      cssRule.use('less-loader').loader('less-loader');
      cssRule.use('sass-loader').loader('sass-loader');
      cssRule.use('stylus-loader').loader('stylus-loader');
    }

    if (loader) {
      cssRule.use(loader).loader(loader);
    }
  }

  createCssRule('css', /\.css$/);
  createCssRule('less', /\.less$/, 'less-loader');
  createCssRule('sass', /\.s[ca]ss$/, 'sass-loader');
  createCssRule('stylus', /\.styl(us)?$/, 'stylus-loader');
};
