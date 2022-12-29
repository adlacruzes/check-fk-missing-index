import { readFileSync } from 'fs';
import * as path from 'path';
import { Client } from 'pg';

export class TestDatabase {
  public static connectionConfig = {
    user: 'postgres',
    host: 'db',
    database: 'postgres',
    password: 'test',
    port: 5432,
  };

  private static readonly client = new Client(this.connectionConfig);

  static async loadFixture(fixture: string) {
    await TestDatabase.client.connect();

    await TestDatabase.client.query('CREATE SCHEMA IF NOT EXISTS public;');

    const sql = readFileSync(
      path.join(__dirname, 'fixtures', fixture + '.sql'),
    ).toString();

    await TestDatabase.client.query(sql);
  }

  static async clean() {
    await TestDatabase.client.query('DROP SCHEMA public CASCADE;');
    await TestDatabase.client.end();
  }
}
