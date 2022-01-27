import { injectable } from "tsyringe";
import nodemailer, { Transporter } from "nodemailer";
import handlebars from "handlebars";
import fs from "fs";
import { IMailProvider } from "../IMailProvider";

@injectable()
class EtherealMailProvider implements IMailProvider {
  private client: Transporter;

  private async createClient() {
    try {
      const account = await nodemailer.createTestAccount();

      this.client = nodemailer.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass,
        },
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  constructor() {
    this.createClient();
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

    if (!this.client) {
      await this.createClient();
    }

    //Constante que recebe toda estrutura para montar e enviar o email
    const message = await this.client.sendMail({
      to,
      from: "Rentalx <noreplay@rentalx.com.br>",
      subject,
      html: templateHtml,
    });

    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", nodemailer.getTestMessageUrl(message));
  }
}

export { EtherealMailProvider };
