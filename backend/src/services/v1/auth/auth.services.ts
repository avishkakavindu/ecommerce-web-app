import { FlattenMaps } from 'mongoose';
import { get } from 'lodash';

import { TSessionDocument } from '@db/interfaces/session.interface';
import SessionModel from '@db/models/session.model';
import UserModel from '@db/models/user.model';
import { signJwt, verifyJwt } from '@utils/auth/jwt';
import { JWT_EXPIRY, REFRESH_EXPIRY } from 'configs/envValidator';
import { RESPONSES } from 'constants/responses';
import HttpException from 'exceptions/httpException';

class AuthService {
  public async login(
    email: string,
    password: string,
    userAgent?: string,
  ): Promise<{ accessToken: string; refreshToken: string }> {
    // verify user existence
    const existingUser = await UserModel.findOne({ email });

    if (!existingUser) {
      throw new HttpException({
        code: 409,
        message: RESPONSES.AUTHENTICATION_FAILED,
        userMessage: 'The email address or password you entered is incorrect.',
      });
    }

    // validate password
    const isValid = existingUser.comparePassword(password);

    if (!isValid) {
      throw new HttpException({
        code: 409,
        message: RESPONSES.AUTHENTICATION_FAILED,
        userMessage: 'The email address or password you entered is incorrect.',
      });
    }

    // create session
    const session = await SessionModel.create({ user: existingUser._id, userAgent });

    const jwtPayload = {
      _id: existingUser._id,
      firstName: existingUser.firstName,
      lastName: existingUser.lastName,
      email: existingUser.email,
    };

    // generate access token
    const accessToken = await signJwt(
      {
        ...jwtPayload,
        session: session._id,
      },
      { expiresIn: JWT_EXPIRY },
    );

    // generate refresh token
    const refreshToken = await signJwt(
      {
        ...jwtPayload,
        session: session._id,
      },
      { expiresIn: REFRESH_EXPIRY },
    );

    return { accessToken, refreshToken };
  }

  public async getSessions(userId: string): Promise<FlattenMaps<TSessionDocument[]>> {
    const session = await SessionModel.find({ user: userId, isValid: true }).lean();
    return session;
  }

  public async logout(userId: string): Promise<{ accessToken: null; refreshToken: null }> {
    await SessionModel.findOneAndDelete({ user: userId }).lean();
    return { accessToken: null, refreshToken: null };
  }

  /**
   * Re-Issue access token using refresh token
   * @param {string} refreshToken - refresh token
   * @returns
   */
  public async reIssueAccessToken(refreshToken: string): Promise<string | boolean> {
    const { decoded } = await verifyJwt(refreshToken);
    // verify access token
    if (!decoded || !get(decoded, '_id')) {
      return false;
    }

    const session = await SessionModel.findOne({ user: get(decoded, '_id') }).lean();
    // check if active session is present
    if (!session || !session.isValid) {
      return false;
    }

    const user = await UserModel.findById(session.user).lean();
    // check user existence
    if (!user) {
      return false;
    }

    const jwtPayload = {
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };

    // generate access token
    const accessToken = await signJwt(
      {
        ...jwtPayload,
        session: session._id,
      },
      { expiresIn: JWT_EXPIRY },
    );

    return accessToken;
  }
}

export default AuthService;
