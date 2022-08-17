import {PrinterInterface} from "./printerInterface";

export class JsonPrinter implements PrinterInterface {
  print(rows: any[]): void {
    console.log(rows);
  }
}
