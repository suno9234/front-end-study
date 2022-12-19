module.exports = (sequelize, DataTypes) => {
  const Image= sequelize.define('Image', { // MySQL에는 users로 자동 저장 (소문자 + 복수)
    //id는 기본적으로 들어있다
    src:{
      type:DataTypes.STRING(200),
      allowNull : false,
    },
  }, {
    charset: 'utf8', // 이모티콘까지
    collate: 'utf8_general_ci', //한글 저장
  });
  Image.associate = (db) => {
    db.Image.belongsTo(db.Post);
  };
  return Image;
}