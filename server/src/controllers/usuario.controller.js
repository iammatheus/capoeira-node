import jwt from 'jsonwebtoken';
import {
  todos, criar, deletar, atualizar, obterPorId,
} from '../services/usuario.services';

const SECRET = 'teste';

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
  const { nome, email, senha } = req.body;
  const { id } = req.params;

  await atualizar({
    id, nome, email, senha,
  });

  const token = jwt.sign(
    {
      userId: id,
      nome,
      email,
    },
    SECRET,
  );

  return res.status(200).json({ token, nome });
};

export {
  getAll, createUser, deleteUser, updateUser, getUserById,
};
