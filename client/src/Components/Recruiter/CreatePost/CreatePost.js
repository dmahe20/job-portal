import React, { useState, useContext } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { 
  Card,
  InputAdornment,
  Chip
} from "@mui/material";
import useStyles from "../../../Styles/Styles";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';
import { getLoggedInUser } from '../../../helpers/utils';
import axios from 'axios';

const INITIAL_DATA = {
  company_name: '',
  job_title: '',
  jobDescription: '',
  jobRequirements: '',
  remote_or_onsite: '',
  salary: 0,
  email: '',
  phone: '',
  location: '',
  tags: '',
  skills: [],
  numberOfVacancy: 0
};
const CreatePost = () => {
  const classes = useStyles();
  const user = getLoggedInUser();
  const [formData, setFormData] = useState(INITIAL_DATA);
  const [skills, setSkills] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");
  const [phoneError, setPhoneError] = useState('');
  const [isBlurred, setIsBlurred] = useState(false);

  const navigate = useNavigate();

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ 
      ...formData, 
      [name]: value 
    });
  };
  const handleBlur = () => {
    setIsBlurred(true);
    if (!/^\d{10}$/.test(formData.phone)) {
      setPhoneError('Phone number must be 10 digits');
    } else {
      setPhoneError('');
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    const company_name = e.target.company_name.value;
    const jobDescription = e.target.jobDescription.value;
    const job_title = e.target.job_title.value;
    const jobRequirements = e.target.jobRequirements.value;
    const remote_or_onsite = e.target.remote_or_onsite.value;
    const salary = e.target.salary.value;

    if (formData.skills.length === 0) {
      toast.error("Please enter at least one skill.");
      return;
    }
    const createdPostData = {
      company_name,
      jobDescription,
      jobRequirements,
      job_title,
      remote_or_onsite,
      salary,
      skills: formData.skills,
      ...formData,
      createdBy: user.emailId,
      job_id: "REQ_" + Math.random().toString(10).slice(7)
    };
    console.log(createdPostData);
    try {
      const response = await axios.post('http://localhost:8080/api/createJobs', createdPostData);
      console.log(response.data); // Log the response data
      toast.success("Job created successfully");
      navigate("/my-jobs", { replace: true });
    } catch (error) {
      console.error('Error creating job:', error);
      toast.error("Error creating job");
  };
  };

  return (
    <React.Fragment>
      <div className={classes.MakePost}>
        <Card className={classes.MakePostCard}>
          <Typography mb={5} variant="h3" align="center" gutterBottom>
            Add Job Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  name="job_title"
                  label="Job Title"
                  value={formData.job_title}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  id="input-with-icon-textfield"
                  variant="outlined"
                  className={classes.inputBox}
                  label="Skills"
                  helperText="Press enter to add skills"
                  value={skillsInput}
                  label="Skills Input"
                  fullWidth
                  onChange={(event) => {setSkillsInput(event.target.value)}}
                  InputProps={{
                    startAdornment: (
                      <InputAdornment position="start">
                        {skills && skills.map(itr => 
                          <Chip
                          label={itr}
                          onDelete={(data) => {
                            const filteredSkills = skills.filter(i => i !== itr)
                            console.log(filteredSkills, data.key, "---delete skills--", itr);
                            setSkills(filteredSkills);
                          }}
                        />)}
                      </InputAdornment>
                    )
                  }}
                  onKeyPress={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      setSkillsInput("");
                      const skillsData = skills; 
                      skillsData.push(e.target.value)
                      setSkills(skillsData);
                      setFormData(prevFormData => ({
                        ...prevFormData,
                        skills: skillsData,
                      }));
                    }
                  }}
                  variant="standard"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  name="jobDescription"
                  label="Job Description"
                  value={formData.jobDescription}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  name="remote_or_onsite"
                  label="Remote or Onsite"
                  value={formData.remote_or_onsite}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  type="number"
                  name="salary"
                  label="Salary per hour"
                  value={formData.salary}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  type="number"
                  name="numberOfVacancy"
                  label="Number of Vacancy"
                  value={formData.numberOfVacancy}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="Job Requirements"
                  name="jobRequirements"
                  value={formData.jobRequirements}
                  multiline
                  rows={4}
                  fullWidth
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="company_name"
                  name="company_name"
                  label="Company name"
                  value={formData.company_name}
                  fullWidth
                  autoComplete="given-name"
                  onChange={handleChange}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <div>
                  <Typography variant="subtitle1" gutterBottom>
                    Job Poster's Info
                  </Typography>
                  <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <TextField
                      required
                      id="email"
                      name="email"
                      fullWidth
                      disabled={true}
                      value={user.emailId}
                      style={{ marginRight: '10px' }}
                    />
                    <TextField
                      required
                      id="phone"
                      name="phone"
                      label="Phone"
                      fullWidth
                      autoComplete="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={isBlurred && !!phoneError}
                      helperText={isBlurred && phoneError}
                      inputProps={{ maxLength: 10 }}
                      style={{ marginRight: '10px' }}
                    />
                    <TextField
                      required
                      id="location"
                      name="location"
                      label="Address"
                      fullWidth
                      multiline
                      value={formData.location}
                      onChange={handleChange}
                    />
                  </div>
                </div>
              </Grid>
              <Grid item xs={12} sm={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  align="center"
                  color="primary"
                >
                  Add Job
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default CreatePost;
