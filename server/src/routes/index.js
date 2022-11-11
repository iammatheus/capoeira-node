import { Router } from 'express';
// usuários
import VerifyToken from '../middleware/usuarios.middleware';
import { requestLogin } from '../models/usuario.model';
import {
  getAll, createUser, deleteUser, updateUser, getUserById,
} from '../controllers/usuario.controller';

// paginação - model
import { paginatedEvent } from '../models/evento.model';
import { paginatedDiretorias } from '../models/diretoria.model';
import { paginatedFiliados } from '../models/filiado.model';

// eventos
import {
  postEvento, deletarEvento, atualizarEvento, getEventoById,
} from '../controllers/evento.controller';

// diretorias
import {
  postDiretoria, deletarDiretoria, atualizarDiretoria, getDiretoriaById,
} from '../controllers/diretoria.controller';

// filiados
import {
  postFiliado, deletarFiliado, atualizarFiliado, getFiliadoById,
} from '../controllers/filiado.controller';

// home
import { getAllEventosHome, getAllDiretoriasHome, getAllFiliadosHome } from '../controllers/home.controller';

const routes = new Router();

routes.get('/', (req, res) => {
  res.status(200).json({ ok: 'connected' });
});

// home
routes.get('/home/eventos', getAllEventosHome);
routes.get('/home/diretorias', getAllDiretoriasHome);
routes.get('/home/filiados', getAllFiliadosHome);

// usuários
routes.post('/login', requestLogin);
routes.get('/usuarios', VerifyToken, getAll);
routes.get('/usuarios/:id', VerifyToken, getUserById);
routes.post('/usuarios', VerifyToken, createUser);
routes.delete('/usuarios/:id', VerifyToken, deleteUser);
routes.put('/usuarios/update/:id', VerifyToken, updateUser);

// eventos
routes.get('/eventos', VerifyToken, paginatedEvent);
routes.post('/eventos', VerifyToken, postEvento);
routes.put('/eventos/:id', VerifyToken, atualizarEvento);
routes.delete('/eventos/:id', VerifyToken, deletarEvento);
routes.get('/eventos/:id', VerifyToken, getEventoById);

// diretorias
routes.get('/diretorias', VerifyToken, paginatedDiretorias);
routes.post('/diretorias', VerifyToken, postDiretoria);
routes.put('/diretorias/:id', VerifyToken, atualizarDiretoria);
routes.delete('/diretorias/:id', VerifyToken, deletarDiretoria);
routes.get('/diretorias/:id', VerifyToken, getDiretoriaById);

// filiados
routes.get('/filiados', VerifyToken, paginatedFiliados);
routes.post('/filiados', VerifyToken, postFiliado);
routes.put('/filiados/:id', VerifyToken, atualizarFiliado);
routes.delete('/filiados/:id', VerifyToken, deletarFiliado);
routes.get('/filiados/:id', VerifyToken, getFiliadoById);

export default routes;

// { cadastro de evento:
//   "titulo": "Testando mais um cadastro",
//   "local": "Aqui na minha casa",
//   "dataEvento": "04/11/2022",
//   "imagemUrl": "qualquerporra.png",
//   "telefone": "21999999999",
//   "email": "meusaco.com",
//   "userId": "numsei",
//   "descricao": "arrombado é quem leu"
// }
