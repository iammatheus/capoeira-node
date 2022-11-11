import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import path from 'path';
import routes from './routes';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.mongoDb();
  }

  middlewares() {
    this.server.use(express.json());
    this.server.use(cors());
  }

  // Mongoose
  mongoDb() {
    try {
      mongoose.Promise = global.Promise;
      mongoose.connect('mongodb://127.0.0.1:27017').then(() => {
        console.log('Conectado ao banco');
      }).catch((err) => {
        console.error(`Erro conexão banco: ${err}`);
      });
    } catch (err) {
      console.error(`Houve um erro ao conectar-se ao banco ${err}`);
    }
  }

  routes() {
    this.server.use(routes);
    this.server.use(express.static(path.join(__dirname, 'public')));
  }
}

export default new App().server;
