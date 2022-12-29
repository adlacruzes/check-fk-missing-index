import { CheckMissingIndex } from '../src/check-missing-index';
import { ExecuteQuery } from '../src/database/execute-query';
import { GetQuery } from '../src/database/get-query';
import { MissingIndex } from '../src/missing-index';
import { TestDatabase } from './test-database';

describe('Check missing index - integration', () => {
  beforeEach(async () => {
    await TestDatabase.loadFixture('');
  });

  afterEach(async () => {
    await TestDatabase.clean();
  });

  it('should return json', async () => {
    const result = await new CheckMissingIndex(
      new ExecuteQuery(),
      new GetQuery(),
    ).handle(TestDatabase.connectionConfig);

    expect(result).toEqual([
      new MissingIndex(
        'table2',
        'table1_id',
        '0 bytes',
        'table2_table1_id_fkey',
        'table1',
      ),
      new MissingIndex(
        'table4',
        'table3_id',
        '0 bytes',
        'table4_table3_id_fkey',
        'table3',
      ),
    ]);
  });
});
