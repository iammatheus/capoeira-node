import {
  deletar, post, atualizar, obterPorId,
} from '../services/filiado.service';

const deletarFiliado = async (req, res) => {
  const { id } = req.params;
  const filiado = await deletar({ id });
  return res.status(200).json(filiado);
};

const getFiliadoById = async (req, res) => {
  const { id } = req.params;
  const filiado = await obterPorId({ id });
  return res.status(200).json(filiado);
};

const atualizarFiliado = async (req, res) => {
  const {
    nome,
    imagemUrl,
    userId,
  } = req.body;

  const { id } = req.params;

  const user = await atualizar({
    id,
    nome,
    imagemUrl,
    userId,
  });
  return res.status(200).json(user);
};

const postFiliado = async (req, res) => {
  const {
    nome,
    imagemUrl,
    userId,
  } = req.body;

  try {
    await post({
      nome,
      imagemUrl,
      userId,
    });
  } catch (error) {
    return error;
  }

  return res.status(200).json({
    message: 'Cadastro efetuado com sucesso!',
  });
};

export {
  deletarFiliado, postFiliado, atualizarFiliado, getFiliadoById,
};
