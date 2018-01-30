import { RegisterableSocket } from './RegisterableSocket';
import { injectable, inject } from 'inversify';
import { TYPES } from '../types';
import { UserService } from '../service/UserService';
import { DistrictDTO } from '../model/DistrictSchema';
import { userInfo } from 'os';
import { User, TrackedUser } from '../model/User';
import { Socket } from 'net';

@injectable()
export class UserSocket implements RegisterableSocket {
  private userService: UserService;
  private socket: SocketIO.Socket;
  private io: SocketIO.Server;
  private trackedUsers: TrackedUser[] = [];

  constructor(@inject(TYPES.UserService) userService: UserService) {
    this.userService = userService;
  }

  public register(io: SocketIO.Server): void {
    this.io = io;
    console.log('User Socket Registered');
    this.io.on('connection', (socket: SocketIO.Socket) => {
      this.socket = socket;
      this.socket.on('User:Login_Attempt', (user: User) => this.validateUser(user));
      this.socket.on('disconnect', (reason) => this.untrackUser());
    });
  }

  public untrackUser() {
    this.trackedUsers = this.trackedUsers.filter(usr => usr.socketId !== this.socket.id);
    console.log(this.trackedUsers);
  }

  public trackUser(theUser: User) {
    this.trackedUsers.push({socketId: this.socket.id, user: theUser});
    console.log(this.trackedUsers);
  }

  public async validateUser(theUser: User) {
    const userValid = await this.userService.validateUser(theUser.username, theUser.password);
    console.log(userValid);
    if (userValid) {
      const user = await this.userService.getByUsername(theUser.username);
      this.trackUser(user);
      this.io.to(this.socket.id).emit('User:Login_Success', user);
    } else {
      this.io.to(this.socket.id).emit('User:Login_Failed');
    }
  }
}
