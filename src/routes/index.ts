import { Router } from 'express';

interface Usuario {
  name: string;
  email: string;
}
const routes = Router();
const usuarios: Usuario[] = [];
routes.post('/users', (request, response) => {
  const { name, email } = request.body;
  const user = {
    name,
    email,
  };

  usuarios.push(user);

  return response.json(usuarios);
});

export default routes;
