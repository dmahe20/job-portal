import React, { useContext, useState } from 'react';
import { useNavigate } from "react-router-dom";
import {
  Avatar,
  Button,
  CssBaseline,
  TextField,
  Grid,
  Box,
  Typography,
  Container,
  MenuItem,
  Chip,
  InputAdornment,
} from "@mui/material";
import GitHubProfile from "../Freelancer/Profile/Profile";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import useStyles from '../../Styles/Styles';
import { AuthContext } from '../../contexts/AuthProvider';
import toast from 'react-hot-toast';
import HowToRegIcon from "@mui/icons-material/HowToReg";
import EmailInput from "../../helpers/EmailInput";
import PasswordInput from "../../helpers/PasswordInput";

const theme = createTheme();
const MultifieldInput = (props) => {
  const classes = useStyles();
  const { education, setEducation } = props;

  return (
    <>
      {education.map((obj, key) => (
        <Grid
          item
          container
          className={classes.inputBox}
          key={key}
          style={{ paddingRight: 0 }}
        >
          <Grid item xs={6}>
            <TextField
              label={`Institution Name #${key + 1}`}
              value={education[key].institutionName}
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].institutionName = event.target.value;
                setEducation(newEdu);
              }}
              variant="outlined"
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="Start Year"
              value={obj.startYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].startYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
          <Grid item xs={3}>
            <TextField
              label="End Year"
              value={obj.endYear}
              variant="outlined"
              type="number"
              onChange={(event) => {
                const newEdu = [...education];
                newEdu[key].endYear = event.target.value;
                setEducation(newEdu);
              }}
            />
          </Grid>
        </Grid>
      ))}
      <Grid item>
        <Button
          variant="contained"
          color="secondary"
          onClick={() =>
            setEducation([
              ...education,
              {
                institutionName: "",
                startYear: "",
                endYear: "",
              },
            ])
          }
          className={classes.inputBox}
        >
          Add another institution details
        </Button>
      </Grid>
    </>
  );
};


const SignUpForm = () => {
  const [signupDetails, setSignupDetails] = useState({
    type: "applicant",
    email: "",
    password: "",
    name: "",
    education: [],
    skills: [],
    bio: "",
    gitProfileId: null
  });

  const [education, setEducation] = useState([
    {
      institutionName: "",
      startYear: "",
      endYear: "",
    },
  ]);
  const {createUser} = useContext(AuthContext)|| {};
  const navigate = useNavigate();
  const [skills, setSkills] = useState([]);
  const [skillsInput, setSkillsInput] = useState("");
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
    },
    name: {
      untouched: true,
      required: true,
      error: false,
      message: "",
    },
  });


  const handleInputError = (key, status, message) => {
    setInputErrorHandler({
      ...inputErrorHandler,
      [key]: {
        required: true,
        untouched: false,
        error: status,
        message: message,
      },
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const tmpErrorHandler = {};
    Object.keys(inputErrorHandler).forEach((obj) => {
      if (inputErrorHandler[obj].required && inputErrorHandler[obj].untouched) {
        tmpErrorHandler[obj] = {
          required: true,
          untouched: false,
          error: true,
          message: `${obj[0].toUpperCase() + obj.substr(1)} is required`,
        };
      } else {
        tmpErrorHandler[obj] = inputErrorHandler[obj];
      }
    });

    console.log(education, "---verification");

    let updatedDetails = {
      ...signupDetails,
      education: education
        .filter((obj) => obj.institutionName.trim() !== "")
        .map((obj) => {
          if (obj["endYear"] === "") {
            delete obj["endYear"];
          }
          return obj;
        }),
    };

    setSignupDetails(updatedDetails);

    const verified = !Object.keys(tmpErrorHandler).some((obj) => {
      return tmpErrorHandler[obj].error;
    });

    console.log(signupDetails, updatedDetails, "--signupDetails", verified);
    if(verified) {
      createUser(updatedDetails.email, updatedDetails)
        .then((result) => {
            if(result){
              toast('User Created Successfully');
            }
            navigate('/', {replace: true});
        })
        .catch((error) => {
            console.log(error);
            toast(error.message);
        });
    }
  };


  const classes = useStyles();

  const handleInput = (key, value) => {
    setSignupDetails({
      ...signupDetails,
      [key]: value,
    });
  };

  return <ThemeProvider theme={theme}>
     <Container component="main" maxWidth="xs">
         <CssBaseline />
         <Box
          sx={{
            marginTop: 1,
            marginBottom: 8,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: "primary.main" }}>
            <HowToRegIcon />
          </Avatar>
  <Grid container direction="column" spacing={1} alignItems="center">
    <Grid item>
      <Typography variant="h3" component="h2">
        Signup
      </Typography>
    </Grid>
    <Grid item>
      <TextField
        select
        label="Category"
        variant="outlined"
        className={classes.inputBox}
        value={signupDetails.type}
        onChange={(event) => {
          handleInput("type", event.target.value);
        }}
      >
        <MenuItem value="applicant">Applicant</MenuItem>
        <MenuItem value="recruiter">Recruiter</MenuItem>
      </TextField>
    </Grid>
    <Grid item>
      <TextField
        label="Name"
        value={signupDetails.name}
        onChange={(event) => handleInput("name", event.target.value)}
        className={classes.inputBox}
        error={inputErrorHandler.name.error}
        helperText={inputErrorHandler.name.message}
        onBlur={(event) => {
          if (event.target.value === "") {
            handleInputError("name", true, "Name is required");
          } else {
            handleInputError("name", false, "");
          }
        }}
        variant="outlined"
      />
    </Grid>
    <Grid item>
      <EmailInput
        label="Email"
        value={signupDetails.email}
        onChange={(event) => handleInput("email", event.target.value)}
        inputErrorHandler={inputErrorHandler}
        handleInputError={handleInputError}
        className={classes.inputBox}
        required={true}
      />
    </Grid>
    <Grid item>
      <PasswordInput
        label="Password"
        value={signupDetails.password}
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
      />
    </Grid>
    {signupDetails.type === "applicant" ? (
      <>
        <MultifieldInput
          education={education}
          setEducation={setEducation}
        />
        <Grid item>
        <GitHubProfile signupDetails={signupDetails} setSignupDetails={setSignupDetails}/>
        </Grid>
        <Grid item>
          <TextField
            id="input-with-icon-textfield"
            variant="outlined"
            className={classes.inputBox}
            label="Skills"
            helperText="Press enter to add skills"
            value={skillsInput}
            label="skillsInput"
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
                setSignupDetails({ ...signupDetails, skills: skillsData });
              }
            }}
            variant="standard"
          />
        </Grid>
      </>
    ) : (
      <>
        <Grid item style={{ width: "100%" }}>
          <TextField
            label="Bio (upto 250 words)"
            multiline
            rows={8}
            style={{ width: "100%" }}
            variant="outlined"
            value={signupDetails.bio}
            onChange={(event) => {
              if (
                event.target.value.split(" ").filter(function (n) {
                  return n !== "";
                }).length <= 250
              ) {
                handleInput("bio", event.target.value);
              }
            }}
          />
        </Grid>
      </>
    )}

    <Grid item>
      <Button
        variant="contained"
        color="primary"
        onClick={handleSubmit}
        className={classes.submitButton}
      >
        Signup
      </Button>
    </Grid>
  </Grid>
  </Box>
  </Container>
 </ThemeProvider>
}

export default SignUpForm;