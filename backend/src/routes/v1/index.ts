import { AbstractRoute } from '@routes/index';
import TestRoute from './test/test.route';

export const routes: AbstractRoute[] = [
  new TestRoute(),
  // rest of the routes goes in here...
];
