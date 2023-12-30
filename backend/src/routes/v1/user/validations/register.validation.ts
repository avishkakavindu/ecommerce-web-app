import { object, string, TypeOf } from 'zod';

// TODO robust password validations
export const createUserSchema = object({
  body: object({
    firstName: string({ required_error: 'First name is required' }),
    lastName: string({ required_error: 'Last name is required' }),
    email: string({ required_error: 'Email is required' }).email('Invalid email'),
    password: string({ required_error: 'Password is required' }).min(6, 'Password too short - should be 6 characters minimum'),
    confirmPassword: string({ required_error: 'Password is required' }),
  }).refine(data => data.password === data.confirmPassword, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

// wew don't need to pass confirmPassword to deeper layers so omit it
export type TCreateUserInput = Omit<TypeOf<typeof createUserSchema>['body'], 'confirmPassword'>;
