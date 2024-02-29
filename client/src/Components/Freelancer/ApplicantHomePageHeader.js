import {
    Button,
    Grid,
    Typography,
} from "@mui/material";
import applicantImg from "../../Assets/images/job_portal_applicant.svg";
import useStyles from '../../Styles/ApplicantHomePageHeaderStyle';

const ApplicantHomePageHeader = () => {
    const classes = useStyles();
    return (
        <Grid container alignItems="center" spacing={3}>
      <Grid item xs={12} md={6}>
        <div className={classes.headerDetails}>
          <Typography variant="h2" className="text-7xl">
            One Step Closer To Your{' '}
            <span className={`${classes.customText} text-7xl`}>Dream Job</span>
          </Typography>
          <Typography level="body-lg" className="mt-6">
            Explore thousands of job opportunities with all the information you
            need. Its your future. Come find it. Manage all your job
            application from start to finish.
          </Typography>
          <Button variant="contained" color="primary" className="mt-4">
            Get Started
          </Button>
        </div>
      </Grid>
      <Grid item xs={12} md={6}>
        <div className={classes.imageSection}>
          <img src={applicantImg} alt="Banner" className="w-full" />
        </div>
      </Grid>
    </Grid>
    );
}

export default ApplicantHomePageHeader;