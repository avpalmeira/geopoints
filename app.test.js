const app = require('./app');
const supertest = require('supertest');
const request = supertest(app);

describe('Sample Test', () => {
	it('get the test endpoint', async (done) => {
    const res = await request.get('/');

    done();
	})
})
