const knex = require('knex');
const app = require('../src/app');
const helpers = require('./test-helpers');
const config = require('../src/config');

describe('Protected Endpoints', function() {
  let db;

  const { testUsers, testThings } = helpers.makeThingsFixtures();

  before('make knex instance', () => {
    db = knex({
      client: 'pg',
      connection: process.env.TEST_DB_URL
    });
    app.set('db', db);
  });

  after('disconnect from db', () => db.destroy());

  before('cleanup', () => helpers.cleanTables(db));

  afterEach('cleanup', () => helpers.cleanTables(db));

  beforeEach('insert things', () =>
    helpers.seedThingsTables(db, testUsers, testThings)
  );

  const protectedEndpoints = [
    {
      name: 'GET /api/things/:things_id',
      path: '/api/things/1'
    },
    {
      name: 'POST /api/auth/refresh',
      path: '/api/auth/refresh',
      method: supertest(app).post,
    },
  ];

  protectedEndpoints.forEach(endpoint => {
    describe(endpoint.name, () => {
      it('responds with 401 missing token when no bearer token provided', () => {
        return supertest(app)
          .get(endpoint.path)
          .expect(401, { error: 'Missing bearer token' });
      });

      it('responds with 401 "Unauthorized request" when JWT secret is invalid', () => {
        const testUser = testUsers[0];

        return supertest(app)
          .get(endpoint.path)
          .set('Authorization', helpers.makeAuthHeader(testUser, 'fakesecret'))
          .expect(401, { error: 'Unauthorized request' });
      });

      it("responds 401 if subject isn't valid", () => {
        const invalidUser = { user_name: 'NotAReal', id: 1 };

        return supertest(app)
          .get(endpoint.path)
          .set(
            'Authorization',
            helpers.makeAuthHeader(invalidUser, config.JWT_SECRET)
          )
          .expect(401, { error: 'Unauthorized request' });
      });
    });
  });
});