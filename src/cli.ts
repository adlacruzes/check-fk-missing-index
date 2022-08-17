import {Command, Option} from 'commander';
import {CheckMissingIndex} from './checkMissingIndex';
import {ConnectionConfig} from "./connectionConfig";
import {PrettyPrinter} from "./printers/prettyPrinter";
import {PrinterInterface} from "./printers/printerInterface";

const program = new Command();

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
    );
  });

program.parse(process.argv);

function getPrinter(format: string): PrinterInterface {
  console.log(format)
  switch (format) {
    case 'json':
    case 'table':
    case 'minimal':
    default:
      return new PrettyPrinter();

  }
}
