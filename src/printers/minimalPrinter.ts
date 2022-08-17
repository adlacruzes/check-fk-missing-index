import {PrinterInterface} from "./printerInterface";

export class MinimalPrinter implements PrinterInterface {
  print(rows: any[]): void {
    for (let row of rows) {
      console.log('Missing foreign keys index')
      console.log();
      console.log(` - ${row.table}.${row.columns}`)
      console.log();
    }
  }
}
