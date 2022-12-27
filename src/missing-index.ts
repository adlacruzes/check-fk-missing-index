export class MissingIndex {
  public constructor(
    public readonly table: string,
    public readonly columns: string,
    public readonly size: string,
    public readonly constraint: string,
    public readonly referenced_table: string,
  ) {}
}
