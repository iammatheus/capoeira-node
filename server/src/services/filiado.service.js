import {
  novoFiliado, deleta, filiadoExists, atualiza, getFiliadoById,
} from '../models/filiado.model';

const post = async ({
  nome,
  imagemUrl,
  userId,
}) => {
  const filiado = await novoFiliado({
    nome,
    imagemUrl,
    userId,
  });
  return filiado;
};

const atualizar = async ({
  id,
  nome,
  imagemUrl,
  userId,
}) => {
  const usuario = await filiadoExists({ id });
  if (!usuario) return { message: 'Filiado não encontrado.' };

  const user = await atualiza({
    id,
    nome,
    imagemUrl,
    userId,
  });
  return user;
};

const deletar = async ({ id }) => {
  const filiado = await filiadoExists({ id });
  if (!filiado) return { message: 'Filiado não encontrado.' };

  await deleta({ id });
  return { message: 'Deletado' };
};

const obterPorId = async ({ id }) => {
  const filiado = await filiadoExists({ id });
  if (!filiado) return { message: 'Filiado não encontrado.' };

  const result = await getFiliadoById({ id });
  return result;
};

export {
  post, deletar, atualizar, obterPorId,
};
