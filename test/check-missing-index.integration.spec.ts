import { CheckMissingIndex } from '../src/check-missing-index';
import { ExecuteQuery } from '../src/database/execute-query';
import { GetQuery } from '../src/database/get-query';
import { MissingIndex } from '../src/missing-index';
import { TestDatabase } from './test-database';

describe('Check missing index - integration', () => {
  afterEach(async () => {
    await TestDatabase.clean();
  });

  it('should return two results', async () => {
    await TestDatabase.loadFixture('should-return-two-results');

    const result = await new CheckMissingIndex(
      new ExecuteQuery(),
      new GetQuery(),
    ).handle(TestDatabase.connectionConfig);

    expect(result).toEqual([
      new MissingIndex(
        'table2',
        'table1_id',
        'table2_table1_id_fkey',
        'table1',
        '0 bytes',
      ),
      new MissingIndex(
        'table4',
        'table3_id',
        'table4_table3_id_fkey',
        'table3',
        '0 bytes',
      ),
    ]);
  });
});
