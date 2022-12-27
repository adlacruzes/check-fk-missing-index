import { Command, Option } from 'commander';
import { CheckMissingIndex } from './check-missing-index';
import { ConnectionConfig } from './database/connection-config';
import { GetFormatter } from './formatters/get-formatter';
import * as chalk from 'chalk';
import { ExecuteQuery } from './database/execute-query';
import { GetQuery } from './database/get-query';

const program = new Command();

program.name('check-fk-missing-index').version('0.1.0');

program.addOption(
  new Option('--format <format>', 'Output format')
    .default('table')
    .choices(['table', 'json', 'minimal']),
);

program
  .option(
    '-h, --host <host>',
    'database server host or socket directory',
    'localhost',
  )
  .option('-p, --port <port>', 'database server port', '5432')
  .option('-U, --username <username>', 'database user name', 'postgres')
  .option('-d, --dbname <dbname>', 'database name to connect to', 'postgres')
  .option('-W, --password <password>', 'database password', '')
  .action((options) => {
    mainCommand(options)
      .then((result) => {
        if (result.length > 0) {
          console.log(new GetFormatter().handle(options.format));
          process.exit(1);
        }

        process.exit(0);
      })
      .catch((error) => {
        console.log(chalk.white.bgRed.bold(error.toString()));
        process.exit(1);
      });
  });

program.parse(process.argv);

function mainCommand(options: any): Promise<any> {
  return new CheckMissingIndex(new ExecuteQuery(), new GetQuery()).handle(
    new ConnectionConfig(
      options.username,
      options.host,
      options.dbname,
      options.password,
      options.port,
    ),
  );
}
