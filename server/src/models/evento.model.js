import { ObjectId } from 'mongodb';
import connection from './mongoConnection';

const novoEvento = async ({
  titulo,
  local,
  dataEvento,
  imagemUrl,
  telefone,
  email,
  userId,
  descricao,
}) => {
  const db = await connection();
  const evento = await db.collection('eventos').insertOne({
    titulo,
    local,
    dataEvento,
    imagemUrl,
    telefone,
    email,
    userId,
    descricao,
  });
  const { insertedId: _id } = evento;
  return {
    titulo,
    local,
    dataEvento,
    imagemUrl,
    telefone,
    email,
    userId,
    descricao,
    _id,
  };
};

const eventExists = async ({ titulo, id }) => {
  const db = await connection();
  let event = null;
  if (id) {
    event = await db.collection('eventos').findOne({ _id: ObjectId(id) });
  } else {
    event = await db.collection('eventos').findOne({ titulo });
  }
  return event;
};

const deleta = async ({ id }) => {
  const db = await connection();
  await db.collection('eventos').deleteOne({ _id: ObjectId(id) });
  return { id };
};

const getEventoById = async ({ id }) => {
  const db = await connection();
  const evento = await db.collection('eventos').findOne({ _id: ObjectId(id) });
  return { evento };
};

const atualiza = async ({
  id,
  titulo,
  local,
  dataEvento,
  imagemUrl,
  telefone,
  email,
  userId,
  descricao,
}) => {
  const db = await connection();
  await db.collection('eventos').updateOne({ _id: ObjectId(id) }, {
    $set:
    {
      titulo,
      local,
      dataEvento,
      imagemUrl,
      telefone,
      email,
      userId,
      descricao,
    },
  });
  return {
    titulo,
    local,
    dataEvento,
    imagemUrl,
    telefone,
    email,
    userId,
    descricao,
  };
};

const paginatedEvent = async (req, res) => {
  try {
    const { term } = req.query;
    const db = await connection();
    const currentPage = +req.query.skip;
    let itemsPerPage = +req.query.limit;
    if (term != null && term !== '') {
      const teste = await db.collection('eventos').find({ titulo: term }).toArray();
      const totalItems = teste.length;
      itemsPerPage = totalItems;
      const skipValue = (+req.query.skip - 1) * itemsPerPage;
      const totalPages = Number(Math.ceil(totalItems / itemsPerPage));

      const posts = await db.collection('eventos').find({ titulo: term })
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
      const totalItems = await db.collection('eventos').countDocuments();
      itemsPerPage = Number(req.query.limit) || 5;
      const skipValue = (+req.query.skip - 1) * itemsPerPage;
      const totalPages = Number(Math.ceil(totalItems / itemsPerPage));
      const posts = await db.collection('eventos').find()
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
    res.status(500).json({ message: 'Erro ao carregar eventos.' });
  }
};

export {
  novoEvento, paginatedEvent, deleta, atualiza, eventExists, getEventoById,
};
