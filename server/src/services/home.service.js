import { eventosHome, diretoriasHome, filiadosHome } from '../models/home.model';

const getEventos = async () => {
  const eventos = await eventosHome();
  return eventos;
};

const getDiretorias = async () => {
  const diretorias = await diretoriasHome();
  return diretorias;
};

const getFiliados = async () => {
  const filiados = await filiadosHome();
  return filiados;
};

export { getEventos, getDiretorias, getFiliados };
