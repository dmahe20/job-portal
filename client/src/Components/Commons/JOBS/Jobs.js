import React, { useState, useEffect, useContext } from "react";
import {
  Button,
  Chip,
  Grid,
  Paper,
  TextField,
  Typography,
  Modal,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import { AuthContext } from '../../../contexts/AuthProvider';
import Pagination from './Pagination';
import useStyles from '../../../Styles/JobsStyles';
import {getLoggedInUser} from "../../../helpers/utils";
import axios from 'axios';

const JobTile = (props) => {
  
  const navigate = useNavigate();
  const classes = useStyles();
  const { job } = props;
  const {job_id ,job_title, company_name, jobDescription, remote_or_onsite,  skills, salary, applicants_userIds, createdBy } = job;
  //const setPopup = useContext(SetPopupContext);
  const user = getLoggedInUser();
  const [open, setOpen] = useState(false);
  //const [openUpdate, setOpenUpdate] = useState(false);
  const [jobDetails, setJobDetails] = useState(job);

  console.log(jobDetails);

  const handleInput = (key, value) => {
    setJobDetails({
      ...jobDetails,
      [key]: value,
    });
  };

  const handleClick = (location) => {
      navigate(location, { replace: true });
  };

  const handleClose = () => {
    setOpen(false);
  };

  // const handleCloseUpdate = () => {
  //   setOpenUpdate(false);
  // };

  const handleDelete = () => {
    console.log(job.job_id);
  };

  //const postedOn = new Date(job.dateOfPosting);

  return (
    <Paper className={classes.jobTileOuter} elevation={3}>
      <Grid container> 
        <Grid container item xs={9} spacing={1} direction="column">
          <Grid item>
            <Typography variant="h5">{job_title}</Typography>
          </Grid>
          <Grid item>Company Name : {company_name}</Grid>
          <Grid item>Role : {jobDescription}</Grid>
          <Grid item>Salary : &#8377; {salary} per month</Grid>
            {user && user.userType === "recruiter" ?
            <Grid item>Number of Applicants: {applicants_userIds ? applicants_userIds.length : 0}</Grid>
            :
            ""}
          <Grid item>
           Skills Required: {skills.map((skill) => (
              <Chip label={skill} style={{ marginRight: "2px" }} />
            ))}
          </Grid>
        </Grid>
        <Grid item container direction="column" xs={3}>
          {user && user.userType === "recruiter" ? (<><Grid item xs>
            <Button
              variant="contained"
              color="primary"
              className={classes.statusBlock}
              onClick={() => handleClick(`/job/applications/${job_id}`)}
            >
              View Applications
            </Button>
          </Grid>
          <Grid item>
            <Button
              variant="contained"
              color="secondary"
              className={classes.statusBlock}
              onClick={() => {
                setOpen(true);
              }}
            >
              Delete Job
            </Button>
          </Grid></>): (<Grid item xs>
            <Button
              variant={"contained"}
              disabled={applicants_userIds && applicants_userIds.includes(user.emailId)}
              color="primary"
              className={classes.statusBlock}
              onClick={() => {
                axios.post('http://localhost:8080/api/quickApply', {job_id: job_id, email: user.emailId});
                
              }}
            >
              {applicants_userIds && applicants_userIds.includes(user.emailId) ? "Applied" : "Quick Apply"}
            </Button>
          </Grid>)}
        </Grid>
      </Grid>
      <Modal open={open} onClose={handleClose} className={classes.popupDialog}>
        <Paper
          style={{
            padding: "20px",
            outline: "none",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            minWidth: "30%",
            alignItems: "center",
          }}
        >
          <Typography variant="h4" style={{ marginBottom: "10px" }}>
            Are you sure?
          </Typography>
          <Grid container justify="center" spacing={5}>
            <Grid item>
              <Button
                variant="contained"
                color="secondary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleDelete()}
              >
                Delete
              </Button>
            </Grid>
            <Grid item>
              <Button
                variant="contained"
                color="primary"
                style={{ padding: "10px 50px" }}
                onClick={() => handleClose()}
              >
                Cancel
              </Button>
            </Grid>
          </Grid>
        </Paper>
      </Modal>
    </Paper>
  );
};

const Jobs = () => {
    const [jobs, setJobs] = useState([]);
    const {logOutUser} = useContext(AuthContext)|| {};
    const user = getLoggedInUser();
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10);
    const [searchSkill, setSearchSkill] = useState('');

    useEffect(() => {
      const fetchData = async () => {
        let jobData;
        if (user && user.userType === "recruiter") {
          jobData = await axios.get(`http://localhost:8080/api/getRecruiterJobs/${user.emailId}`);
        } else {
          jobData = await axios.get('http://localhost:8080/api/getAllJobs');
        }
  
        if (jobData && jobData.data) {
          let filteredJobs = jobData.data;
          if (searchSkill) {
            const lowercaseSearchSkill = searchSkill.toLowerCase();
            filteredJobs = filteredJobs.filter(job => {
              const jobSkills = job.skills.map(skill => skill.toLowerCase());
              return jobSkills.some(skill => skill.includes(lowercaseSearchSkill));
            });
          }
          setJobs(filteredJobs);
          setCurrentPage(1);
        }
      };
  
      fetchData();
    }, [user?.email, logOutUser, searchSkill]);
  

    //Logic calculation for pagination
    const indexOfLastJob = currentPage * jobsPerPage;
    const indexOfFirstJob = indexOfLastJob - jobsPerPage;
    const currentJobs = jobs.length > 0 && jobs.slice(indexOfFirstJob, indexOfLastJob);
    const paginate = (pageNumber) => setCurrentPage(pageNumber);


  return (
    <>
      <Grid
        container
        item
        direction="column"
        alignItems="center"
        style={{ padding: "30px", minHeight: "93vh" }}
      >
        <Grid
          item
          container
          direction="column"
          justify="center"
          alignItems="center"
        >
          <Grid item xs>
            <Typography variant="h2">Available Jobs</Typography>
          </Grid>
        </Grid>

            {/* Add search input for filtering */}
            <TextField
                label="Search by Skill"
                variant="outlined"
                value={searchSkill}
                onChange={(e) => setSearchSkill(e.target.value)}
                style={{ marginBottom: "20px" }}
            />
        <Grid
          container
          item
          xs
          direction="column"
          alignItems="stretch"
          justify="center"
        >
          {currentJobs !== null && currentJobs !== undefined && currentJobs.length > 0 ?(
              currentJobs.map((job) => {
                return <JobTile job={job} />;
              })
          ) : (
            <Typography variant="h5" style={{ textAlign: "center" }}>
              No jobs found
            </Typography>
          )}
        </Grid>
        <Pagination
              jobsPerPage={jobsPerPage}
              totalJobs={jobs.length}
              paginate={paginate}
              currentPage={currentPage}
              currentJobs={currentJobs}
              setCurrentPage={setCurrentPage}
        />
      </Grid>
    </>
  );
};
export default Jobs;