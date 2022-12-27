import { MissingIndex } from '../missing-index';
import { Formatter } from './formatter';

export class JsonFormatter extends Formatter {
  format(elements: MissingIndex[]): string {
    return JSON.stringify(elements, null, 2);
  }
}
