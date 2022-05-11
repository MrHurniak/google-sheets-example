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

export class GoogleSheetsService {

    append({ firstName, lastName, email, phone, date }) {
        googleSheetsInstance.spreadsheets.values.append({
            spreadsheetId,
            range: 'Sheet1!A:D',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [firstName, lastName, email, phone, date]
                ]
            }

        })
    }
}
