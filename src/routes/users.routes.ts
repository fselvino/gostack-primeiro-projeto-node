import { Router } from 'express';

import CreateUserService from '../services/CreateUserService';

const userRouter = Router();
/**
 * Repositorios
 * Services
 */

userRouter.post('/', async (request, response) => {
  try {
    const { name, email, password } = request.body;

    // Cria uma instacia do serviço de User
    const createUser = new CreateUserService();
    const user = await createUser.execute({
      name,
      email,
      password,
    });

    // retira o password do retorno das informaçoes
    delete user.password;

    return response.json(user);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});
export default userRouter;
