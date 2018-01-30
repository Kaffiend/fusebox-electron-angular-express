import * as express from 'express';
import * as cors from 'cors';
import * as http from 'http';
import { Server } from 'http';
import * as bodyParser from 'body-parser';
import { TYPES } from './types';
import container from './inversify.config';
import { logger } from './util/Logger';
import { RegistrableController } from './controller/RegisterableController';
import { RegisterableSocket } from './socket/RegisterableSocket';
import * as io from 'socket.io';

// create express application
const app: express.Application = express();
const httpServer: Server = http.createServer(app);
const socketServer: SocketIO.Server = io.listen(httpServer.listen(5002));
// setup default cors response headers.
app.use(cors());
// let express support JSON bodies
app.use(bodyParser.json());
// let express support query params.
app.use(bodyParser.urlencoded({extended: false}));
// grabs the Controller from IoC container and registers all the endpoints
const controllers: RegistrableController[] = container.getAll<RegistrableController>(TYPES.Controller);
controllers.forEach(controller => controller.register(app));

const sockets: RegisterableSocket[] = container.getAll<RegisterableSocket>(TYPES.Socket);
sockets.forEach(socket => socket.register(socketServer));

// setup express middleware logging and error handling
app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    logger.error(String(err.stack));
    next(err);
});

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
    res.status(500).send('Internal Server Error');
});

app.listen(5001, function () {
    console.info('listening on port 5001');
    console.info('sockets listening on 5002');
});
