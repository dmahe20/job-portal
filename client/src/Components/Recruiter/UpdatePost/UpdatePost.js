import React, { useState } from "react";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Card } from "@mui/material";
import useStyles from "../../../Styles/Styles";
import { useLoaderData } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

const UpdatePost = () => {
  const classes = useStyles();
  const [updatedPost, setUpdatedPost] = useState({});
  const loadPost = useLoaderData();

  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const postName = e.target.postName.value;
    const companyName = e.target.companyName.value;
    const numberOfVacancy = e.target.numberOfVacancy.value;
    const currentDate = e.target.currentDate.value;
    const lastApplyDate = e.target.lastApplyDate.value;
    const jobDescription = e.target.jobDescription.value;
    const jobRequirements = e.target.jobRequirements.value;
    const jobBenefits = e.target.jobBenefits.value;
    const howToApply = e.target.howToApply.value;

    const updatedPost = {
      postName,
      companyName,
      numberOfVacancy,
      currentDate,
      lastApplyDate,
      jobDescription,
      jobRequirements,
      jobBenefits,
      howToApply,
    };

    setUpdatedPost(updatedPost);
    console.log(updatedPost);
  };

  return (
    <React.Fragment>
      <div className={classes.MakePost}>
        <Card className={classes.MakePostCard}>
          <Typography mb={5} variant="h3" align="center" gutterBottom>
            Update Job Post
          </Typography>
          <form onSubmit={handleSubmit}>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="postName"
                  name="postName"
                  label="Post name"
                  defaultValue={loadPost.postName}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="companyName"
                  name="companyName"
                  label="Company name"
                  defaultValue={loadPost.companyName}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="numberOfVacancy"
                  name="numberOfVacancy"
                  label="Number of vacancy"
                  defaultValue={loadPost.numberOfVacancy}
                  fullWidth
                  autoComplete="given-name"
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="currentDate"
                  name="currentDate"
                  label="Post Created Date"
                  fullWidth
                  autoComplete="given-name"
                  type="date"
                  defaultValue={loadPost.currentDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="lastApplyDate"
                  name="lastApplyDate"
                  label="Last Apply Date"
                  fullWidth
                  autoComplete="given-name"
                  type="date"
                  defaultValue={loadPost.lastApplyDate}
                  InputLabelProps={{ shrink: true }}
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  name="jobDescription"
                  label="Job Description"
                  defaultValue={loadPost.jobDescription}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="Job Requirements"
                  defaultValue={loadPost.jobRequirements}
                  name="jobRequirements"
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="Job Benefits"
                  name="jobBenefits"
                  defaultValue={loadPost.jobBenefits}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} sm={12}>
                <TextField
                  required
                  id="standard-multiline-static"
                  label="How to Apply"
                  name="howToApply"
                  defaultValue={loadPost.howToApply}
                  multiline
                  rows={4}
                  fullWidth
                />
              </Grid>

              <Grid item xs={12} sm={12} align="center">
                <Button
                  type="submit"
                  variant="contained"
                  align="center"
                  color="primary"
                >
                  Update Post
                </Button>
              </Grid>
            </Grid>
          </form>
        </Card>
      </div>
    </React.Fragment>
  );
};

export default UpdatePost;