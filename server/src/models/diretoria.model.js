import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const novaDiretoria = async ({
  nome,
  tipo,
  descricao,
  imagemUrl,
  userId,
}) => {
  const db = await connection();
  const diretoria = await db.collection('diretorias').insertOne({
    nome,
    tipo,
    descricao,
    imagemUrl,
    userId,
  });
  const { insertedId: _id } = diretoria;
  return {
    nome,
    tipo,
    descricao,
    imagemUrl,
    userId,
    _id,
  };
};

const diretoriaExists = async ({ nome, id }) => {
  const db = await connection();
  let diretoria = null;
  if (id) {
    diretoria = await db.collection('diretorias').findOne({ _id: ObjectId(id) });
  } else {
    diretoria = await db.collection('diretorias').findOne({ nome });
  }
  return diretoria;
};

const deleta = async ({ id }) => {
  const db = await connection();
  await db.collection('diretorias').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const getDiretoriaById = async ({ id }) => {
  const db = await connection();
  const diretoria = await db.collection('diretorias').findOne({ _id: ObjectId(id) });
  return { diretoria };
};

const atualiza = async ({
  id,
  nome,
  tipo,
  descricao,
  imagemUrl,
  userId,
}) => {
  const db = await connection();
  await db.collection('diretorias').updateOne({ _id: ObjectId(id) }, {
    $set:
    {
      nome,
      tipo,
      descricao,
      imagemUrl,
      userId,
    },
  });
  return {
    nome,
    tipo,
    descricao,
    imagemUrl,
    userId,
  };
};

const paginatedDiretorias = async (req, res) => {
  try {
    const { term } = req.query;
    const db = await connection();
    const currentPage = +req.query.skip;
    let itemsPerPage = +req.query.limit;

    if (term != null && term !== '') {
      const teste = await db.collection('diretorias').find({ $or: [{ tipo: term }, { nome: term }] }).toArray();
      const totalItems = teste.length;
      itemsPerPage = totalItems;
      const skipValue = (+req.query.skip - 1) * itemsPerPage;
      const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

      const posts = await db.collection('diretorias').find({ $or: [{ tipo: term }, { nome: term }] })
        .limit(itemsPerPage)
        .skip(skipValue)
        .toArray();
      res.status(200).json({
        data: posts,
        pagination: {
          totalItems, totalPages, currentPage, itemsPerPage,
        },
      });
    } else {
      const totalItems = await db.collection('diretorias').countDocuments();
      itemsPerPage = +req.query.limit || 5;
      const skipValue = (+req.query.skip - 1) * itemsPerPage;
      const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

      const posts = await db.collection('diretorias').find()
        .limit(itemsPerPage)
        .skip(skipValue)
        .toArray();
      res.status(200).json({
        data: posts,
        pagination: {
          totalItems, totalPages, currentPage, itemsPerPage,
        },
      });
    }
  } catch (e) {
    res.status(500).json({ message: 'Erro ao carregar diretorias.' });
  }
};

export {
  novaDiretoria, paginatedDiretorias, deleta, atualiza, diretoriaExists, getDiretoriaById,
};
