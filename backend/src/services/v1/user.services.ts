import { TUserDocument } from '@db/interfaces/user.interface';
import UserModel from '@db/models/user.model';
import { TCreateUserInput } from '@routes/v1/user/validations/register.validation';
import HttpException from 'exceptions/httpException';

class UserService {
  public async createUser(body: TCreateUserInput): Promise<TUserDocument> {
    throw new HttpException({ code: 400, message: 'Name is required!', logging: true });
    const data = await UserModel.create(body);
    return data;
  }
}

export default UserService;
