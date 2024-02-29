import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles((theme) => ({
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
    },
}));
export default useStyles;