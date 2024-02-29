const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require("fs");
const cookieParser = require('cookie-parser');
const app = express(); 

app.use(cors());
app.use(cookieParser());
app.use(bodyParser.json());

// initialising directories
  if (!fs.existsSync("./public")) {
    fs.mkdirSync("./public");
  }

  if (!fs.existsSync("./public/userdb.json")) {
    fs.mkdirSync("./public/userdb.json");
  }
  if (!fs.existsSync("./public/jobs.json")) {
    fs.mkdirSync("./public/jobs.json");
  }

  let userDB;

  fs.readFile('./public/userdb.json', 'utf8', (err, data) => {
    if (err) {
      console.error('Error reading users file:', err);
      return;
    }
    // Split the file content by new lines and parse each line as JSON
    userDB = data && JSON.parse(data) || {};
  }); 

//Sign up for applicant and recruiter
app.post('/api/createUser',(req,res) => {
    try{
        const {email, password, name, education,skills, type, bio, gitProfileId=null} = req.body;
        const requestPayload = {
            type : type,
            email : email,
            password : password,
            name : name,
            gitProfileId
        }
        if (type === 'applicant') {
            requestPayload.education = education || [];
        }

        // Conditionally add skills field if the user is an applicant
        if (type === 'applicant') {
            requestPayload.skills = skills || [];
        }

        // Conditionally add bio field if the user is not a applicant
        if (type !== 'applicant') {
            requestPayload.bio = bio || "";
        }
        if (userDB[email]) {
            return res.status(400).json({ error: 'User already exists' });
        }

        userDB[email] = requestPayload;
        
        fs.writeFile('./public/userdb.json', JSON.stringify(userDB), (err) => {
            if (err) {
              console.error('Error writing todo to file:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
          });
      
          res.status(201).json(userDB);

    }catch (err) {
        res.status(400);
    }
 })

//Login of user
app.post('/api/login', (req, res) => {
    const { email, password } = req.body;
    if (!email || typeof email !== 'string' || !email.trim()) {
        return res.status(400).json({ error: 'Invalid email format' });
    }
    if (userDB[email] && userDB[email].password === password) {
        const userCredential = {
            email: email,
            userType: userDB[email].type
        };
        res.cookie('user_sso', userCredential, { domain: 'localhost', path: '/', secure: false });
        return res.status(200).json(userCredential);
    } else {
        // User does not exist or password is incorrect
        return res.status(401).json({ error: 'Invalid EmailId or Password' });
    }
});

let createJobs = [];
fs.readFile('./public/jobs.json', 'utf8', (err, data) => {
    if (err) {
        console.error('Error reading users file:', err);
      return;
    }
    // Split the file content by new lines and parse each line as JSON
    createJobs = data && JSON.parse(data) || [];
  }); 
//Create Jobs
app.post('/api/createJobs',(req,res) => {
    try{
        const {
             company_name,
             job_title, 
             jobDescription, 
             jobRequirements,
             remote_or_onsite, 
             salary,
             email,
             phone,
             location,
             tags,
             skills,
             numberOfVacancy,
             createdBy
            } = req.body;
        const requestPayload = {
             job_id:"REQ_" + Math.random().toString(10).slice(7),
             company_name :company_name,
             job_title : job_title,
             jobDescription :jobDescription, 
             jobRequirements: jobRequirements,
             remote_or_onsite : remote_or_onsite, 
             salary : salary,
             email :email,
             phone : phone,
             location :location,
             tags : tags || "",
             skills : skills || [],
             numberOfVacancy:numberOfVacancy,
             createdBy: createdBy,
             applicants_userIds: []
        }
        createJobs.push(requestPayload);

        fs.writeFile('./public/jobs.json', JSON.stringify(createJobs) , (err) => {
            if (err) {
              console.error('Error writing todo to file:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
          });
          res.status(201).json(createJobs);

    }catch (err) {
        res.status(400);
    }
})

//Get All Jobs of Applicants
app.get('/api/getAllJobs', (req, res) => {
    try {
        // Read the contents of the jobs.json file
        fs.readFile('./public/jobs.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading jobs file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            // Parse the JSON data to get the array of jobs
            const jobs = JSON.parse(data);
            
            // Send the array of jobs as the response
            res.status(200).json(jobs);
        });
    } catch (err) {
        console.error('Error getting all jobs:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get All users data
app.get('/api/getAllUsers', (req, res) => {
    try {
        // Read the contents of the jobs.json file
        fs.readFile('./public/userdb.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading jobs file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }
            
            // Parse the JSON data to get the array of jobs
            const usersDB = JSON.parse(data);
            
            // Send the array of jobs as the response
            res.status(200).json(usersDB);
        });
    } catch (err) {
        console.error('Error getting all users data:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

//Get All jobs associated with individual Recruiter by his email id
app.get('/api/getRecruiterJobs/:email', (req, res) => {
    const recruiterEmail = req.params.email;
    // Check if the recruiter exists
    if (!userDB[recruiterEmail]) {
        return res.status(404).json({ error: 'Recruiter not found' });
    }
    // Fetch jobs associated with the recruiter
    const recruiterJobs = createJobs.filter(job => job.createdBy === recruiterEmail);
    res.status(200).json(recruiterJobs);
});

// Function to read job data from the JSON file
const readJobsData = () => {
    try {
        const jobsData = fs.readFileSync('./public/jobs.json', 'utf8');
        return JSON.parse(jobsData);
    } catch (error) {
        console.error('Error reading jobs data:', error);
        return []; // Return an empty array if there's an error
    }
};
// POST endpoint to handle quick apply logic
app.post('/api/quickApply', (req, res) => {
    try {
        // Extract job ID and user email from the request body
        const { job_id, email } = req.body;

        // Check if the job ID and user email are provided
        if (!job_id || !email) {
            return res.status(400).json({ error: 'Job ID and user email are required' });
        }

        // Read job data from the JSON file
        const jobsDatabase = readJobsData();
        // Check if the job exists in the database
        const job = jobsDatabase.find(job => job.job_id === job_id);
        if (!job) {
            return res.status(404).json({ error: 'Job not found' });
        }

        // Check if the user has already applied for the job
        
        
        const isAlreadyApplied = job.applicants_userIds.includes(email);
        if (isAlreadyApplied) {
            return res.status(400).json({ error: 'User has already applied for this job' });
        }

        // Add the job to the list of applied jobs
        jobsDatabase.map(job => {
            if(job.job_id === job_id){
                job.applicants_userIds.push(email);
            }
        });
        // You can also update the job object in the jobsDatabase to reflect the number of applicants, etc.
        fs.writeFile('./public/jobs.json', JSON.stringify(jobsDatabase) , (err) => {
            if (err) {
              console.error('Error writing todo to file:', err);
              return res.status(500).json({ error: 'Internal server error' });
            }
        });

        // Return success response
        res.status(200).json({ message: 'Applied for job successfully' });
    } catch (error) {
        console.error('Error applying for job:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

app.get('/api/getUserDetails/:emailId', (req, res) => {
    try {
        const recruiterEmail = req.params.emailId;
        fs.readFile('./public/jobs.json', 'utf8', (err, data) => {
            if (err) {
                console.error('Error reading jobs file:', err);
                return res.status(500).json({ error: 'Internal server error' });
            }

            const jobs = JSON.parse(data);

            // Filter jobs created by the recruiter
            const recruiterJobs = jobs.filter(job => job.createdBy === recruiterEmail);

            // Collect all applicants' email IDs from the filtered jobs
            const applicantsEmails = recruiterJobs.reduce((emails, job) => {
                return emails.concat(job.applicants_userIds.filter(email => email));
            }, []);

            // Read user database to fetch applicant profiles
            fs.readFile('./public/userdb.json', 'utf8', (err, userData) => {
                if (err) {
                    console.error('Error reading user database file:', err);
                    return res.status(500).json({ error: 'Internal server error' });
                }

                const userDB = JSON.parse(userData);

                // Fetch applicant profiles based on their email IDs
                const applicantProfiles = applicantsEmails.map(email => {
                    return userDB[email];
                });

                // Return the applicant profiles
                res.status(200).json(applicantProfiles);
            });
        });
    } catch (error) {
        console.error('Error fetching user details:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});


    app.listen(process.env.port || 8080); 
    console.log('Running at Port 8080'); 
    module.exports = { app };