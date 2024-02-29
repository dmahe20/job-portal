import React, { useState, useContext } from "react";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useStyles from '../../Styles/Styles';
import { AuthContext } from "../../contexts/AuthProvider";
import toast from 'react-hot-toast';
import {getLoggedInUser} from '../../helpers/utils';
import Cookies from 'js-cookie';
import EmailInput from "../../helpers/EmailInput"; // Import the EmailInput component
import PasswordInput from "../../helpers/PasswordInput";
const theme = createTheme();

const Login = () => {
  const classes = useStyles(); 
  const {signInUser} = useContext(AuthContext)|| {};
  const location = useLocation();
  const navigate = useNavigate();
  const user =  getLoggedInUser();
  const [userCred, setUserCred] = useState({email: "", password: ""});

  const [inputErrorHandler, setInputErrorHandler] = useState({
    email: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
    password: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    }
  });
  const from = location.state?.from?.pathname || '/';

  const handleSubmit = (event) => {
    event.preventDefault();
    if (!userCred.email) {
      handleInputError("email", true, "Please enter email");
    } else {
      handleInputError("email", false, "");
    }
    if (!userCred.password) {
      handleInputError("password", true, "Please enter password");
    } else {
      handleInputError("password", false, "");
    }
    if(userCred.email && userCred.password){
      signInUser(userCred.email, userCred.password)
      .then((result) => {
        // Decode the URL-encoded string
        Cookies.set("email", result.email);
        Cookies.set("userType", result.userType);
        console.log(getLoggedInUser(), "------userObject");
        if(getLoggedInUser()){
          navigate(from, { replace: true });
          toast('User Logged In Successfully');
        }
      })
      .catch((error) => {
        console.log(error);
        toast(error.response.data.error);
      });
    }
  };

  const handleInput = (key, value) => {
    setUserCred({
      ...userCred,
      [key]: value,
    });
  };

  const handleInputError = (key, status, message) => {
    setInputErrorHandler((prevErrorHandler)=>({
      ...prevErrorHandler,
      [key]: {
        ...prevErrorHandler[key],
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    }));
  };

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box
            component="form"
            onSubmit={handleSubmit}
            noValidate
            sx={{ mt: 1 }}
          >
           
            <EmailInput
              label="Email"
              id="email"
              value={userCred.email}
              onChange={(event) => handleInput("email", event.target.value)}
              inputErrorHandler={inputErrorHandler}
              handleInputError={handleInputError}
              className={classes.inputBox}
              required={true}
            />
            <PasswordInput
              label="Password"
              value={userCred.password}
              onChange={(event) => handleInput("password", event.target.value)}
              className={classes.inputBox}
              error={inputErrorHandler.password.error}
              helperText={inputErrorHandler.password.message}
              onBlur={(event) => {
                if (event.target.value === "") {
                  handleInputError("password", true, "Password is required");
                } else {
                  handleInputError("password", false, "");
                }
              }}
              required={true}
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            <Grid container className={classes.signupTxt}>
              <Grid item>
                <Link to="/signup" variant="body2">
                   <p>Don't have an account? Registration</p> 
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Container>
    </ThemeProvider>
  );
};

export default Login;