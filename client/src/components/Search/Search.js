import { Box } from '@material-ui/core';
import { makeStyles, Paper } from '@material-ui/core';
import { purple, grey } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    zIndex: '1',
  },

  searchBox: {
    width: '500px',
    position: 'relative',
    margin: '0 auto',
    padding: '5px',
    [theme.breakpoints.down('sm')]: {
      width: '300px',
    },
  },

  searchForm: {
    height: '40px',
    backgroundColor: grey[100],
    overflow: 'hidden',
    borderRadius: '20px',

    [theme.breakpoints.down('sm')]: {
      width: '300px',
      marginTop: '580px',
    },
  },

  searchText: {
    fontSize: '14px',
    borderWidth: '0',
    background: 'transparent',
    lineHeight: '15px',
    width: '90%',
    // padding: "10px 0 5px 1em",
    padding: '12px',
    color: '#282828',
    outline: 'none',
  },

  searchButton: {
    position: 'absolute',
    top: '5px',
    right: '5px',
    height: '40px',
    width: '80px',
    color: '#fff',
    textAlign: 'center',
    borderWidth: '0',
    backgroundColor: purple[400],
    cursor: 'pointer',
    textTransform: 'uppercase',
    outline: '0',
    borderRadius: '20px',
    [theme.breakpoints.down('sm')]: {
      top: '585px',
    },
  },
}));

const Search = () => {
  const classes = useStyles();

  return (
    <div>
      <Box m={12} />

      <Paper>
        <div className={classes.center}>
          <div className={classes.searchBox}>
            <form className={classes.searchForm}>
              <input
                className={classes.searchText}
                placeholder='Search Books...'
                type='text'
                value=''
              />
              <button className={classes.searchButton} type='submit'>
                <span>Search</span>
              </button>
            </form>
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default Search;
