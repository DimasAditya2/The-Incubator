'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Incubator extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  Incubator.init({
    name: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Name Required"
        },
        notEmpty: {
          msg: "Name Required"
        }
      }
    },
    code: DataTypes.STRING,
    location: {type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notNull: {
          msg: "Location Required"
        },
        notEmpty: {
          msg: "Location Required"
        }
      }
    },
    level: {type: DataTypes.STRING, 
      allowNull: false, 
        validate: {
          notNull: {
            msg: "Level Required"
          },
          notEmpty: {
            msg: "Level Required"
          }
        }
    }
  }, {
    hooks: {
      beforeCreate(instance) {
        let result = ''
        if(instance.level === 'International') {
          result = '1992-A'
        } else if (instance.level === 'National') {
          result = '1994-B'
        } else if (instance.level === 'Province') {
          result = '1996-C'
        }
        instance.code = `${result}-${new Date().getTime()}`
      }
    },
    sequelize,
    modelName: 'Incubator',
  });
  return Incubator;
};