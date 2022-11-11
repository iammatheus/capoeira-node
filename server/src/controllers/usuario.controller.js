import {
  todos, criar, deletar, atualizar, obterPorId,
} from '../services/usuario.services';

const getAll = async (req, res) => {
  const users = await todos();

  const id = '_id';

  const newList = users.map((user) => ({
    nome: user.nome,
    email: user.email,
    _id: user[`${id}`],
  }));

  return res.status(200).json(newList);
};

const createUser = async (req, res) => {
  const { nome, email, senha } = req.body;

  const { nome: name, email: mail, _id } = await criar({ nome, email, senha });
  return res.status(200).json({ name, mail, _id });
};

const deleteUser = async (req, res) => {
  const { id } = req.params;
  const user = await deletar({ id });
  return res.status(200).json(user);
};

const getUserById = async (req, res) => {
  const { id } = req.params;
  const user = await obterPorId(id);
  return res.status(200).json(user);
};

const updateUser = async (req, res) => {
  const { email, senha } = req.body;
  const { id } = req.params;

  const user = await atualizar({ id, email, senha });
  return res.status(200).json(user);
};

export {
  getAll, createUser, deleteUser, updateUser, getUserById,
};
