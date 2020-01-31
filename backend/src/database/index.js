import Sequelize from 'sequelize';
import mongoose from 'mongoose';

import databaseConfig from '../config/database';

import User from '../app/models/User';
import File from '../app/models/File';
import Appointment from '../app/models/Appointment';

const models = [User, File, Appointment];

class Database {
  constructor() {
    this.init();
    this.mongo();
  }

  init() {
    this.connection = new Sequelize(databaseConfig);

    models
      .map(model => model.init(this.connection))
      .map(model => model.associate && model.associate(this.connection.models));
  }

  mongo() {
    const {
      MONGO_INITDB_ROOT_USERNAME,
      MONGO_INITDB_ROOT_PASSWORD,
      MONGO_INITDB_DATABASE,
    } = process.env;
    this.mongoConnection = mongoose.connect(
      `mongodb://${MONGO_INITDB_ROOT_USERNAME}:${MONGO_INITDB_ROOT_PASSWORD}@localhost:27017/${MONGO_INITDB_DATABASE}?authSource=admin`,
      {
        useCreateIndex: true,
        useFindAndModify: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
}

export default new Database();
