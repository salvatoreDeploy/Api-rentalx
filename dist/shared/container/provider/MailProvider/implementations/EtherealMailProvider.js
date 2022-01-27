"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.EtherealMailProvider = void 0;

var _tsyringe = require("tsyringe");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let EtherealMailProvider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class EtherealMailProvider {
  async createClient() {
    try {
      const account = await _nodemailer.default.createTestAccount();
      this.client = _nodemailer.default.createTransport({
        host: account.smtp.host,
        port: account.smtp.port,
        secure: account.smtp.secure,
        auth: {
          user: account.user,
          pass: account.pass
        }
      });
    } catch (err) {
      console.error(`EtherealMailProvider - Error:\n${err}`);
    }
  }

  constructor() {
    this.client = void 0;
    this.createClient();
  }

  async sendMail(to, subject, variables, path) {
    //Constante leitura do arquivo e converte em string
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8"); //Constante que compila o arquivo


    const templateParse = _handlebars.default.compile(templateFileContent); //Contante que capituras os dados das variaveis


    const templateHtml = templateParse(variables);

    if (!this.client) {
      await this.createClient();
    } //Constante que recebe toda estrutura para montar e enviar o email


    const message = await this.client.sendMail({
      to,
      from: "Rentalx <noreplay@rentalx.com.br>",
      subject,
      html: templateHtml
    });
    console.log("Message sent: %s", message.messageId);
    console.log("Preview URL: %s", _nodemailer.default.getTestMessageUrl(message));
  }

}) || _class) || _class) || _class);
exports.EtherealMailProvider = EtherealMailProvider;