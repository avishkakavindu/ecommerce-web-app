import { object, string, TypeOf } from 'zod';

// TODO robust password validations same as in register
export const loginSchema = object({
  body: object({
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' }).min(
      6,
      'The email address or password you entered is incorrect.',
    ),
  }),
});

export type TLoginInput = TypeOf<typeof loginSchema>['body'];
