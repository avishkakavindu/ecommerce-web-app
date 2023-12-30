import jwt from 'jsonwebtoken';

import { IVerifyJwtResult } from '@interfaces/core.interface';
import { PRIVATE_KEY_PATH, PUBLIC_KEY_PATH } from 'configs/envValidator';
import readKeyFromFile from 'helpers/readKeysFromFile';

export const signJwt = async (obj: Object, options?: jwt.SignOptions | undefined): Promise<string> => {
  const privateKey = await readKeyFromFile(PRIVATE_KEY_PATH);

  return jwt.sign(obj, privateKey, { ...(options && options), algorithm: 'RS256' });
};

export const verifyJwt = async (token: string): Promise<IVerifyJwtResult> => {
  try {
    const publicKey = await readKeyFromFile(PUBLIC_KEY_PATH);
    const decoded = jwt.verify(token, publicKey);

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
