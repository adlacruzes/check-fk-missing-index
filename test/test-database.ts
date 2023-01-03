import { readFileSync } from 'fs';
import * as path from 'path';
import { Client } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

export class TestDatabase {
  public static connectionConfig = {
    user: process.env.TEST_POSTGRES_USER || 'postgres',
    host: process.env.TEST_POSTGRES_HOSTNAME || 'db',
    database: process.env.TEST_POSTGRES_DB || 'postgres',
    password: process.env.TEST_POSTGRES_PASSWORD || 'test',
    port: +(process.env.TEST_POSTGRES_PORT || 5432),
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
