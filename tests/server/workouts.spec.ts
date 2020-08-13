import request from 'supertest';
import app from '../../src/server/bootstrap/server';
import dotenv from 'dotenv';
import assert from 'assert';

dotenv.config();
describe('API tests', function () {
  it('should respond to whoami', async function (done) {
    const response = await request(app).get('/').expect(200);

    assert(response.body.message.appName, process.env.APP_NAME);
    assert(response.body.message.version, process.env.APP_VER);

    done();
  });

  it('should get list of workouts', async function (done) {
    const response = await request(app).get('/api/workout').expect(200);

    expect(response.body.message.docs.length).toBeGreaterThanOrEqual(1);
    expect(response.body.message.totalDocs).toBeGreaterThanOrEqual(1);
    done();
  });

  it('should not get workout without valid ID', async function (done) {
    await request(app).get('/api/workout/1').expect(404);
    done();
  });
});
