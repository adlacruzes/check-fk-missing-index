import { Formatter } from './formatter';
import { JsonFormatter } from './json-formatter';
import { MinimalFormatter } from './minimal-formatter';
import { TableFormatter } from './table-formatter';

export class GetFormatter {
  public handle(format: string): Formatter {
    switch (format) {
      case 'json':
        return new JsonFormatter();
      case 'minimal':
        return new MinimalFormatter();
      case 'table':
      default:
        return new TableFormatter();
    }
  }
}
