import { Router } from 'express';
import { format } from 'date-fns';
import { GoogleSheetsService } from '../services/index.js';

const DATETIME_FORMAT = 'yyyy-MM-dd HH:mm XXX';

export const router = Router();

const googleSheetsService = new GoogleSheetsService();

router.get('/', (request, response) => {
    response.render('index');
});


router.post('/', (request, response) => {
    const userRequestInfo = { ...request.body };
    userRequestInfo.date = format(new Date(), DATETIME_FORMAT);

    googleSheetsService.append(userRequestInfo);

    response.render('thankyou');
});
