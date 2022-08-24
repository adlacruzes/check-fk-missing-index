import { PrinterInterface } from './printerInterface';
import { JsonPrinter } from './jsonPrinter';
import { MinimalPrinter } from './minimalPrinter';
import { TablePrinter } from './tablePrinter';

export function GetPrinter(format: string): PrinterInterface {
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
