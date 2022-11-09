import { getEventos, getDiretorias, getFiliados } from '../services/home.service';

const getAllEventosHome = async (req, res) => {
  const eventos = await getEventos();

  const id = '_id';

  const newList = eventos.map((evento) => ({
    titulo: evento.titulo,
    local: evento.local,
    dataEvento: evento.dataEvento,
    imagemUrl: evento.imagemUrl,
    telefone: evento.telefone,
    email: evento.email,
    userId: evento.userId,
    descricao: evento.descricao,
    _id: evento[`${id}`],
  }));

  return res.status(200).json(newList);
};

const getAllDiretoriasHome = async (req, res) => {
  const diretorias = await getDiretorias();
  const id = '_id';

  const newList = diretorias.map((diretoria) => ({
    nome: diretoria.nome,
    tipo: diretoria.tipo,
    descricao: diretoria.descricao,
    imagemUrl: diretoria.imagemUrl,
    userId: diretoria.userId,
    _id: diretoria[`${id}`],
  }));

  return res.status(200).json(newList);
};

const getAllFiliadosHome = async (req, res) => {
  const filiados = await getFiliados();
  const id = '_id';

  const newList = filiados.map((filiado) => ({
    nome: filiado.nome,
    imagemUrl: filiado.imagemUrl,
    userId: filiado.userId,
    _id: filiado[`${id}`],
  }));

  return res.status(200).json(newList);
};

export { getAllEventosHome, getAllDiretoriasHome, getAllFiliadosHome };
