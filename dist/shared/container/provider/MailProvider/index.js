"use strict";

var _tsyringe = require("tsyringe");

var _EtherealMailProvider = require("./implementations/EtherealMailProvider");

var _SESMailProvaider = require("./implementations/SESMailProvaider");

const mailProvaider = {
  ethereal: _tsyringe.container.resolve(_EtherealMailProvider.EtherealMailProvider),
  ses: _tsyringe.container.resolve(_SESMailProvaider.SESMailProvaider)
};

_tsyringe.container.registerInstance("MailProvider", mailProvaider[process.env.MAIL_PROVAIDER]);