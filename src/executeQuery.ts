import { Client } from 'pg';

export class ExecuteQuery {
  public async handle(
    user: string,
    host: string,
    database: string,
    password: string,
    port: number,
    query: string
  ): Promise<any[]> {
    const client = new Client({
      user,
      host,
      database,
      password,
      port,
    });

    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result.rows;
  }
}
