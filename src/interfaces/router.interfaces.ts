import {ROUTE_NAME} from '@/router/index'

export namespace IRouter {
  export interface IOpenPageParams {
    name: ROUTE_NAME;
    paramsValue: string,
    queryValue: string,
  }
}