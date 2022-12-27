import { Formatter } from './formatter';

export class MinimalFormatter extends Formatter {
  format(rows: any[]): void {
    console.log('Missing foreign keys index');
    console.log();
    for (const row of rows) {
      console.log(` - ${row.table}.${row.columns}`);
      console.log();
    }
  }
}
