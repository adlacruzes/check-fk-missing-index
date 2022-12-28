import { CheckMissingIndex } from '../src/check-missing-index';
import { ConnectionConfig } from '../src/database/connection-config';
import { mock, MockProxy } from 'jest-mock-extended';
import { ExecuteQuery } from '../src/database/execute-query';
import { GetQuery } from '../src/database/get-query';
import { MissingIndex } from '../src/missing-index';

describe('Check missing index - unit', () => {
  let checkMissingIndex: CheckMissingIndex;
  let executeQuery: MockProxy<ExecuteQuery>;
  let getQuery: MockProxy<GetQuery>;

  beforeEach(() => {
    executeQuery = mock<ExecuteQuery>();
    getQuery = mock<GetQuery>();

    checkMissingIndex = new CheckMissingIndex(executeQuery, getQuery);
  });

  it('should return one result', async () => {
    const missingIndex = new MissingIndex(
      'table4',
      'table3_id',
      '0 bytes',
      'table4_table3_id_fkey',
      'table3',
    );

    executeQuery.handle.mockReturnValue(Promise.resolve([missingIndex]));

    const result = await checkMissingIndex.handle(
      new ConnectionConfig('user', 'host', 'database', 'password', 1234),
    );

    expect(result).toStrictEqual([missingIndex]);
  });
});
