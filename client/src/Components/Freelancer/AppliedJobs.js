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
import { getLoggedInUser } from '../../helpers/utils';
import Pagination from '../Commons/JOBS/Pagination';
import useStyles from '../../Styles/AppliedJobsStyles'
import {AuthContext} from "../../contexts/AuthProvider";
import axios from 'axios';

const JobTile = (props) => {
  const user = getLoggedInUser();
  const navigate = useNavigate();
  const classes = useStyles();
  const { job } = props;
  const {job_id ,job_title, company_name, numberOfVacancy, jobDescription, remote_or_onsite,  skills, salary, applicants_userIds, createdBy } = job;
  //const setPopup = useContext(SetPopupContext);

  const [open, setOpen] = useState(false);
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
            >
              {"Applied"}
            </Button>
          </Grid>)}
        </Grid>
      </Grid>
  
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
        </Paper>
    </Paper>
  );
};

const AppliedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const user = getLoggedInUser();
    const {logOutUser } = useContext(AuthContext)|| {};
    const [currentPage, setCurrentPage] = useState(1);
    const [jobsPerPage] = useState(10);
    const [searchSkill, setSearchSkill] = useState('');


    useEffect(() => {
      const fetchData = async () => {
        const jobsPostData = await axios.get('http://localhost:8080/api/getAllJobs');
        let filteredLoggedInUserPosts = jobsPostData.data;
        filteredLoggedInUserPosts = Array.isArray(filteredLoggedInUserPosts) && filteredLoggedInUserPosts.filter(itr => {return itr.applicants_userIds && itr.applicants_userIds.includes(user.emailId);});
        let filteredJobs = filteredLoggedInUserPosts;
        if (searchSkill) {
          const lowercaseSearchSkill = searchSkill.toLowerCase();
          filteredJobs = filteredLoggedInUserPosts.filter(job => {
              const jobSkills = job.skills.map(skill => skill.toLowerCase());
              return jobSkills.some(skill => skill.includes(lowercaseSearchSkill));
          });
      }
        setJobs(filteredJobs);
        setCurrentPage(1);
      }
      fetchData();
    }, [user?.email, logOutUser,searchSkill]);

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
            <Typography variant="h2">My AppliedJobs</Typography>
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
          {currentJobs && currentJobs.length > 0 ? (
              currentJobs.map((job) => {
                return <JobTile job={job}  />;
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
export default AppliedJobs;