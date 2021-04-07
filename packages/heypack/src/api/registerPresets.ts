/**
 * registerPresets
 */

import { logError } from '../utils/log';
import { FebootConfig, FebootPreset } from './../../types/index.d';
import Config from 'webpack-chain';
import path from 'path';

interface RegisterPresetsOptions {
  chainConfig: Config;
  febootConfig: FebootConfig;
}

const CWD = process.cwd();

export default ({
  chainConfig,
  febootConfig,
}: RegisterPresetsOptions): void => {
  if (!Array.isArray(febootConfig.presets) || febootConfig.presets.length === 0)
    return;

  // TODO: check package exist
  // TODO: load presets from npm
  // TODO: support load local presets

  febootConfig.presets.forEach((preset: FebootPreset) => {
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
