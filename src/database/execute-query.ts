import { Client } from 'pg';
import { ConnectionConfig } from './connection-config';

export class ExecuteQuery {
  public async handle(
    connectionConfig: ConnectionConfig,
    query: string,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  ): Promise<any[]> {
    const client = new Client(connectionConfig);

    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result.rows;
  }
}
