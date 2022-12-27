import { GetQuery } from './database/get-query';
import { ExecuteQuery } from './database/execute-query';
import { ConnectionConfig } from './database/connection-config';

export class CheckMissingIndex {
  constructor(private executeQuery: ExecuteQuery, private getQuery: GetQuery) {}

  public async handle(connectionConfig: ConnectionConfig): Promise<any> {
    const result = await this.executeQuery.handle(
      connectionConfig,
      this.getQuery.handle(),
    );

    return result;
  }
}
