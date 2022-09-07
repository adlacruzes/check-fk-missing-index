import { GetQuery } from './database/getQuery';
import { ExecuteQuery } from './database/executeQuery';
import { ConnectionConfig } from './database/connectionConfig';
import { Printer } from './printers/printer';

export class CheckMissingIndex {
  constructor(
    private executeQuery: ExecuteQuery,
    private getQuery: GetQuery,
    private printer: Printer,
  ) {}

  public async handle(connectionConfig: ConnectionConfig): Promise<number> {
    const result = await this.executeQuery.handle(
      connectionConfig,
      this.getQuery.handle(),
    );

    if (result.length > 0) {
      this.printer.print(result);
    }

    return result.length;
  }
}
