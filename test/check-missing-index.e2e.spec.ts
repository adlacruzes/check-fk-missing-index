import { Client } from 'pg';
import { readFileSync } from 'fs';
import { CheckMissingIndex } from '../src/check-missing-index';
import { ExecuteQuery } from '../src/database/execute-query';
import { GetQuery } from '../src/database/get-query';
import { MissingIndex } from '../src/missing-index';

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
    ).handle(connectionConfig);

    expect(result).toEqual([
      new MissingIndex(
        'table2',
        'table1_id',
        '0 bytes',
        'table2_table1_id_fkey',
        'table1',
      ),
      new MissingIndex(
        'table4',
        'table3_id',
        '0 bytes',
        'table4_table3_id_fkey',
        'table3',
      ),
    ]);
  });
});
