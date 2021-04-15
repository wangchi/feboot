/**
 * registerPresets
 */

import { logError } from '../utils/log';
import { HeypackConfig, HeypackPreset } from './../../types/index.d';
import Config from 'webpack-chain';
import path from 'path';

interface RegisterPresetsOptions {
  chainConfig: Config;
  heypackConfig: HeypackConfig;
}

const CWD = process.cwd();

export default ({
  chainConfig,
  heypackConfig,
}: RegisterPresetsOptions): void => {
  if (
    !Array.isArray(heypackConfig.presets) ||
    heypackConfig.presets.length === 0
  )
    return;

  // TODO: check package exist
  // TODO: load presets from npm
  // TODO: support load local presets

  heypackConfig.presets.forEach((preset: HeypackPreset) => {
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
