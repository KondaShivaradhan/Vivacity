import request from 'supertest';
import app from '../app';
describe('Server Status',()=>{
    it('should respond with "Im alive"', async () => {
        const response = await request(app).get('/');
        expect(response.text).toBe("Im alive");
    });
    it('should respond with a 200 status code', async () => {
        const response = await request(app).get('/');
        expect(response.statusCode).toBe(200);
    });
    it('what if invalid URL should respond with Wrong URL', async () => {
        const response = await request(app).get('/sdfs');
        expect(response.statusCode).toBe(404);
        expect(response.text).toStrictEqual('Wrong URL');
    });
})
describe('CRUD Operations Test',()=>{
        it('should respond with My details', async () => {
            const response = await request(app).get('/awesome/applicant');
            expect(response.body).toStrictEqual([
                {
                  name: 'Shivaradhan Konda',
                  age: 25,
                  id: 12,
                  date: '1998-05-18T04:00:00.000Z'
                }
              ]);
        });
        it('should respond with Data inserted successfully', async () => {
            const response = await request(app).post('/awesome/applicant').send({ name: 'SomeoneFromTest', age: 34, date: '1988-08-27' });
            expect(response.text).toBe('Data inserted successfully');
        });
        it('should Update and respond with Data deleted successfully', async () => {
            const response = await request(app).delete('/awesome/applicant').send({ id:13,name: '', age: 75, date: '1988-08-27' });
            expect(response.text).toBe('Data deleted successfully');
        });
        it('should respond with Data deleted successfully', async () => {
            const response = await request(app).delete('/awesome/applicant').send({ name:'SomeoneFromTest'});
            expect(response.text).toBe('Data deleted successfully');
        });
})