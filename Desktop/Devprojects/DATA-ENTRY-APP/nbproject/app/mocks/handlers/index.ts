import { userHandlers } from './user';
import { accessLogHandlers } from './accessLog';
import { loginHandlers } from './login';

export const handlers = [
  ...userHandlers,
  ...accessLogHandlers,
  ...loginHandlers,
];