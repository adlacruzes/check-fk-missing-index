import { Printer } from './printer';
import { JsonPrinter } from './json-printer';
import { MinimalPrinter } from './minimal-printer';
import { TablePrinter } from './table-printer';

export class GetPrinter {
  public handle(format: string): Printer {
    switch (format) {
      case 'json':
        return new JsonPrinter();
      case 'minimal':
        return new MinimalPrinter();
      case 'table':
      default:
        return new TablePrinter();
    }
  }
}
