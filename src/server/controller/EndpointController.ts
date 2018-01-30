import * as express from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { EndpointService } from '../service/EndpointService';
import { Endpoint } from '../model/Endpoint';
import { RegistrableController } from './RegisterableController';

@injectable()
export class EndpointController implements RegistrableController {
    private endpointService: EndpointService;

    constructor( @inject(TYPES.EndpointService) endpointService: EndpointService) {
        this.endpointService = endpointService;
    }

    public register(app: express.Application): void {
        app.route('/api/endpoint')
            .get(async (req: express.Request, res: express.Response, next: express.NextFunction) => {
                const endpoints = await this.endpointService.getAllEndpoints().catch(err => next(err));
                //setTimeout(() => res.json(endpoints), 5000);
                console.log('eww cobol cooties!!!');
                res.json(endpoints);
            });
    }
}
