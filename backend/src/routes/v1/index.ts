import { IRoute } from '@interfaces/routes.interface';
import IndexRoute from '@routes/index';
import UserRoute from './user/user.routes';

const v1Routes: IRoute[] = [new IndexRoute(), new UserRoute()];

export default v1Routes;
