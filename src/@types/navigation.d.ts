import {RouteList} from '../routes/stack.routes';

declare global {
  namespace ReactNavigation{
    interface RootParamList extends RouteList {}
  }
}