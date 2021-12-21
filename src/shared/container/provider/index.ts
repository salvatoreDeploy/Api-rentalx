import { container } from "tsyringe";
import { IDateProvider } from "./IDateProvider";
import { IMailProvider } from "./IMailProvider";
import { DayjsDateProvider } from "./implementaions/DayjsDateProvider";
import { EtherealMailProvider } from "./implementaions/EtherealMailProvider";

container.registerSingleton<IDateProvider>(
  "DayjsDateProvider",
  DayjsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);
