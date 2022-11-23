import { Printer } from '../src/printers/printer';
import { GetPrinter } from '../src/printers/get-printer';

describe('Get printer', () => {
  const dataset = ['json', 'minimal', 'table', 'unknown'];

  it.each(dataset)('should return printer', (format) => {
    const getPrinter = new GetPrinter();

    expect(getPrinter.handle(format)).toBeInstanceOf(Printer);
  });
});
