import React,{ useContext} from 'react';
import homeImg from "../../../Assets/images/home.svg";
import useStyles from "../../../Styles/Styles";
import { getLoggedInUser } from '../../../helpers/utils';

import ApplicantHomePageHeader from "../../Freelancer/ApplicantHomePageHeader";
import Jobs from '../JOBS/Jobs';

const Home = () => {
    const classes = useStyles();
    const user = getLoggedInUser();

    return (
        <div>
            <div className={classes.homeDiv}>
                {user && user.userType !== "recruiter" ? <ApplicantHomePageHeader />: 
                    <img className={classes.homeImg} src={homeImg} alt="" />}
            </div>
            <Jobs/>
        </div>
    );
};

export default Home;