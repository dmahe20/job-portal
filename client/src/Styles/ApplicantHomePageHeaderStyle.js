import { makeStyles } from "@material-ui/styles";

const useStyles = makeStyles(() => ({
    header: {
        display: 'flex',
        alignItems: 'center',
        marginBottom: 48, // Adjust spacing as needed
        paddingLeft: 24, // Adjust spacing as needed
        paddingRight: 24, // Adjust spacing as needed
        '@media (min-width: 600px)': {
          marginBottom: 0,
        },
      },
      headerDetails: {
        marginTop: 55,
        marginLeft: 48,
        width: '100%',
        '@media (min-width: 960px)': {
          width: '60%',
        },
      },
      customText: {
        color: '#4C1D95', // Adjust color to match Daisy UI
      },
      imageSection: {
        width: '100%',
        '@media (min-width: 960px)': {
          width: '40%',
        },
      },
      customBtn: {
        backgroundColor: '#4C1D95', // Adjust color to match Daisy UI
        color: '#fff', // Adjust color to match Daisy UI
        marginTop: 48, // Adjust spacing as needed
        '&:hover': {
          backgroundColor: '#6D34A6', // Adjust color to match Daisy UI
        },
      },
  }));
  export default useStyles;