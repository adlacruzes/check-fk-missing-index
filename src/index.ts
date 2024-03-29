#!/usr/bin/env node

import { Command, Option } from 'commander';
import { CheckMissingIndex } from './check-missing-index';
import { ConnectionConfig } from './database/connection-config';
import { GetFormatter } from './formatters/get-formatter';
import { ExecuteQuery } from './database/execute-query';
import { GetQuery } from './database/get-query';
import { MissingIndex } from './missing-index';

const program = new Command();

program.name('check-fk-missing-index').version('2.0.0');

program.addOption(
  new Option('--format <format>', 'Output format')
    .default('table')
    .choices(['table', 'json', 'minimal']),
);

program
  .option(
    '--host <host>',
    'database server host or socket directory',
    'localhost',
  )
  .option('--port <port>', 'database server port', '5432')
  .option('--username <username>', 'database user name', 'postgres')
  .option('--database <database>', 'database name to connect to', 'postgres')
  .option('--password <password>', 'database password', '')
  .option('--no-fail', 'return code 0 on exit')
  .action((options) => {
    mainCommand(options)
      .then((result) => {
        let exitCode = 0;

        if (result.length > 0) {
          const formatter = new GetFormatter().handle(options.format);
          console.log(formatter.format(result));
          exitCode = 1;
        }

        if (!options.fail) {
          exitCode = 0;
        }

        process.exit(exitCode);
      })
      .catch((error) => {
        console.log(error.toString());
        process.exit(1);
      });
  });

program.parse(process.argv);

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function mainCommand(options: any): Promise<MissingIndex[]> {
  return new CheckMissingIndex(new ExecuteQuery(), new GetQuery()).handle(
    new ConnectionConfig(
      options.username,
      options.host,
      options.database,
      options.password,
      options.port,
    ),
  );
}
