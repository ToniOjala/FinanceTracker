export interface IpcRequest {
  responseChannel?: string;
  params?: string[];
}

export enum DBRequestType {
  GET_SINGLE = 'getSingle',
  GET_MANY = 'getMany',
  POST = 'post',
  UPDATE = 'update',
  DELETE = 'delete'
}