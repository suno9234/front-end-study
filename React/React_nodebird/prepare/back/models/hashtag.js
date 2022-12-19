module.exports = (sequelize, DataTypes) => {
  const Hashtag = sequelize.define('Hashtag', { // MySQL에는 users로 자동 저장 (소문자 + 복수)
    //id는 기본적으로 들어있다
    name:{
      type:DataTypes.STRING(20),
      allowNull : false,
    },
  }, {
    charset: 'utf8mb4', // 이모티콘까지
    collate: 'utf8mb4_general_ci', //한글 저장
  });
  Hashtag.associate = (db) => {
    db.Hashtag.belongsToMany(db.Post , {through : 'PostHashtag'});
  };
  return Hashtag;
}