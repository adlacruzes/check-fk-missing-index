import {Command} from 'commander';
import {CheckMissingIndex} from './checkMissingIndex';
import {ConnectionConfig} from "./connectionConfig";
import {PrettyPrinter} from "./printers/prettyPrinter";

const program = new Command();

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
    new CheckMissingIndex(new PrettyPrinter()).handle(
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
