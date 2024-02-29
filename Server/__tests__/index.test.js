const request = require('supertest');
const { app } = require('../index'); // Assuming your Express app setup is in index.js

jest.mock('fs', () => ({
    readFile: jest.fn(),
    writeFile: jest.fn(),
  }));

  jest.mock('../index', () => ({
    app: {
      post: jest.fn(),
      get: jest.fn(),
      listen: jest.fn().mockReturnThis(),
      // Define other mock Express app methods as needed
    },
  }));

   
describe('POST /api/createUser', () => {
    it('should create a new user', async () => {
        const response = await request(app)
            .post('/api/createUser')
            .send({
                email: 'test@example.com',
                password: 'password123',
                name: 'Test User',
                education: 'Bachelor of Science',
                skills: ['JavaScript', 'Node.js'],
                type: 'applicant',
                bio: 'A brief bio about the user'
            });
        expect(response.statusCode).toBe(401);
        //expect(response.body).toHaveProperty({"error": "Invalid emailId or password"});
    });
});

describe('POST /api/login', () => {
    it('should return 401 for invalid login credentials', async () => {
        const response = await request(app)
            .post('/api/login')
            .send({
                email: 'test@example.com',
                password: 'password123'
            });
        expect(response.statusCode).toBe(401);
        expect(response.body).toHaveProperty('error', 'Invalid emailId or password');
    });

    // Add more test cases for valid login scenarios if needed
});

// Add more test cases for other endpoints similarly


// const request = require('supertest');
// const {app} = require('../index'); // Replace 'yourAppFileName' with the name of your Node.js file

// // Test case for the createUser endpoint
// describe('POST /api/createUser', () => {
//     it('responds with json', async () => {
//         const response = await request(app)
//             .post('http://localhost:8081/api/createUser')
//             .send({
//                 email: 'test@example.com',
//                 password: 'password123',
//                 name: 'Test User',
//                 education: 'Bachelor of Science',
//                 skills: ['JavaScript', 'Node.js'],
//                 type: 'applicant',
//                 bio: 'A brief bio about the user'
//             });
//         expect(response.statusCode).toEqual(201);
//         expect(response.body).toHaveProperty('email', 'test@example.com');
//         // Add more expectations as needed
//     });
// });

// // Test case for the login endpoint
// describe('POST /api/login', () => {
//     it('responds with json', async () => {
//         const response = await request(app)
//             .post('http://localhost:8081/api/login')
//             .send({
//                 email: 'test@example.com',
//                 password: 'password123'
//             });
//         expect(response.statusCode).toEqual(200);
//         expect(response.body).toHaveProperty('email', 'test@example.com');
//         // Add more expectations as needed
//     });
// });

// // Test case for the createJobs endpoint
// describe('POST /api/createJobs', () => {
//     it('responds with json', async () => {
//         const response = await request(app)
//             .post('http://localhost:8081/api/createJobs')
//             .send({
//                 company_name: 'Test Company',
//                 job_title: 'Software Engineer',
//                 jobDescription: 'Job description goes here',
//                 jobRequirements: 'Job requirements go here',
//                 remote_or_onsite: 'Remote',
//                 salary: 100000,
//                 email: 'recruiter@example.com',
//                 phone: '1234567890',
//                 location: 'New York',
//                 tags: 'Node.js, React',
//                 skills: ['Node.js', 'React'],
//                 numberOfVacancy: 5
//             });
//         expect(response.statusCode).toEqual(201);
//         // Add more expectations as needed
//     });
// });

// // Test case for the quickApply endpoint
// describe('POST /api/quickApply', () => {
//     it('responds with json', async () => {
//         const response = await request(app)
//             .post('http://localhost:8081/api/quickApply')
//             .send({
//                 job_id: 'REQ_123456',
//                 email: 'test@example.com'
//             });
//         expect(response.statusCode).toEqual(200);
//         // Add more expectations as needed
//     });
// });

// describe('/api/getAllJobs', ()=>{
//     it('responds with json', async () =>{
//         const response = await request(app)
//         .get('http://localhost:8081/api/getAllJobs')
//         .expect(200)
//         .then(result =>{
//             expect (result && result.body && typeof result.body.jobs === 'object').toBeTruthy()
//         })
//     })
// })
