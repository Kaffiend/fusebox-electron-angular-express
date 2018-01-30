import * as express from 'express';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { UserService } from '../service/UserService';
import { User } from '../model/User';
import { RegistrableController } from './RegisterableController';

@injectable()
export class UserController implements RegistrableController {
  private userService: UserService;

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.userService = userService;
  }

  public register(app: express.Application): void {
    app
      .route('/api/user')
      .post(
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          const user = new User(
            req.body.username,
            req.body.name,
            req.body.email,
            req.body.roles,
            req.body._id,
            req.body.password
          );
          const createdUser = await this.userService
            .createUser(user)
            .catch(err => {
              if (err.code === 11000) {
                res
                  .status(409)
                  .send({ code: 11000, errmsg: 'Duplicate Key Error' });
                res.end();
              } else {
                console.log(err);
                throw err;
              }
            });
          res.json(createdUser);
        }
      );
    app
      .route('/api/user/login')
      .get(
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          // dont take query params directly into services or repos.
          let username = req.query.username;
          let password = req.query.password;
          let valid = await this.userService.validateUser(username, password);
          if (valid) {
            const user = await this.userService.getByUsername(username);
            res.status(200).json(user);
          } else {
            res.status(401).end();
          }
        }
      );
    app
      .route('/api/user/:id')
      .get(
        async (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
          const user = await this.userService
            .getUser(<string>req.params.id)
            .catch(err => next(err));
          res.status(200).json(user);
        }
      );
  }
}
