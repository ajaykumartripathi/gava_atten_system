const dbConfig = require('../config/config.db');
const Sequelize = require('sequelize');
const bcrypt = require('bcrypt');

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.Host,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})

async function checkConnection(){
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
      } catch (error) {
        console.error('Unable to connect to the database:', error);
      }
}

checkConnection();

const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;

// table create
db.user= require('../models/user')(sequelize, Sequelize);
db.role= require('../models/role')(sequelize, Sequelize);

// Assciation

// db.sequelize.sync();


db.sequelize.sync({ force: false}).then(async() => {
    // console.log("Drop and re-sync db.");
    // inserting Default Users
    const getUser = await db.user.findOne(
      {
          where:{
              email:'dev@yopmail.com'
          }
  });

  if(!getUser)
  {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync('Dev@1234', salt);
    const userdata = {
      firstName: "dev",
      lastName: "user",
      email: "dev@yopmail.com",
      mobile_no: "9845766755",
      password: hash
    }
    
    db.user.create(userdata);
  }
  });

// default insert userData




module.exports = db;