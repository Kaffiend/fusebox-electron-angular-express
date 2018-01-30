import { Container } from 'inversify';
import { TYPES } from './types';
import { TAGS } from './tags';
import { RegistrableController } from './controller/RegisterableController';
import { RegisterableSocket } from './socket/RegisterableSocket';

import { AddressService, AddressServiceImpl } from './service/AddressService';
import { AddressRepository } from './repository/AddressRepository';
import { AddressController } from './controller/AddressController';

import { PingController } from './controller/PingController';
import { EndpointController } from './controller/EndpointController';
import { EndpointRepository } from './repository/EndpointRepository';
import { EndpointService, EndpointServiceImpl } from './service/EndpointService';


import { UserController } from './controller/UserController';
import { UserRepository } from './repository/UserRepository';
import { UserService, UserServiceImpl } from './service/UserService';
import { UserSocket } from './socket/UserSocket';

import { CountyConfigService, CountyConfigServiceImpl } from './service/CountyConfigService';
import { CountyConfigRepository } from './repository/CountyConfigRepository';
import { CountyConfigSocket } from './socket/CountyConfigSocket';

import { DistrictService, DistrictServiceImpl } from './service/DistrictService';

import { DistrictRepository } from './repository/DistrictRepository';
import { DistrictSocket } from './socket/DistrictSocket';

import { PingSocket } from './socket/PingSocket';


const container = new Container();
// RegistrableController is the only interface the IOC container needs to know about.
// Does not need to know the types of the controllers that implement it.
// Only needs the register method. So all controllers can derive and be bound by that contract.

container.bind<RegisterableSocket>(TYPES.Socket).to(UserSocket);
container.bind<RegisterableSocket>(TYPES.Socket).to(CountyConfigSocket);
container.bind<RegisterableSocket>(TYPES.Socket).to(DistrictSocket);
container.bind<RegisterableSocket>(TYPES.Socket).to(PingSocket);

container.bind<RegistrableController>(TYPES.Controller).to(AddressController);
container.bind<RegistrableController>(TYPES.Controller).to(EndpointController);
container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<RegistrableController>(TYPES.Controller).to(PingController);

container.bind<AddressRepository>(TYPES.AddressRepository).to(AddressRepository);
container.bind<AddressService>(TYPES.AddressService).to(AddressServiceImpl);
container.bind<EndpointRepository>(TYPES.EndpointRepository).to(EndpointRepository);
container.bind<EndpointService>(TYPES.EndpointService).to(EndpointServiceImpl);

container.bind<UserRepository>(TYPES.UserRepository).to(UserRepository);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);

container.bind<CountyConfigRepository>(TYPES.CountyConfigRepository).to(CountyConfigRepository);
container.bind<CountyConfigService>(TYPES.CountyConfigService).to(CountyConfigServiceImpl);

container.bind<DistrictRepository>(TYPES.DistrictRepository).to(DistrictRepository);
container.bind<DistrictService>(TYPES.DistrictService).to(DistrictServiceImpl);

export default container;
