import { GetQuery } from './database/get-query';
import { ExecuteQuery } from './database/execute-query';
import { ConnectionConfig } from './database/connection-config';
import { MissingIndex } from './missing-index';

export class CheckMissingIndex {
  constructor(
    private executeQuery: ExecuteQuery,
    private getQuery: GetQuery,
  ) {}

  public async handle(
    connectionConfig: ConnectionConfig,
  ): Promise<MissingIndex[]> {
    const rows = await this.executeQuery.handle(
      connectionConfig,
      this.getQuery.handle(),
    );

    const result: MissingIndex[] = [];

    rows.forEach((row) => {
      result.push(
        new MissingIndex(
          row.table,
          row.columns,
          row.constraint,
          row.referenced_table,
          row.size,
        ),
      );
    });

    return result;
  }
}
