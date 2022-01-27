import { container } from "tsyringe";
import { LocalStorageProvaider } from "./implementaions/LocalStorageProvaider";
import { S3StorageProvaider } from "./implementaions/S3StorageProvaider";
import { IStorageProvider } from "./IStorageProvaider";

const diskStorage = {
  local: LocalStorageProvaider,
  S3: S3StorageProvaider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  //LocalStorageProvaider
  diskStorage[process.env.disk]
);
