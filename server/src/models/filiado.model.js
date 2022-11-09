import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const novoFiliado = async ({
  nome,
  imagemUrl,
  userId,
}) => {
  const db = await connection();
  const filiado = await db.collection('filiados').insertOne({
    nome,
    imagemUrl,
    userId,
  });
  const { insertedId: _id } = filiado;
  return {
    nome,
    imagemUrl,
    userId,
    _id,
  };
};

const filiadoExists = async ({ nome, id }) => {
  const db = await connection();
  let filiado = null;
  if (id) {
    filiado = await db.collection('filiados').findOne({ _id: ObjectId(id) });
  } else {
    filiado = await db.collection('filiados').findOne({ nome });
  }
  return filiado;
};

const deleta = async ({ id }) => {
  const db = await connection();
  await db.collection('filiados').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const getFiliadoById = async ({ id }) => {
  const db = await connection();
  const filiado = await db.collection('filiados').findOne({ _id: ObjectId(id) });
  return { filiado };
};

const atualiza = async ({
  id,
  nome,
  imagemUrl,
  userId,
}) => {
  const db = await connection();
  await db.collection('filiados').updateOne({ _id: ObjectId(id) }, {
    $set:
    {
      nome,
      imagemUrl,
      userId,
    },
  });
  return {
    nome,
    imagemUrl,
    userId,
  };
};

const paginatedFiliados = async (req, res) => {
  try {
    const { term } = req.query;
    const db = await connection();
    const currentPage = +req.query.skip;
    let itemsPerPage = +req.query.limit;

    if (term != null && term !== '') {
      const teste = await db.collection('filiados').find({ nome: term }).toArray();
      const totalItems = teste.length;
      itemsPerPage = totalItems;
      const skipValue = (+req.query.skip - 1) * itemsPerPage;
      const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

      const posts = await db.collection('filiados').find({ nome: term })
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
      const totalItems = await db.collection('filiados').countDocuments();
      itemsPerPage = +req.query.limit || 5;
      const skipValue = (+req.query.skip - 1) * itemsPerPage;
      const totalPages = Number(Math.ceil(totalItems / itemsPerPage));
      const posts = await db.collection('filiados').find()
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
    res.status(500).json({ message: 'Erro ao carregar filiados.' });
  }
};

export {
  novoFiliado, paginatedFiliados, deleta, atualiza, filiadoExists, getFiliadoById,
};
