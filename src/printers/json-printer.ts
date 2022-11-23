import { Printer } from './printer';

export class JsonPrinter extends Printer {
  print(rows: any[]): void {
    console.log(rows);
  }
}
