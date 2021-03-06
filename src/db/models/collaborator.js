'use strict';
module.exports = (sequelize, DataTypes) => {
  var Collaborator = sequelize.define('Collaborator', {
    wikiId: {
      type: DataTypes.INTEGER,
      allowNull: false
    },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
    }
  }, {});
  Collaborator.associate = function(models) {
    // associations can be defined here
    Collaborator.belongsTo(models.Wiki, {
      foreignKey: "wikiId",
      onDelete: "CASCADE"
    });

    Collaborator.belongsTo(models.User, {
      foreignKey: "userId",
      onDelete: "CASCADE"
    });

    Collaborator.addScope('isCollaboratorFor', (userId) => {
      return {
        where: {userId: userId},
        order: [["createdAt", "DESC"]]
      }
    });
    Collaborator.addScope('collabForWiki', (wikiId) => {
      return {
        include: [{
          model: models.Wiki
        }],
        where: { wikiId: wikiId},
        order: [['createdAt', 'ASC']]
      }
    });

  };
  return Collaborator;
};