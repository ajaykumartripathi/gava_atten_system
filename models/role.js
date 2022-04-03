module.exports = (sequelize, Sequelize) => {
    const role = sequelize.define("role", {
      name: {
        type: Sequelize.STRING
      }
    },{
        paranoid:true
    });
    return role;
  };