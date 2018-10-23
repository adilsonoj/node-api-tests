const nodemailer = require("nodemailer");
const hbs = require("nodemailer-express-handlebars");

const { host, port, user, pass} = require("../config/mail.json");


const transport = nodemailer.createTransport({
    host,
    port,
    auth: {
      user,
      pass
    }
  });

  transport.use('compile', hbs({
    viewEngine: 'handlebars',
    viewPath: './src/app/resources/mail/auth',
    extName: '.html'
  }));

  module.exports = transport;