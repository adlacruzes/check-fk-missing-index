import { CheckMissingIndex } from '../src/checkMissingIndex';
import { ConnectionConfig } from '../src/database/connectionConfig';
import { mock, MockProxy } from 'jest-mock-extended';
import { ExecuteQuery } from '../src/database/executeQuery';
import { PrinterInterface } from '../src/printers/printerInterface';
import { GetQuery } from '../src/database/getQuery';

describe('Check missing index', () => {
  let checkMissingIndex: CheckMissingIndex;
  let executeQuery: MockProxy<ExecuteQuery>;
  let getQuery: MockProxy<GetQuery>;
  let printer: MockProxy<PrinterInterface>;

  beforeEach(() => {
    executeQuery = mock<ExecuteQuery>();
    printer = mock<PrinterInterface>();
    getQuery = mock<GetQuery>();

    checkMissingIndex = new CheckMissingIndex(executeQuery, getQuery, printer);
  });

  it('should return one result', async () => {
    executeQuery.handle.mockReturnValue(Promise.resolve([1]));

    const result = await checkMissingIndex.handle(
      new ConnectionConfig('user', 'host', 'database', 'password', 1234),
    );

    expect(result).toBe(1);
  });
});