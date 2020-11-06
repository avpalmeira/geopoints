const app = require('./app');
const supertest = require('supertest');
const request = supertest(app);

describe('Endpoint Tests', () => {
	it('imports data from a csv file in a remote server', async (done) => {
    const res = await request
      .post('/importdata')
      .send({
          "name": "sp locations",
          "filePath": "https://shop-manager.s3-us-west-2.amazonaws.com/Sp_Locations.csv"
      });

    expect(res.statusCode).toEqual(200);
    expect(res.body).toHaveProperty('filePath');

    done();
	});

  it('gets a list of batches of geo locations', async (done) => {
    const res = await request.get('/geobatches');

    expect(res.statusCode).toEqual(200);
    expect(res.body.length).toBeGreaterThan(0);

    done();
  });
});
