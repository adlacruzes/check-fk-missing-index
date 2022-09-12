import { Client } from 'pg';
import { readFileSync } from 'fs';
import { CheckMissingIndex } from '../src/checkMissingIndex';
import { ExecuteQuery } from '../src/database/executeQuery';
import { GetQuery } from '../src/database/getQuery';
import { GetPrinter } from '../src/printers/getPrinter';

describe('index e2e', () => {
  const connectionConfig = {
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'test',
    port: 5432,
  };

  const client = new Client(connectionConfig);

  beforeEach(async () => {
    await client.connect();

    await client.query('CREATE SCHEMA public;');

    const sql = readFileSync(__dirname + '/seed.sql').toString();

    await client.query(sql);
  });

  afterEach(async () => {
    await client.query('DROP SCHEMA public CASCADE;');

    await client.end();
  });

  it('should return json', async () => {
    const result = await new CheckMissingIndex(
      new ExecuteQuery(),
      new GetQuery(),
      new GetPrinter().handle('json'),
    ).handle(connectionConfig);

    expect(result).toBe(2);
  });
});
