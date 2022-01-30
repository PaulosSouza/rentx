import { hash } from "bcryptjs";
import { v4 as uuidV4 } from "uuid";

import getConnectionTypeOrm from "..";

async function create() {
  const connection = await getConnectionTypeOrm("localhost");

  const id = uuidV4();

  const password = await hash("sGe73)~py}g%%x~%", 8);

  await connection.query(
    `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license)
    values('${id}', 'admin', 'admin@rentx.com.br', '${password}', true, 'now()', 'ABS-1331')
    `
  );

  await connection.close();
}

create().then(() => console.log("User admin created!"));
