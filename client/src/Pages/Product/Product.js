import {
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Typography,
} from '@material-ui/core';
import { deepPurple } from '@material-ui/core/colors';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 365,

    [theme.breakpoints.down('lg')]: {
      width: '240px',
    },
  },
  media: {
    height: 230,
    paddingTop: '56.25%', // 16:9
  },
}));

const Product = (props) => {
  const classes = useStyles();
  const { _id, name, author, price, image } = props;
  const history = useHistory();
  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={image} title={name} />
          <CardContent>
            <Typography gutterBottom variant='h5' component='h2'>
              {name}
            </Typography>
            <Typography variant='body2' color='textSecondary' component='p'>
              {author}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActionArea>
          <Button size='large' style={{ color: deepPurple[900] }}>
            ${price}
          </Button>

          <Button
            variant='text'
            size='large'
            style={{ color: deepPurple[900] }}
            onClick={() => history.push(`product/${_id}`)}
          >
            Buy Now
          </Button>
        </CardActionArea>
      </Card>
      <Box m={8} />
    </>
  );
};

export default Product;
