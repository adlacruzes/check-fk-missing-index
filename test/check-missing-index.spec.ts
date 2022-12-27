import { CheckMissingIndex } from '../src/check-missing-index';
import { ConnectionConfig } from '../src/database/connection-config';
import { mock, MockProxy } from 'jest-mock-extended';
import { ExecuteQuery } from '../src/database/execute-query';
import { Formatter } from '../src/formatters/formatter';
import { GetQuery } from '../src/database/get-query';

describe('Check missing index', () => {
  let checkMissingIndex: CheckMissingIndex;
  let executeQuery: MockProxy<ExecuteQuery>;
  let getQuery: MockProxy<GetQuery>;
  let formatter: MockProxy<Formatter>;

  beforeEach(() => {
    executeQuery = mock<ExecuteQuery>();
    formatter = mock<Formatter>();
    getQuery = mock<GetQuery>();

    checkMissingIndex = new CheckMissingIndex(
      executeQuery,
      getQuery,
      formatter,
    );
  });

  it('should return one result', async () => {
    executeQuery.handle.mockReturnValue(Promise.resolve([1]));

    const result = await checkMissingIndex.handle(
      new ConnectionConfig('user', 'host', 'database', 'password', 1234),
    );

    expect(result).toBe(1);
  });
});
