import { NextFunction, Response, Request } from 'express';
import UserService from '@services/v1/user/user.services';
import Logger from '@utils/logger';
import { TCreateUserInput } from '@routes/v1/user/validations/register.validation';

class UserController {
  private userService = new UserService();
  private logger = Logger.getLogger();

  public createUser = async (req: Request<{}, {}, TCreateUserInput>, res: Response, next: NextFunction): Promise<void> => {
    try {
      const { body } = req;
      const data = await this.userService.createUser(body);
      res.send(200).json(data);
    } catch (error) {
      this.logger.error(error);
      next(error);
    }
  };
}

export default UserController;
