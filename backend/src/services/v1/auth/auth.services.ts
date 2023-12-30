import { TSessionDocument } from '@db/interfaces/session.interface';
import SessionModel from '@db/models/session.model';
import UserModel from '@db/models/user.model';
import { signJwt } from '@utils/auth/jwt';
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

    // generate access token
    const accessToken = signJwt(
      {
        ...existingUser, // or pass selected properties
        session: session._id,
      },
      { expiresIn: JWT_EXPIRY },
    );

    // generate refresh token
    const refreshToken = signJwt(
      {
        ...existingUser, // or pass selected properties
        session: session._id,
      },
      { expiresIn: REFRESH_EXPIRY },
    );

    return { accessToken, refreshToken };
  }
}

export default AuthService;
