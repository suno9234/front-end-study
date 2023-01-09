module.exports = (sequelize, DataTypes) => {
  const Comment = sequelize.define('Comment', { // MySQL에는 users로 자동 저장 (소문자 + 복수)
    //id는 기본적으로 들어있다
    content:{
      type:DataTypes.STRING(140),
      allowNull : false,
    },
  }, {
    charset: 'utf8mb4',
    collate: 'utf8mb4_general_ci', //한글 저장
  });
  Comment.associate = (db) => {
    db.Comment.belongsTo(db.User);
    db.Comment.belongsTo(db.Post);
  };
  return Comment;
}