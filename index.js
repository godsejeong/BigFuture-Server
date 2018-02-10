import express from 'express';
import bodyParser from 'body-parser';
import logger from 'morgan';
import fileUpload from 'express-fileupload';
import cors from 'cors';

import constants from './config/constants';

import routes from './routes';

import './database/db';

const app = express();

app.disable('x-powered-by');

app.use(logger(constants.LOG_FORMAT));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(`${__dirname}/public`));
app.use(fileUpload());
app.use(cors());

app.use((req, res, next) => {
    if (req.headers.authorization) {
        req.accessToken = req.headers.authorization;
    }
    next();
});

app.use(routes);

app.listen(constants.PORT, () => {
    console.log(`Server listen to port: ${constants.PORT}`);
});