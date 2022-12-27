import { Formatter } from './formatter';
import { getBorderCharacters, table } from 'table';
import { MissingIndex } from '../missing-index';

export class TableFormatter extends Formatter {
  format(elements: MissingIndex[]): string {
    const headers = Object.keys(elements[0]).map((r) => r.toUpperCase());

    const values = elements.map((element) => {
      return Object.values(element);
    });

    values.unshift(headers);

    const config = {
      header: {
        content: 'Missing foreign keys index',
      },
      border: getBorderCharacters(`ramac`),
    };

    return table(values, config);
  }
}
