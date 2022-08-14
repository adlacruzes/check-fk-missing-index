import {Client, QueryResult} from "pg";

export class CheckMissingIndex {
  public async handle(client: Client, query: string): Promise<QueryResult> {
    await client.connect()
    const result = await client.query(query)
    await client.end()

    return result;
  }
}
