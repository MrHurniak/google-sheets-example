import nodemailer from 'nodemailer';
import PropertiesReader from 'properties-reader';
import ejs from 'ejs';

const mailProperties = PropertiesReader('./mail.config.properties');
const appProperties = PropertiesReader('./application.properties');


export class MailService {

    generalMailOptions = {
        from: appProperties.get('mail.sender'),
        to: appProperties.get('mail.receiver'),
        subject: appProperties.get('mail.subject'),
    };

    transporter = nodemailer.createTransport({
        host: mailProperties.get('host'),
        port: mailProperties.get('port'),
        secure: false,
        auth: {
            user: mailProperties.get('auth.user'),
            pass: mailProperties.get('auth.password'),
        }
    });

    sendNotification(params) {
        ejs.renderFile('templates/notification.html', params)
            .then(this._sendMail);
    }

    _sendMail(message) {
        this.transporter.sendMail({ ...this.generalMailOptions, html: message })
            .then(result => console.log('Email send with result:', result?.response))
            .catch(console.error);
    }
}
