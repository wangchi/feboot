import commander from 'commander';
import Config from 'webpack-chain';
import WebpackDevServer from 'webpack-dev-server';

export interface AnyObj {
  [key: string]: any;
}

export interface Pkg {
  name: string;
  version: string;
  [key: string]: any;
}

export interface CliOptions {
  program: commander.Command;
  scriptFn?: (config: HeyappConfig) => void;
  heyappConfig: HeyappConfig;
}

export interface RegisterCommandOptions {
  pkg: Pkg;
}

export type HeyappPreset = string | [string, AnyObj];
export type HeyappPlugin = string | [string, AnyObj];

// for heyapp.config.js
export interface HeyappConfig {
  // base config
  entry?: string;
  base?: string;
  outputPath?: string;
  publicPath?: string;
  hash?: boolean;

  // @: src
  alias: AnyObj;

  // for devServer
  port?: number;
  open?: boolean;
  proxy?: WebpackDevServer.ProxyConfigMap;

  css?: {
    autoprefixer?: AnyObj;
    cssLoader?: AnyObj;
    lessLoader?: AnyObj;
    stylusLoader?: AnyObj;
    sassLoader?: AnyObj;
    cssnano?: AnyObj;
    postcssLoader?: AnyObj;
  };
  // 浏览器兼容配置，自动引入 polyfill
  targets?: AnyObj;
  analyze?: boolean;
  chunks?: string[];

  // extend webpack config
  chainWebpack?: (config: Config) => void;

  // presets
  presets?: HeyappPreset[];

  // plugins
  plugins?: HeyappPlugin[];
}

export interface ChainsConfig {
  config: Config;
  heyappConfig: HeyappConfig;
}
