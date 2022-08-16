import {GetQuery} from "./getQuery";
import {ExecuteQuery} from "./executeQuery";
import {ConnectionConfig} from "./connectionConfig";

export class CheckMissingIndex {
  public async handle(
    connectionConfig: ConnectionConfig
  ): Promise<void> {
    const result = await new ExecuteQuery().handle(
      connectionConfig,
      new GetQuery().handle()
    );

    console.log(result[0])
  }
}
