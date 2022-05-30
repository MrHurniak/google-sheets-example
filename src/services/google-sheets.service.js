import { google } from 'googleapis';
import PropertiesReader from 'properties-reader';

const properties = PropertiesReader('./application.properties');

const auth = new google.auth.GoogleAuth({
    keyFile: properties.get('key.path'),
    scopes: properties.get('google.spreadsheets.auth.url'),
});

const googleSheetsInstance = google.sheets({
    version: properties.get('google.spreadsheets.version'),
    auth
});

const spreadsheetId = properties.get('google.spreadsheets.id');
const range = 'Sheet1!A:F';

export class GoogleSheetsService {

    async append({ firstName, lastName, email, phone, date }) {
        return googleSheetsInstance.spreadsheets.values.get({
                spreadsheetId,
                range,
        }).then(res => {
            const conflictRow = this._findConflictedRow(res, email);
            if (!conflictRow) {
                return this._append(firstName, lastName, email, phone, date);
            } else {
                throw new Error('Already exists');
            }
        });

    }

    _findConflictedRow(res, email) {
        return res.data.values?.find(row => row[2] === email && !row[6]);
    }

    _append(firstName, lastName, email, phone, date) {
        return googleSheetsInstance.spreadsheets.values.append({
            spreadsheetId,
            range,
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [firstName, lastName, email, phone, date, false]
                ]
            }

        })
    }
}
