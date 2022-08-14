import {Client} from "pg";

export class GetConnection {
  public handle(): Client {
    return new Client({
      user: 'postgres',
      host: 'db',
      database: 'postgres',
      password: 'test',
      port: 5432,
    });
  }
}
