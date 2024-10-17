import express, { Express } from 'express';
import bodyParser from 'body-parser'
import dotenv from 'dotenv';
dotenv.config();

const app: Express = express();
const port = parseInt(process.env.PORT) || 3000;

app.set('views', `${__dirname}/views`)
app.set('view engine', `pug`)


// parse application/json
app.use(bodyParser.json())

import * as routeClient from './routes/client/index.route'
routeClient.index(app);

app.use(express.static('public')); // File tĩnh

app.listen(port, () => {
	console.log(`Đang lắng nghe cổng ${port}`)
})