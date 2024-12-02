import path from 'path';
import * as grpc from '@grpc/grpc-js';
import  { GrpcObject, ServiceClientConstructor } from "@grpc/grpc-js"
import * as protoLoader from '@grpc/proto-loader';
import { ProtoGrpcType } from './generated/a';//auto generated type from the protobuf from geerated
import { AddressBookServiceHandlers } from './generated/AddressBookService';
import { Status } from '@grpc/grpc-js/build/src/constants';

const packageDefinition = protoLoader.loadSync(path.join(__dirname, '../src/a.proto'));
                                                                //first conevrted to unknown and the ahatever type converted that convert
const personProto = grpc.loadPackageDefinition(packageDefinition) as unknown as ProtoGrpcType;
const PERSONS:any[] = [
    {
        name: "harkirat",
        age: 45
    },
    {
      name: "raman",
      age: 45
    },
];

//when you type imported then you have to craete handler then inside the handler you can do multiple method
const handler:AddressBookServiceHandlers={
  AddPerson: (call, callback) => {
    let person = {
      name: call.request.name,
      age: call.request.age
    }
    PERSONS.push(person);
    callback(null, person)
  },
  GetPersonByName: (call, callback) => {//  GetPersonByName same as   getPersonByName
    let person = PERSONS.find(x => x.name === call.request.name);
    if (person) {
      callback(null, person)//here no error so that is why left side as null and at the right side there is data will return
    } else {//if person is not found then we will left side return which error // right side null bcz we dont return any data
      callback({
        code: Status.NOT_FOUND,
        details: "not found"
      }, null);
    }
  }
}



const server = new grpc.Server();
server.addService(personProto.AddressBookService.service,handler);//you have to must pass the handler//inside the handler whatever method it was declared
//like app.listen(3000) in express
server.bindAsync('0.0.0.0:50051', grpc.ServerCredentials.createInsecure(), () => {
    server.start();
});