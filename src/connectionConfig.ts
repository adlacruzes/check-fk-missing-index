export class ConnectionConfig {
  constructor(
    public user: string,
    public host: string,
    public database: string,
    public password: string,
    public port: number,
  ) {}
}
