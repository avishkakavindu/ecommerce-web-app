import { IVerifyJwtResult } from '@interfaces/core.interface';
import { PRIVATE_KEY, PUBLIC_KEY } from 'configs/envValidator';
import jwt from 'jsonwebtoken';

export const signJwt = (obj: Object, options?: jwt.SignOptions | undefined): string => {
  return jwt.sign(obj, PRIVATE_KEY, { ...(options && options), algorithm: 'RS256' });
};

export const verifyJwt = (token: string): IVerifyJwtResult => {
  try {
    const decoded = jwt.verify(token, PUBLIC_KEY);

    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (error: any) {
    return {
      valid: false,
      expired: error.message === 'jwt expired',
      decoded: '',
    };
  }
};
