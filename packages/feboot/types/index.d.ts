import commander from 'commander';
import Config from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';

export interface Pkg {
  name: string;
  version: string;
  [key: string]: any;
}

export interface CliOptions {
  program: commander.Command;
  scriptFn?: (config: FebootConfig) => void;
  febootConfig: FebootConfig;
}

export interface RegisterCommandOptions {
  pkg: Pkg;
}

// for feboot.config.js
export interface FebootConfig {
  // base config
  entry?: string;
  base?: string;
  outputPath?: string;
  publicPath?: string;
  hash?: boolean;

  // for devServer
  port?: number;
  open?: boolean;
  proxy?: WebpackDevServer.ProxyConfigMap;

  // extend webpack config
  chainWebpack?: (config: Config) => void;

  // presets
  presets?: [];

  // plugins
  plugins?: [];
}
