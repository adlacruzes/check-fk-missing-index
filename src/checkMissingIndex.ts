import { GetQuery } from './database/getQuery';
import { ExecuteQuery } from './database/executeQuery';
import { ConnectionConfig } from './database/connectionConfig';
import { PrinterInterface } from './printers/printerInterface';

export class CheckMissingIndex {
  constructor(
    private executeQuery: ExecuteQuery,
    private printer: PrinterInterface,
  ) {}

  public async handle(connectionConfig: ConnectionConfig): Promise<number> {
    const result = await this.executeQuery.handle(
      connectionConfig,
      new GetQuery().handle(),
    );

    if (result.length > 0) {
      this.printer.print(result);
    }

    return result.length;
  }
}
