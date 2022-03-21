const supertest = require('supertest');
const mongoose = require('mongoose');
const app = require('../app');

describe('Accounts', () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/test-database-01');
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    describe('GET /accounts', () => {
        it('should return 401 status code if user is not authorized', async () => {
            const res = await supertest(app).get('/accounts');
            
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Unauthorized, no token');
        });
    });

    describe('POST /accounts', () => {
        it('should return 401 status code if user is not authorized', async () => {
            const res = await supertest(app).post('/accounts');
            
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Unauthorized, no token');
        });
    });

    describe('GET /accounts/:id', () => {
        it('should return status 404 if account does not exists', async () => {
            const res = await supertest(app).get('/account/randomid432432');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.body).toBe('Route does not exists');
        });
    });

    describe('PUT /accounts/:id', () => {
        it('should return status 404 if account does not exists', async () => {
            const res = await supertest(app).put('/account/randomid432432');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.body).toBe('Route does not exists');
        });
    });

    describe('DELETE /accounts/:id', () => {
        it('should return status 404 if account does not exists', async () => {
            const res = await supertest(app).delete('/account/randomid432432');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.body).toBe('Route does not exists');
        });
    });
});
