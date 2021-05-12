import { RegisterCommandOptions } from './../../types/index.d';
import { program } from 'commander';
import path from 'path';
import isPathExist from '../utils/isPathExist';
import findFirstLevelFiles from '../utils/findFirstLevelFiles';
// import { logWarning } from '../utils/log';

const CWD = process.cwd();

export default function registerCommands({
  pkg,
}: RegisterCommandOptions): void {
  let heyappConfig = {};
  const configFilePath = path.join(CWD, './heyapp.config.js');

  const commandFiles = findFirstLevelFiles(path.join(__dirname, '../cli'), [
    '.js',
  ]);

  if (isPathExist(configFilePath)) {
    heyappConfig = require(configFilePath);
  } else {
    // logWarning('缺少 heyapp.config.js 配置文件');
    heyappConfig = {};
  }

  program.name(pkg.name).version(pkg.version).usage('<command> [options]');

  commandFiles.forEach((file) => {
    // console.log(path.join(__dirname, '../cli', file));
    const commandFn = require(path.join(__dirname, '../cli', file));
    commandFn.default({ program, heyappConfig });
  });

  if (process.argv.length > 2) {
    program.parse(process.argv);
  } else {
    program.help();
  }
}
