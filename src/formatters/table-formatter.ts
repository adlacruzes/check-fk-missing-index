import { Formatter } from './formatter';
import { getBorderCharacters, table } from 'table';

export class TableFormatter extends Formatter {
  format(rows: any[]): void {
    const headers = Object.keys(rows[0]).map((r) => r.toUpperCase());

    const values = rows.map((row) => {
      return Object.values(row);
    });

    values.unshift(headers);

    const config = {
      header: {
        content: 'Missing foreign keys index',
      },
      border: getBorderCharacters(`ramac`),
    };

    console.log(table(values, config));
  }
}
