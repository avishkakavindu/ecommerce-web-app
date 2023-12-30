import { TUserDocument } from '@db/interfaces/user.interface';
import UserModel from '@db/models/user.model';
import { TCreateUserInput } from '@routes/v1/user/validations/register.validation';
import { RESPONSES } from 'constants/responses';
import HttpException from 'exceptions/httpException';

class UserService {
  public async createUser(body: Omit<TCreateUserInput, 'confirmPassword'>): Promise<TUserDocument> {
    try {
      const data = await UserModel.create(body);
      return data;
    } catch (error: any) {
      if (error.code === 11000 || error.code === 11001) {
        // duplicate key error
        throw new HttpException({ code: 409, message: RESPONSES.RECORD_ALREADY_EXISTS, userMessage: 'Account already exists' });
      }
      throw error;
    }
  }
}

export default UserService;
