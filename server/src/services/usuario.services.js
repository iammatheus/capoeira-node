import {
  getAll, newUser, userExists, deleta, atualiza,
} from '../models/usuario.model';

const todos = async () => {
  const users = await getAll();
  return users;
};

const criar = async ({ email, senha }) => {
  const usuario = await userExists({ email });

  if (usuario) return usuario;

  const user = await newUser({ email, senha });
  return user;
};

const deletar = async ({ id }) => {
  const usuario = await userExists({ id });
  if (!usuario) return { message: 'Usuário não encontrado.' };

  const user = await deleta({ id });
  return { message: `Usuário ${user.id} deletado.` };
};

const atualizar = async ({ id, email, senha }) => {
  const usuario = await userExists({ id });
  if (!usuario) return { message: 'Usuário não encontrado.' };

  const user = await atualiza({ id, email, senha });
  return user;
};

export {
  todos, criar, deletar, atualizar,
};
