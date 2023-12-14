export class MissingIndex {
  public constructor(
    public readonly table: string,
    public readonly column: string,
    public readonly constraint: string,
    public readonly referenced_table: string,
    public readonly size: string,
  ) {}
}
