"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SpecificationMemory = void 0;

var _Specification = require("../../infra/typeorm/entities/Specification");

class SpecificationMemory {
  constructor() {
    this.specifications = [];
  }

  async create({
    name,
    description
  }) {
    const specification = new _Specification.Specification();
    Object.assign(specification, {
      description,
      name
    });
    this.specifications.push(specification);
    return specification;
  }

  async findByName(name) {
    return this.specifications.find(specifications => specifications.name === name);
  }

  async list() {
    const specification = this.specifications;
    return specification;
  }

  async findByIds(ids) {
    const specification = this.specifications.filter(specification => ids.includes(specification.id));
    return specification;
  }

}

exports.SpecificationMemory = SpecificationMemory;