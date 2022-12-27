import { GetQuery } from './database/get-query';
import { ExecuteQuery } from './database/execute-query';
import { ConnectionConfig } from './database/connection-config';
import { Formatter } from './formatters/formatter';

export class CheckMissingIndex {
  constructor(
    private executeQuery: ExecuteQuery,
    private getQuery: GetQuery,
    private formatter: Formatter,
  ) {}

  public async handle(connectionConfig: ConnectionConfig): Promise<number> {
    const result = await this.executeQuery.handle(
      connectionConfig,
      this.getQuery.handle(),
    );

    if (result.length > 0) {
      this.formatter.format(result);
    }

    return result.length;
  }
}
