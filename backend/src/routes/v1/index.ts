import { IRoute } from '@interfaces/routes.interface';
import IndexRoute from '@routes/index';
import UserRoute from './user/user.routes';
import AuthRoute from './auth/auth.routes';

const v1Routes: IRoute[] = [new IndexRoute(), new UserRoute(), new AuthRoute()];

export default v1Routes;
