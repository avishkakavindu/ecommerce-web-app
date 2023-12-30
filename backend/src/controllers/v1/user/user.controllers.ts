import { Response, Request } from 'express';

import { TCreateUserInput } from '@routes/v1/user/validations/register.validation';
import UserService from '@services/v1/user/user.services';
import { handleError } from '@utils/errorHandler/errorHandler';

class UserController {
  private userService = new UserService();

  public createUser = async (req: Request<{}, {}, TCreateUserInput>, res: Response): Promise<void> => {
    try {
      const { body } = req;
      const data = await this.userService.createUser(body);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };
}

export default UserController;
