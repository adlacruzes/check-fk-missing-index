import { Command } from 'commander';
import { CheckMissingIndex } from './checkMissingIndex';
import { GetConnection } from './getConnection';
import { GetQuery } from './getQuery';

const program = new Command();

program
  .option(
    '--host <host>',
    'database server host or socket directory (default: "localhost")',
    'localhost',
  )
  .option('--port <port>', 'database server port (default: "5432")', '5432')
  .option(
    '--username <username>',
    'database user name (default: "postgres")',
    'postgres',
  )
  .option(
    '--dbname <dbname>',
    'database name to connect to (default: "postgres")',
    'postgres',
  )
  .option('--password <password>', 'database password', '');

program.parse(process.argv);

const options = program.opts();
console.log(options);
const index = async () => {
  const result = await new CheckMissingIndex().handle(
    new GetConnection().handle(
      options.username,
      options.host,
      options.dbname,
      options.password,
      options.port,
    ),
    new GetQuery().handle(),
  );

  console.log(result.rows);
};

index();
