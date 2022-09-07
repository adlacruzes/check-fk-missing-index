import { Printer } from './printer';

export class MinimalPrinter extends Printer {
  print(rows: any[]): void {
    console.log('Missing foreign keys index');
    console.log();
    for (const row of rows) {
      console.log(` - ${row.table}.${row.columns}`);
      console.log();
    }
  }
}
