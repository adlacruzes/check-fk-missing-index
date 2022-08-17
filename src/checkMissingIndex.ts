import {GetQuery} from "./getQuery";
import {ExecuteQuery} from "./executeQuery";
import {ConnectionConfig} from "./connectionConfig";
import {PrinterInterface} from "./printers/printerInterface";

export class CheckMissingIndex {
  constructor(private printer: PrinterInterface) {
  }

  public async handle(
    connectionConfig: ConnectionConfig
  ): Promise<void> {
    const result = await new ExecuteQuery().handle(
      connectionConfig,
      new GetQuery().handle()
    );

    if (result.length > 0) {
      this.printer.print(result);
    }
  }
}
