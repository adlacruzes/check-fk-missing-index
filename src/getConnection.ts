import { Client } from 'pg';

export class GetConnection {
  public handle(
    user: string,
    host: string,
    database: string,
    password: string,
    port: number,
  ): Client {
    return new Client({
      user,
      host,
      database,
      password,
      port,
    });
  }
}
