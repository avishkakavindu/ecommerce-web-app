import { IRoute } from '@interfaces/routes.interface';
import IndexRoute from '@routes/index';
import UserRoute from './user/user.routes';
import AuthRoute from './auth/auth.routes';
import ProductRoute from './product/product.routes';
import AttachmentRoute from './attachment/attachment.routes';

const v1Routes: IRoute[] = [new IndexRoute(), new UserRoute(), new AuthRoute(), new ProductRoute(), new AttachmentRoute()];

export default v1Routes;
