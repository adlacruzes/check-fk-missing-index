import { Command, Option } from 'commander';
import { CheckMissingIndex } from './checkMissingIndex';
import { ConnectionConfig } from './connectionConfig';
import { GetPrinter } from './printers/getPrinter';

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
    new CheckMissingIndex(GetPrinter(options.format))
      .handle(
        new ConnectionConfig(
          options.username,
          options.host,
          options.dbname,
          options.password,
          options.port,
        ),
      )
      .then((indexFound) => {
        if (indexFound > 0) {
          process.exit(1);
        }

        process.exit(0);
      })
      .catch((error) => {
        console.log(error.toString());
        process.exit(1);
      });
  });

program.parse(process.argv);
