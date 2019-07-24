const xss = require('xss');

const FavoritesService = {
  getById(db, id) {
    return db
      .from('capstone_things AS fav')
      .select(
        'fav.id',
        'fav.title',
        'fav.content',
        'fav.date_created',
        db.raw(
          `row_to_json(
          (SELECT tmp FROM (
            SELECT
              usr.id,
              usr.user_name,
              usr.full_name,
              usr.nickname,
              usr.date_created,
              usr.date_modified
          ) tmp)
        ) AS "user"`
        )
      )
      .leftJoin(
        'capstone_users AS usr',
        'fav.user_id',
        'usr.id',
      )
      .where('fav.id', id)
      .first();
  },

  getUserFavorites(db, user_id) {
    return db
      .from('capstone_things AS userFav')
      .select('*',)
      .where(
        'user_id', user_id
      );
  },

  insertFavorite(db, newFavorite) {
    return db
      .insert(newFavorite)
      .into('capstone_things')
      .returning('*')
      //.then(([favorite]) => favorite)
      // .then(favorite =>
      //   FavoritesService.getById(db, favorite.id)
      // );
  },

  editFavorite(db, favorite) {
    return db
      .where({id:favorite.id})
      .update(favorite);
  },

  serializeFavorite(favorite) {
    const { user } = favorite;
    return {
      id: favorite.id,
      title: xss(favorite.title),
      date_created: new Date(favorite.date_created),
      user: {
        id: user.id,
        user_name: user.user_name,
        full_name: user.full_name,
        nickname: user.nickname,
        date_created: new Date(user.date_created),
        date_modified: new Date(user.date_modified) || null
      },
    };
  }
};

module.exports = FavoritesService;