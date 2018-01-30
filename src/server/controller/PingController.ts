import * as express from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { EndpointService } from '../service/EndpointService';
import { Endpoint } from '../model/Endpoint';
import { RegistrableController } from './RegisterableController';

@injectable()
export class PingController implements RegistrableController {

    public register(app: express.Application): void {
        app.route('/api/ping')
        .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
            console.log('ping pong');
            res.json({ping: 'pong'});
        });
    }
}
