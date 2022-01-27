"use strict";

var _bcrypt = require("bcrypt");

var _typeorm = require("typeorm");

var _uuid = require("uuid");

async function create() {
  const connection = await (0, _typeorm.createConnection)();
  const id = (0, _uuid.v4)();
  const password = await (0, _bcrypt.hash)("admin", 8);
  await connection.query(`INSERT INTO USERS(id, name, email, password, "isAdmin", created_at, driver_license)
            values('${id}', 'Admin', 'admin@rentalx.com.br', '${password}', true, 'now()', 'XXXXXXX')
        `);
}

create().then(() => console.log("User Admin created"));