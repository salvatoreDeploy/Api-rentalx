import { container } from "tsyringe";
import { IMailProvider } from "./IMailProvider";
import { EtherealMailProvider } from "./implementations/EtherealMailProvider";
import { SESMailProvaider } from "./implementations/SESMailProvaider";

const mailProvaider = {
  ethereal: container.resolve(EtherealMailProvider),
  ses: container.resolve(SESMailProvaider),
};

container.registerInstance<IMailProvider>(
  "MailProvider",
  mailProvaider[process.env.MAIL_PROVAIDER]
);
