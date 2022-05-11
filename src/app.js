import express from 'express';
import ejs from 'ejs'
import PropertiesReader from 'properties-reader';
import { MainController } from './controllers/index.js';

const properties = PropertiesReader('./application.properties');
const SERVER_PORT = properties.get('server.port');

const app = express()

app.use(express.urlencoded({ extended: true }));
app.use(express.static('./public'));
app.set('view engine', 'ejs');

app.use('/', MainController);

app.listen(
    SERVER_PORT, () => console.log(`Server started on port localhost:${ SERVER_PORT }`)
);
