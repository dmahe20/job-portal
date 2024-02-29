import React from 'react';
import error from '../../Assets/images/error.svg';
import useStyles from '../../Styles/Styles';

const Error = () => {
    const classes = useStyles(); 

    return (
        <div className={classes.error}>
            <img className={classes.errorImg} src={error} alt=""/>
        </div>
    );
};

export default Error;