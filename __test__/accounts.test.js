const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');

const userId = mongoose.Types.ObjectId().toString();
const accountId = mongoose.Types.ObjectId().toString();
const accountId2 = mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: 'john@gmail.com',
    password: 'john'
};

const accountPayload = [
    {
        isDefault: true,
        accountId,
        user: userId,
        title: 'Credit Card',
        description: 'Lorem ipsum 1',
        currency: mongoose.Types.ObjectId.toString()
    },
    {
        isDefault: false,
        accountId: accountId2,
        user: userId,
        title: 'Credit Card',
        description: 'Lorem ipsum 1',
        currency: mongoose.Types.ObjectId.toString()
    }
];

describe('Accounts', () => {
    beforeAll(async () => {
        await mongoose.disconnect();
        await mongoose.connect('mongodb://localhost:27017/test-database-01');
    });
    
    afterAll(async () => {
        await mongoose.disconnect();
        await mongoose.connection.close();
    });

    // for testing getting accounts functionality
    describe('GET /accounts', () => {
        it('should return 401 status code if user is not authorized', async () => {
            const res = await supertest(app).get('/accounts');
            
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Unauthorized, no token');
        });
    });

    // for testing adding account functionallity
    describe('POST /accounts', () => {
        it('should return 401 status code if user is not authorized', async () => {
            const res = await supertest(app).post('/accounts');
            
            expect(res.status).toBe(401);
            expect(res.body.message).toBe('Unauthorized, no token');
        });

        it('should return 200 message and accounts of array if user is authorized', async () => {
            const token = jwt.sign(userPayload, process.env.JWT_SECRET, { expiresIn: '1h' });
            const res = await supertest(app).get('/accounts').set('Authorization', `Bearer ${token}`);

            expect(res.status).toBe(200);
        });
    });

    // for testing getting single account functionallity
    describe('GET /accounts/:id', () => {
        it('should return status 404 if account does not exists', async () => {
            const res = await supertest(app).get('/account/randomid432432');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.body).toBe('Route does not exists');
        });
    });

    // for testing updating single account functionallity
    describe('PUT /accounts/:id', () => {
        it('should return status 404 if account does not exists', async () => {
            const res = await supertest(app).put('/account/randomid432432');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.body).toBe('Route does not exists');
        });
    });

    // for testing deleting an account functionallity
    describe('DELETE /accounts/:id', () => {
        it('should return status 404 if account does not exists', async () => {
            const res = await supertest(app).delete('/account/randomid432432');

            expect(res.status).toBe(404);
            expect(res.header['content-type']).toBe('application/json; charset=utf-8');
            expect(res.body).toBe('Route does not exists');
        });
    });
});
