import {
  deletar, post, atualizar, obterPorId,
} from '../services/evento.service';

const deletarEvento = async (req, res) => {
  const { id } = req.params;
  const event = await deletar({ id });
  return res.status(200).json(event);
};

const getEventoById = async (req, res) => {
  const { id } = req.params;
  const event = await obterPorId({ id });
  return res.status(200).json(event);
};

const atualizarEvento = async (req, res) => {
  const {
    titulo,
    local,
    dataEvento,
    imagemUrl,
    telefone,
    email,
    userId,
    descricao,
  } = req.body;

  const { id } = req.params;

  const user = await atualizar({
    id,
    titulo,
    local,
    dataEvento,
    imagemUrl,
    telefone,
    email,
    userId,
    descricao,
  });
  return res.status(200).json(user);
};

const postEvento = async (req, res) => {
  const {
    titulo,
    local,
    dataEvento,
    imagemUrl,
    telefone,
    email,
    userId,
    descricao,
  } = req.body;

  try {
    const evento = await post({
      titulo,
      local,
      dataEvento,
      imagemUrl,
      telefone,
      email,
      userId,
      descricao,
    });
    return res.status(200).json(evento);
  } catch (error) {
    return error;
  }
};

export {
  deletarEvento, postEvento, atualizarEvento, getEventoById,
};
