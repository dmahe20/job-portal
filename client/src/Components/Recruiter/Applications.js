import React, { useState, useEffect, useContext } from "react";
import {
  Chip,
  Grid,
  Paper,
  Typography,
  Avatar,
} from "@mui/material";
import Rating from '@mui/material/Rating';
import { useParams } from "react-router-dom";
import { AuthContext } from '../../contexts/AuthProvider';
import { useNavigate } from "react-router-dom";
import useStyles from '../../Styles/ApplicationStyles';
import {getLoggedInUser} from "../../helpers/utils";
import axios from 'axios';

const ApplicationTile = (props) => {
    const classes = useStyles();
    const { applicant_id, usersDataRes } = props;
    const usersData = usersDataRes[applicant_id];
    const [repositories, setRepositories] = useState([]);

    const fetchRepositories = async () => {
      try {
        const response = await axios.get(`https://api.github.com/users/${usersData.gitProfileId}/repos`);
        setRepositories(response.data);
      } catch (error) {
        setRepositories([]);
      }
    };

    useEffect(() => {
      if(usersData.gitProfileId) {
        fetchRepositories();
      }
    }, []);

    return (<Paper className={classes.jobTileOuter} elevation={3}>
        <Grid container>
          <Grid
            item
            xs={2}
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <Avatar
              className={classes.avatar}
            />
          </Grid>
          <Grid container item xs={7} spacing={1} direction="column">
            <Grid item>
              <Typography variant="h5">
                {usersData.name}
              </Typography>
            </Grid>
            <Grid item>
              <Rating
                value={null}
                readOnly
              />
            </Grid>
            <Grid item>Email: {usersData.email}</Grid>
            <Grid item>Education: {usersData.education[0].institutionName}</Grid>
            <Grid item>
              Github Projects:
              {repositories.length > 0 && <ul>
                {repositories.map((repo) => (
                  <li key={repo.id}>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  </li>
                ))}
              </ul>}
            </Grid>
            <Grid item>
              Skills:{usersData.skills.map((skill) => (
                <Chip label={skill} style={{ marginRight: "2px" }} />
              ))}
            </Grid>
          </Grid>
        </Grid>
      </Paper>
    );
  };
  
  const AcceptedApplicants = () => {
    let { job_id } = useParams();
    const [applications, setApplications] = useState([]);
    const [jobDetails, setJobDetails] = useState([]);
    const [usersData, setUsersData] = useState([]);
    const {logOutUser } = useContext(AuthContext)|| {};
    const user = getLoggedInUser();
    const navigate = useNavigate();
    useEffect(() => {
      if(user && user.userType !== "recruiter"){
        logOutUser();
        navigate("/login", { replace: true });
      }

      const fetchData = async () => {
        const jobsPostData = await axios.get('http://localhost:8080/api/getAllJobs');
        const usersDataRes = await axios.get("http://localhost:8080/api/getAllUsers");
        const jobs = jobsPostData.data;
        if(jobs){
            const job = jobs.filter(itr => itr.job_id === job_id);
            if(job && job[0]["applicants_userIds"]){
                const userIds = job[0]["applicants_userIds"];
                setUsersData(usersDataRes.data);
                setApplications(userIds);
                setJobDetails(job[0]);
            }
            
        }
      }
      fetchData();  
    },[]);
  
    return (
      <>
        <Grid
          container
          item
          direction="column"
          alignItems="center"
          style={{ padding: "30px", minHeight: "93vh" }}
        >
          <Grid item>
            <Typography variant="h2">Employees</Typography>
          </Grid>
          <Grid
            container
            item
            xs
            direction="column"
            style={{ width: "100%" }}
            alignItems="stretch"
            justify="center"
          >
            {applications.length > 0 ? (
              applications.map((applicant_id) => (
                <Grid item>
                  <ApplicationTile applicant_id={applicant_id} jobDetails={jobDetails} usersDataRes={usersData}/>
                </Grid>
              ))
            ) : (
              <Typography variant="h5" style={{ textAlign: "center" }}>
                No Applications Found
              </Typography>
            )}
          </Grid>
        </Grid>
      </>
    );
  };
  
  export default AcceptedApplicants;