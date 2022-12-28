import { Formatter } from '../src/formatters/formatter';
import { GetFormatter } from '../src/formatters/get-formatter';

describe('Get formatter - unit', () => {
  const dataset = ['json', 'minimal', 'table', 'unknown'];

  it.each(dataset)('should return formatter', (format) => {
    const getFormatter = new GetFormatter();

    expect(getFormatter.handle(format)).toBeInstanceOf(Formatter);
  });
});
