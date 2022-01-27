import { injectable } from "tsyringe";
import { IMailProvider } from "../IMailProvider";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { SES } from "aws-sdk";

@injectable()
class SESMailProvaider implements IMailProvider {
  private client: Transporter;

  constructor() {
    this.client = nodemailer.createTransport({
      SES: new SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION,
      }),
    });
  }

  async sendMail(
    to: string,
    subject: string,
    variables: any,
    path: string
  ): Promise<void> {
    //Constante leitura do arquivo e converte em string
    const templateFileContent = fs.readFileSync(path).toString("utf-8");

    //Constante que compila o arquivo
    const templateParse = handlebars.compile(templateFileContent);

    //Contante que capituras os dados das variaveis
    const templateHtml = templateParse(variables);

    //Constante que recebe toda estrutura para montar e enviar o email
    await this.client.sendMail({
      to,
      from: "Rentalx <adm@deployproject.com>",
      subject,
      html: templateHtml,
    });
  }
}

export { SESMailProvaider };
