import { hash } from "bcryptjs";
import { Connection } from "typeorm";
import { Factory, Seeder } from "typeorm-seeding";
import { v4 as uuidV4 } from "uuid";

import User from "@modules/accounts/typeorm/entities/User";

export default class CreateAdminUser implements Seeder {
  public async run(_: Factory, connection: Connection): Promise<any> {
    const id = uuidV4();

    const password = await hash("sGe73)~py}g%%x~%", 8);

    await connection
      .createQueryBuilder()
      .insert()
      .into(User)
      .values([
        {
          id,
          name: "admin",
          email: "admin@rentx.com.br",
          password,
          isAdmin: "true",
          created_at: new Date(),
          driver_license: "ABS-1331",
        },
      ])
      .execute();
  }
}
