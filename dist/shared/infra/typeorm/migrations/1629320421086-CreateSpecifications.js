"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateSpecifications1629320421086 = void 0;

var _typeorm = require("typeorm");

class CreateSpecifications1629320421086 {
  async up(queryRunner) {
    await queryRunner.createTable(new _typeorm.Table({
      name: "Specifications",
      columns: [{
        name: "id",
        type: "uuid",
        isPrimary: true
      }, {
        name: "name",
        type: "varchar"
      }, {
        name: "description",
        type: "varchar"
      }, {
        name: "created_at",
        type: "timestamp",
        default: "now()"
      }]
    }));
  }

  async down(queryRunner) {
    await queryRunner.dropTable("Specifications");
  }

}

exports.CreateSpecifications1629320421086 = CreateSpecifications1629320421086;