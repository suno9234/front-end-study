module.exports = (sequelize, DataTypes) => {
  const Post = sequelize.define('Post', { // MySQL에는 users로 자동 저장 (소문자 + 복수)
    //id는 기본적으로 들어있다
    content: {
      type: DataTypes.STRING(140),
      allowNull: false,
    },
  }, {
    charset: 'utf8mb4', // 이모티콘까지
    collate: 'utf8mb4_general_ci', //한글 저장
  });
  Post.associate = (db) => {
    db.Post.belongsTo(db.User);
    db.Post.hasMany(db.Comment);
    db.Post.hasMany(db.Image);
    db.Post.belongsToMany(db.Hashtag , {through : 'PostHashtag'});
    db.Post.belongsTo(db.Post, { as: 'Retweet' });
    db.Post.belongsToMany(db.User, { through: 'Like', as: 'Likers' });
  };
  return Post;
}