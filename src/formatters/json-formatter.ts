import { Formatter } from './formatter';

export class JsonFormatter extends Formatter {
  format(rows: any[]): string {
    return JSON.stringify(rows);
  }
}
