import { EOL } from 'os';
import { MissingIndex } from '../missing-index';
import { Formatter } from './formatter';

export class MinimalFormatter extends Formatter {
  format(elements: MissingIndex[]): string {
    let result = 'Missing foreign keys index' + EOL;

    for (const element of elements) {
      result += ` - ${element.table}.${element.column}` + EOL;
    }

    return result;
  }
}
