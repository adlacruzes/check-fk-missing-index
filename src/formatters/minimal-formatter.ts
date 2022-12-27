import { EOL } from 'os';
import { Formatter } from './formatter';

export class MinimalFormatter extends Formatter {
  format(rows: any[]): string {
    let result = 'Missing foreign keys index' + EOL;

    for (const row of rows) {
      result += ` - ${row.table}.${row.columns}` + EOL;
    }

    return result;
  }
}
