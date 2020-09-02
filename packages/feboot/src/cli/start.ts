import { CliOptions } from './../../types/index.d';

export default function startCommand({
  program,
  febootConfig,
}: CliOptions): void {
  program
    .command('start')
    .description('start project')
    .action(() => {
      console.log(febootConfig);
    });
}
