import {GetQuery} from "./getQuery";
import {ExecuteQuery} from "./executeQuery";

export class CheckMissingIndex {
  public async handle(
    user: string,
    host: string,
    database: string,
    password: string,
    port: number
  ): Promise<void> {
    const result = await new ExecuteQuery().handle(
      user,
      host,
      database,
      password,
      port,
      new GetQuery().handle()
    );

    console.log(result[0])
  }
}
