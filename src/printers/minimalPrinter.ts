import {PrinterInterface} from "./printerInterface";

export class MinimalPrinter implements PrinterInterface {
  print(rows: any[]): void {
    console.log('Missing foreign keys index')
    console.log();
    for (let row of rows) {
      console.log(` - ${row.table}.${row.columns}`)
      console.log();
    }
  }
}
