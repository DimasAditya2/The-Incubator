'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Startup extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Startup.belongsTo(models.Incubator, {foreignKey: 'IncubatorId'})
    }

    getAge() {
      let dateNow = new Date().getFullYear();
      let existingDate = new Date(this.dateFound).getFullYear();
    
      return dateNow - existingDate;
    } 


    static async getStartUpByRoleOfFounder(filter) {
      try {
        let data;
        if(!filter){
          data = await Startup.findAll({
            order: [['valuation', 'DESC']],
            include: { model: sequelize.models.Incubator }
          });
        }else{
        data = await Startup.findAll({
          order: [['roleOfFounder', 'DESC']],
          include: { model: sequelize.models.Incubator },
          where: {
            roleOfFounder: `${filter}`
          }
        });
        }
        return data;
      } catch (error) {
        throw error;
      }
    }

  }
  Startup.init({
    startUpName: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Start-up name Required"
        },
        notEmpty: {
          msg: "Start-up name Required"
        }
      }
    },
    founderName: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Founder Name required"
        },
        notEmpty: {
          msg: "Founder Name required"
        }
      }
    },
    dateFound: {type: DataTypes.DATE,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Date required"
        },
        notEmpty: {
          msg: "Date Required"
        }
      }
    },
    educationOfFounder: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Education Required"
        },
        notEmpty: {
          msg: "Education Required"
        }
      }
    },
    roleOfFounder: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Role Required"
        },
        notEmpty: {
          msg: "Role Required"
        }
      }
    }
  }, {
    sequelize,
    modelName: 'Startup',
  });
  return Startup;
};