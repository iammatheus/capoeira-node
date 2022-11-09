import {
  novaDiretoria, deleta, diretoriaExists, atualiza, getDiretoriaById,
} from '../models/diretoria.model';

const post = async ({
  nome,
  tipo,
  descricao,
  imagemUrl,
  userId,
}) => {
  const diretoria = await novaDiretoria({
    nome,
    tipo,
    descricao,
    imagemUrl,
    userId,
  });
  return diretoria;
};

const atualizar = async ({
  id,
  nome,
  tipo,
  descricao,
  imagemUrl,
  userId,
}) => {
  const usuario = await diretoriaExists({ id });
  if (!usuario) return { message: 'Diretoria não encontrada.' };

  const user = await atualiza({
    id,
    nome,
    tipo,
    descricao,
    imagemUrl,
    userId,
  });
  return user;
};

const deletar = async ({ id }) => {
  const diretoria = await diretoriaExists({ id });
  if (!diretoria) return { message: 'Diretoria não encontrada.' };

  await deleta({ id });
  return { message: 'Deletado' };
};

const obterPorId = async ({ id }) => {
  const diretoria = await diretoriaExists({ id });
  if (!diretoria) return { message: 'Diretoria não encontrada.' };

  const result = await getDiretoriaById({ id });
  return result;
};

export {
  post, deletar, atualizar, obterPorId,
};
