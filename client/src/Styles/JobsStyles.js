import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    body: {
      height: "inherit",
    },
    button: {
      width: "100%",
      height: "100%",
    },
    jobTileOuter: {
      padding: "30px",
      margin: "20px 0",
      boxSizing: "border-box",
      width: "100%",
    },
    popupDialog: {
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    statusBlock: {
      width: "100%",
      height: "100%",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      textTransform: "uppercase",
      "@media (max-width: 600px)": {
        fontSize: "0.8rem",
      },
    },
    // "@media (max-width: 600px)": {
    //   jobTileOuter: {
    //     padding: "10px",
    //     margin: "10px 0",
    //   },
    //   statusBlock: {
    //     fontSize: "0.8rem", // Adjust font size for smaller screens
    //   },
    // },

  }));

  export default useStyles;