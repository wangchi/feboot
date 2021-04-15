import { HeypackConfig, HeypackPreset } from './../../types/index.d';
import Config from 'webpack-chain';
import webpack from 'webpack';
import WebpackDevServer from 'webpack-dev-server';
import { isFunction } from '../utils/checkType';
import chalk from 'chalk';
import path from 'path';
import getIPAddress from '../utils/getIPAddress';
import isPathExist from '../utils/isPathExist';

import alias from '../chains/alias';
import babelLoader from '../chains/babelLoader';
import htmlWebpackPlugin from '../chains/htmlWebpackPlugin';
import cssLoaders from '../chains/cssLoaders';

import { logError } from '../utils/log';
import registerPresets from '../api/registerPresets';

export default (heypackConfig: HeypackConfig): void => {
  const config = new Config();
  const { port = 3000, open = false, chainWebpack, proxy = {} } = heypackConfig;

  // ----- base start
  const name = 'main';
  const base = heypackConfig.base || '/';
  let entry = heypackConfig.entry || 'src/index.js';
  const outputPath = heypackConfig.outputPath || 'dist';
  const publicPath = heypackConfig.publicPath || '/';

  if (!isPathExist(entry)) {
    entry = 'index.js';
  }

  if (!isPathExist(entry)) {
    logError('entry not exist');
    process.exit(0);
  }

  config
    .entry(name)
    .add(path.join(process.cwd(), entry))
    .end()
    .cache({
      type: 'filesystem',
    })
    .set('mode', 'development')
    .output.path(path.join(process.cwd(), outputPath))
    .filename(
      `js/${heypackConfig.hash ? '[name].[hash:8]' : '[name]'}.bundle.js`
    )
    .publicPath(publicPath);

  config.devtool('cheap-source-map');

  config.plugin('error').use('friendly-errors-webpack-plugin');

  // ----- base end

  // only for dev
  config.devServer
    .quiet(true)
    .hot(true)
    .historyApiFallback(true)
    .https(false)
    .disableHostCheck(true)
    .publicPath(base)
    .noInfo(true)
    .quiet(false);

  // chains start
  alias({ config, heypackConfig });
  babelLoader({ config });
  cssLoaders({ config, heypackConfig });
  htmlWebpackPlugin({ config });
  // chains end

  // register presets start
  try {
    registerPresets({ chainConfig: config, heypackConfig });
  } catch (e) {
    logError(e.message);
    process.exit(1);
  }
  // register presets end

  // register plugins start
  // register plugins end

  // for webpack chain extension
  if (isFunction(chainWebpack)) {
    chainWebpack(config);
  }

  const compiler = webpack(config.toConfig());

  // console.log(JSON.stringify(compiler.options.resolve));

  const server = new WebpackDevServer(compiler, {
    ...compiler.options.devServer,
    open,
    proxy,
  });

  ['SIGINT', 'SIGTERM'].forEach((signal) => {
    process.on(signal, () => {
      server.close(() => {
        process.exit(0);
      });
    });
  });

  server.listen(port);

  compiler.hooks.done.tap('start', () => {
    const ip = getIPAddress();
    const indent = '    ';
    const addressInfo = `App running at:
      - Local:   http://localhost:${port}${base}
      - Network: http://${ip}:${port}${base}\n`;
    console.log(chalk.cyan(`\n${indent}${addressInfo}`));
  });
};
