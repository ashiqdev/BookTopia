import { Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core';

const drawerWidth = 240;

const useStyles = makeStyles({
  drawer: {
    width: drawerWidth,
  },
});

const CheckOut = () => {
  const classes = useStyles();
  return (
    <div>
      <Box m={12} />

      <p>I am private checkout page</p>
    </div>
  );
};

export default CheckOut;
