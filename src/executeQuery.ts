import { Client } from 'pg';
import {ConnectionConfig} from "./connectionConfig";

export class ExecuteQuery {
  public async handle(
    connectionConfig: ConnectionConfig,
    query: string
  ): Promise<any[]> {
    const client = new Client(
      connectionConfig
    );

    await client.connect();

    const result = await client.query(query);

    await client.end();

    return result.rows;
  }
}
