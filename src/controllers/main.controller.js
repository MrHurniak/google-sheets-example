import { Router } from 'express';
import { format } from 'date-fns';
import { GoogleSheetsService, MailService } from '../services/index.js';

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm XXX';

export const router = Router();

const googleSheetsService = new GoogleSheetsService();
const mailService = new MailService();

router.get('/', (request, response) => {
    response.render('index');
});

router.post('/', (request, response, next) => {
    const userRequestInfo = { ...request.body };
    userRequestInfo.date = format(new Date(), DATETIME_FORMAT);

    googleSheetsService.append(userRequestInfo)
        .then(() => mailService.sendNotification(userRequestInfo))
        .then(() => response.render('thankyou'))
        .catch(reason => next(reason));
});
