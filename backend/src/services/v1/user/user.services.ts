import { TUserDocument } from '@db/interfaces/user.interface';
import UserModel from '@db/models/user.model';
import { TCreateUserInput } from '@routes/v1/user/validations/register.validation';

class UserService {
  public async createUser(body: Omit<TCreateUserInput, 'confirmPassword'>): Promise<TUserDocument> {
    const data = await UserModel.create(body);
    return data;
  }
}

export default UserService;
