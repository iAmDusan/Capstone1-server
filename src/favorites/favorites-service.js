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

  insertFavorite(db, newFavorite, user_id) {
    newFavorite.user_id = user_id;
    return db
      .insert(newFavorite)
      .into('capstone_things')
      .returning('*');

  },

  editFavorite(db, favorite, id, user_id) {
    return db
      .from('capstone_things AS userFav')
      .where(
        'id', id
      )
      .where(
        'user_id', user_id
      )
      .update(favorite);
  },

  removeFavorite(db, favorite, id, user_id) {
    return db
      .from('capstone_things AS userFav')
      .where(
        'id', id
      )
      .where(
        'user_id', user_id
      )
      .del();
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