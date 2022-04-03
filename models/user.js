module.exports = (sequelize, Sequelize) => {
    const user = sequelize.define("user", {
      firstName: {
        type: Sequelize.STRING
      },
      lastName: {
        type: Sequelize.STRING
      },
      email: {
        type: Sequelize.STRING
      },
      mobile_no:{
         type: Sequelize.STRING(15)
      },
      password:{
          type: Sequelize.STRING
      },
      roleId:{
          type: Sequelize.INTEGER,
          defaultValue: 2,
          comment:'1. For Admin, 2. For User'
      },
      isActive:{
          type: Sequelize.BOOLEAN,
          defaultValue: true,
          comment: '1. for active, 0. for inactive'
      }
    },{
        paranoid:true
    });
    return user;
  };