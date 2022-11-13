import {
  deletar, post, atualizar, obterPorId,
} from '../services/diretoria.service';

const deletarDiretoria = async (req, res) => {
  const { id } = req.params;
  const diretoria = await deletar({ id });
  return res.status(200).json(diretoria);
};

const getDiretoriaById = async (req, res) => {
  const { id } = req.params;
  const diretoria = await obterPorId({ id });
  return res.status(200).json(diretoria);
};

const atualizarDiretoria = async (req, res) => {
  const {
    nome,
    tipo,
    descricao,
    instagram,
    imagemUrl,
    userId,
  } = req.body;

  const { id } = req.params;

  const user = await atualizar({
    id,
    nome,
    tipo,
    descricao,
    instagram,
    imagemUrl,
    userId,
  });
  return res.status(200).json(user);
};

const postDiretoria = async (req, res) => {
  const {
    nome,
    tipo,
    descricao,
    instagram,
    imagemUrl,
    userId,
  } = req.body;

  try {
    const diretoria = await post({
      nome,
      tipo,
      descricao,
      instagram,
      imagemUrl,
      userId,
    });
    return res.status(200).json(diretoria);
  } catch (error) {
    return error;
  }
};

export {
  deletarDiretoria, postDiretoria, atualizarDiretoria, getDiretoriaById,
};
