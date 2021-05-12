import Config from 'webpack-chain';

export interface PresetOptions {
  chainConfig: Config;
  presetConfig: {
    [key: string]: any;
  };
}

export type PresetFn = () => void;
