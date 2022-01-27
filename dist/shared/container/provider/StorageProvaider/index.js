"use strict";

var _tsyringe = require("tsyringe");

var _LocalStorageProvaider = require("./implementaions/LocalStorageProvaider");

var _S3StorageProvaider = require("./implementaions/S3StorageProvaider");

const diskStorage = {
  local: _LocalStorageProvaider.LocalStorageProvaider,
  S3: _S3StorageProvaider.S3StorageProvaider
};

_tsyringe.container.registerSingleton("StorageProvider", //LocalStorageProvaider
diskStorage[process.env.disk]);