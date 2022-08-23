import {Command, Option} from 'commander';
import {CheckMissingIndex} from './checkMissingIndex';
import {ConnectionConfig} from "./connectionConfig";
import {TablePrinter} from "./printers/tablePrinter";
import {PrinterInterface} from "./printers/printerInterface";
import {JsonPrinter} from "./printers/jsonPrinter";
import {MinimalPrinter} from "./printers/minimalPrinter";

const program = new Command();

program
  .name('check-fk-missing-index')
  .version('0.1.0');

program
  .addOption(new Option('--format <format>', 'Output format').default('table')
  .choices(['table', 'json', 'minimal']));

program
  .option(
    '-h, --host <host>',
    'database server host or socket directory (default: "localhost")',
    'localhost',
  )
  .option('-p, --port <port>', 'database server port (default: "5432")', '5432')
  .option(
    '-U, --username <username>',
    'database user name (default: "postgres")',
    'postgres',
  )
  .option(
    '-d, --dbname <dbname>',
    'database name to connect to (default: "postgres")',
    'postgres',
  )
  .option('-W, --password <password>', 'database password', '')
  .action((options) => {
    new CheckMissingIndex(
      getPrinter(options.format)
    ).handle(
      new ConnectionConfig(
        options.username,
        options.host,
        options.dbname,
        options.password,
        options.port
      )
    ).then((indexFound) => {
      if (indexFound > 0) {
        process.exit(1);
      }

      process.exit(0);
    }).catch((error) => {
      console.log(error.toString())
      process.exit(1);
    });
  });

program.parse(process.argv);

function getPrinter(format: string): PrinterInterface {
  switch (format) {
    case 'json':
      return new JsonPrinter();
    case 'minimal':
      return new MinimalPrinter();
    case 'table':
    default:
      return new TablePrinter();

  }
}
