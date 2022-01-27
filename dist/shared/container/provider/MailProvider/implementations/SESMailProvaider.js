"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SESMailProvaider = void 0;

var _tsyringe = require("tsyringe");

var _nodemailer = _interopRequireDefault(require("nodemailer"));

var _handlebars = _interopRequireDefault(require("handlebars"));

var _fs = _interopRequireDefault(require("fs"));

var _awsSdk = require("aws-sdk");

var _dec, _dec2, _dec3, _class;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

let SESMailProvaider = (_dec = (0, _tsyringe.injectable)(), _dec2 = Reflect.metadata("design:type", Function), _dec3 = Reflect.metadata("design:paramtypes", []), _dec(_class = _dec2(_class = _dec3(_class = class SESMailProvaider {
  constructor() {
    this.client = void 0;
    this.client = _nodemailer.default.createTransport({
      SES: new _awsSdk.SES({
        apiVersion: "2010-12-01",
        region: process.env.AWS_REGION
      })
    });
  }

  async sendMail(to, subject, variables, path) {
    //Constante leitura do arquivo e converte em string
    const templateFileContent = _fs.default.readFileSync(path).toString("utf-8"); //Constante que compila o arquivo


    const templateParse = _handlebars.default.compile(templateFileContent); //Contante que capituras os dados das variaveis


    const templateHtml = templateParse(variables); //Constante que recebe toda estrutura para montar e enviar o email

    await this.client.sendMail({
      to,
      from: "Rentalx <adm@deployproject.com>",
      subject,
      html: templateHtml
    });
  }

}) || _class) || _class) || _class);
exports.SESMailProvaider = SESMailProvaider;