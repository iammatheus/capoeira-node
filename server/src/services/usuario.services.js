import {
  getAll, newUser, userExists, deleta, atualiza, getById,
} from '../models/usuario.model';

const todos = async () => {
  const users = await getAll();
  return users;
};

const criar = async ({ nome, email, senha }) => {
  const usuario = await userExists({ email });

  if (usuario) return usuario;

  const user = await newUser({ nome, email, senha });
  return user;
};

const deletar = async ({ id }) => {
  const usuario = await userExists({ id });
  if (!usuario) return { message: 'Usuário não encontrado.' };

  const user = await deleta({ id });
  return { message: `Usuário ${user.id} deletado.` };
};

const obterPorId = async (id) => {
  const usuario = await userExists({ id });
  if (!usuario) return { message: 'Usuário não encontrado.' };

  const result = await getById({ id });
  return result;
};

const atualizar = async ({ id, email, senha }) => {
  const usuario = await userExists({ id });
  if (!usuario) return { message: 'Usuário não encontrado.' };

  const user = await atualiza({ id, email, senha });
  return user;
};

export {
  todos, criar, deletar, atualizar, obterPorId,
};
