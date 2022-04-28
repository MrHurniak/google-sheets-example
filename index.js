import { google } from 'googleapis';
import express from 'express';
import ejs from 'ejs'
import PropertiesReader from 'properties-reader';
import { format } from 'date-fns'

const DATETIME_FORMAT = "yyyy-MM-dd HH:mm XXX";

const properties = PropertiesReader("./application.properties");
const SERVER_PORT = properties.get('server.port');

const auth = new google.auth.GoogleAuth({
    keyFile: properties.get('key.path'),
    scopes: properties.get('google.spreadsheets.auth.url'),
});

const googleSheetsInstance = google.sheets({
    version: properties.get("google.spreadsheets.version"),
    auth
});
const spreadsheetId = properties.get("google.spreadsheets.id");

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.get('/', (request, response) => {
    response.render('index');
});


app.post('/', (request, response) => {
    const { firstName, lastName, email, phone } = request.body;
    const datetime = format(new Date(), DATETIME_FORMAT);
    googleSheetsInstance.spreadsheets.values.append({
        spreadsheetId,
        range: 'Sheet1!A:D',
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [
                [firstName, lastName, email, phone, datetime]
            ]
        }

    })
    response.render('thankyou');
});

app.listen(
    SERVER_PORT, () => console.log(`Server started on port localhost:${ SERVER_PORT }`)
);
