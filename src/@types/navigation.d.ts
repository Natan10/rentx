import {AppStackRouteList} from '../routes/app.stack.routes';
import {AppTabRouteList} from '../routes/app.tab.routes';
import {AuthRouteList} from '../routes/auth.routes';

declare global {
  namespace ReactNavigation{
    interface RootParamList extends AppStackRouteList,AppTabRouteList,AuthRouteList {}
  }
}