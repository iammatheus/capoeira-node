import {
  novoEvento, deleta, eventExists, atualiza, getEventoById,
} from '../models/evento.model';

const post = async ({
  titulo, local, dataEvento, imagemUrl, telefone, email, userId, descricao,
}) => {
  const evento = await novoEvento({
    titulo, local, dataEvento, imagemUrl, telefone, email, userId, descricao,
  });
  return evento;
};

const atualizar = async ({
  id, titulo, local, dataEvento, imagemUrl, telefone, email, userId, descricao,
}) => {
  const usuario = await eventExists({ id });
  if (!usuario) return { message: 'Evento não encontrado.' };

  const user = await atualiza({
    id, titulo, local, dataEvento, imagemUrl, telefone, email, userId, descricao,
  });
  return user;
};

const deletar = async ({ id }) => {
  const evento = await eventExists({ id });
  if (!evento) return { message: 'Evento não encontrado.' };

  await deleta({ id });
  return { message: 'Deletado' };
};

const obterPorId = async ({ id }) => {
  const evento = await eventExists({ id });
  if (!evento) return { message: 'Evento não encontrado.' };

  const result = await getEventoById({ id });
  return result;
};

export {
  post, deletar, atualizar, obterPorId,
};
