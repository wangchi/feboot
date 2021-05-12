/**
 * registerPresets
 */

import { logError } from '../utils/log';
import { HeyappConfig, HeyappPreset } from './../../types/index.d';
import Config from 'webpack-chain';
import path from 'path';

interface RegisterPresetsOptions {
  chainConfig: Config;
  heyappConfig: HeyappConfig;
}

const CWD = process.cwd();

export default ({
  chainConfig,
  heyappConfig,
}: RegisterPresetsOptions): void => {
  if (
    !Array.isArray(heyappConfig.presets) ||
    heyappConfig.presets.length === 0
  )
    return;

  // TODO: check package exist
  // TODO: load presets from npm
  // TODO: support load local presets

  heyappConfig.presets.forEach((preset: HeyappPreset) => {
    if (typeof preset === 'string') {
      // console.log(path.join(CWD, 'node_modules', preset));
      require(path.join(CWD, 'node_modules', preset)).default({
        chainConfig,
      })();
    } else if (Array.isArray(preset) && preset.length > 0) {
      require(path.join(CWD, 'node_modules', preset[0])).default({
        chainConfig,
        presetConfig: preset[1] || {},
      });
    } else {
      logError('invalid preset config');
    }
  });
};
