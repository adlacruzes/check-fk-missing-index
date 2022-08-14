import {CheckMissingIndex} from "./checkMissingIndex";
import {GetQuery} from "./getQuery";
import {GetConnection} from "./getConnection";

const index = async () => {
  const result = await (new CheckMissingIndex().handle(
    new GetConnection().handle(),
    new GetQuery().handle()
  ));

  console.log(
    result.rows
  )
}

index();
