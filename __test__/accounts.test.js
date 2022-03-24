const supertest = require('supertest');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const app = require('../app');
const Account = require('../models/Account');

const userId = mongoose.Types.ObjectId().toString();
const accountId = mongoose.Types.ObjectId().toString();
const currencyId = mongoose.Types.ObjectId().toString();

const userPayload = {
    _id: userId,
    email: 'john@gmail.com',
    password: 'john'
};

const token = jwt.sign(userPayload, process.env.JWT_SECRET);

const account1 = {
    isDefault: true,
    accountId,
    user: userId,
    title: 'Credit Card',
    description: 'Lorem ipsum 1',
    currency: currencyId
};

// testing accounts route
describe('ACCOUNTS', () => {
    beforeAll(() => {
        mongoose.disconnect();
        mongoose.connect('mongodb://localhost:27017/testing-db');
    });

    afterAll(() => {
        mongoose.disconnect();
    });

    // test for /accounts endpoint
    describe('/accounts', () => {
        // test cases for GET /accounts
        describe('GET getting all accounts', () => {
            it('should return 401 if user is not authorized', async () => {
                const res = await supertest(app).get('/accounts');

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Unauthorized, no token');
            });

            it('should return status 200 if user is authorized', async () => {
                const res = await supertest(app).get('/accounts').set('Authorization', `Bearer ${token}`);

                expect(res.status).toBe(200);
            });
        });

        // test cases for POST /accounts
        describe('POST creating an account', () => {
            it('should return status 401 if user is not authorized', async () => {
                await Account.create(account1);

                const res = await supertest(app).post('/accounts');

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Unauthorized, no token');
            });

            it('should return status 201 if user is created successfully', async () => {
                const res = await supertest(app).post('/accounts').set('Authorization', `Bearer ${token}`);

                Account.create(account1);

                expect(res.status).toBe(200);
            });
        });
    });

    // test for /account/:id endpoint
    describe('/account/:id', () => {
        describe('GET getting single account', () => {
            it('should set the status to 200 if user is authorized', async () => {
                const account = await Account.create(account1);
            
                const res = await supertest(app).get(`/accounts/${account.id}`).set(
                    'Authorization',
                    `Bearer ${token}`
                );

                expect(res.status).toBe(200);
            });

            it('should set the status to 401 if user is not authorized', async () => {
                const account = await Account.create(account1);
            
                const res = await supertest(app).get(`/accounts/${account.id}`);

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Unauthorized, no token');
            });
        });

        describe('PUT updating single account', () => {
            it('should set the status to 200 if user is authorized', async () => {
                const account = await Account.create(account1);
            
                const res = await supertest(app).put(`/accounts/${account.id}`).set(
                    'Authorization',
                    `Bearer ${token}`
                );

                expect(res.status).toBe(200);
            });

            it('should set the status to 401 if user is not authorized', async () => {
                const account = await Account.create(account1);
            
                const res = await supertest(app).put(`/accounts/${account.id}`);

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Unauthorized, no token');
            });
        });

        describe('DELETE a single account', () => {
            it('should set the status to 200 if user is authorized', async () => {
                const account = await Account.create(account1);
            
                const res = await supertest(app).delete(`/accounts/${account.id}`).set(
                    'Authorization',
                    `Bearer ${token}`
                );

                expect(res.status).toBe(200);
            });

            it('should set the status to 401 if user is not authorized', async () => {
                const account = await Account.create(account1);
            
                const res = await supertest(app).delete(`/accounts/${account.id}`);

                expect(res.status).toBe(401);
                expect(res.body.message).toBe('Unauthorized, no token');
            });
        });
    });
});
