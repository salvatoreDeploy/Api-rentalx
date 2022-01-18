import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { IMailProvider } from "./IMailProvider";
import { DayjsDateProvider } from "./implementaions/DayjsDateProvider";
import { EtherealMailProvider } from "./implementaions/EtherealMailProvider";
import { LocalStorageProvaider } from "./implementaions/LocalStorageProvaider";
import { S3StorageProvaider } from "./implementaions/S3StorageProvaider";
import { IStorageProvider } from "./IStorageProvaider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

const diskStorage = {
  local: LocalStorageProvaider,
  S3: S3StorageProvaider,
};

container.registerSingleton<IStorageProvider>(
  "StorageProvider",
  //LocalStorageProvaider
  diskStorage[process.env.disk]
);
