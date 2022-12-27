import { Formatter } from './formatter';

export class JsonFormatter extends Formatter {
  format(rows: any[]): void {
    console.log(rows);
  }
}
