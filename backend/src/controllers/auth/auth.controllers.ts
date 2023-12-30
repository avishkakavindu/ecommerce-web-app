import { Response, Request } from 'express';

import AuthService from '@services/v1/auth/auth.services';
import { handleError } from '@utils/errorHandler/errorHandler';
import { TLoginInput } from '@routes/v1/auth/validations/login.validation';

class AuthController {
  private authService = new AuthService();

  public login = async (req: Request<{}, {}, TLoginInput>, res: Response): Promise<void> => {
    try {
      const { email, password } = req.body;
      const data = await this.authService.login(email, password);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  public getSessions = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = res.locals;
      const data = await this.authService.getSessions(user._id);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };

  public logout = async (req: Request, res: Response): Promise<void> => {
    try {
      const { user } = res.locals;
      const data = await this.authService.logout(user._id);
      res.status(200).json(data);
    } catch (error) {
      handleError(error as Error, res);
    }
  };
}

export default AuthController;
