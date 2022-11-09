import connection from './mongoConnection';

const eventosHome = async () => {
  const db = await connection();
  return db.collection('eventos').find().toArray();
};

const diretoriasHome = async () => {
  const db = await connection();
  return db.collection('diretorias').find().toArray();
};

const filiadosHome = async () => {
  const db = await connection();
  return db.collection('filiados').find().toArray();
};

export { eventosHome, diretoriasHome, filiadosHome };
