import { Box, Grid, makeStyles, Typography } from '@material-ui/core';
import { useForm } from 'react-hook-form';
import { useHistory } from 'react-router';
import Form from '../../components/Form/Form';
import Input from '../../components/Input/Input';
import MainContainer from '../../components/MainContainer/MainContainer';
import { purple } from '@material-ui/core/colors';

import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import PrimaryButton from '../../components/PrimaryButton/PrimaryButton';
import { ExitToApp } from '@material-ui/icons';
import { useContext, useState } from 'react';

import ScaleLoader from 'react-spinners/ScaleLoader';
import { uploadImageToServer } from '../../utils/imagebb';
import { createProduct } from '../../functions/product';
import { store } from '../../store/store';
import { toast } from 'react-toastify';

const useStyles = makeStyles((theme) => ({
  center: {
    position: 'absolute',
    left: '50%',
    top: '50%',
    transform: 'translate(-50%, -50%)',
    [theme.breakpoints.down('sm')]: {
      width: '100%',
      marginTop: '7rem',
    },
  },

  margin: {
    marginLeft: '1rem',
    color: purple[400],
  },
}));

const schema = yup.object().shape({
  name: yup
    .string()
    .matches(/^([^0-9]*)$/, 'name should not contain numbers')
    .required('Name is a required field'),
  author: yup
    .string()
    .matches(/^([^0-9]*)$/, 'author should not contain numbers')
    .required('Author is a required field'),

  price: yup
    .string()
    .matches(/^[0-9]*$/, 'price should be a number')
    .required('price is a required field'),
});

const Create = () => {
  const {
    state: { user },
  } = useContext(store);
  const [loading, setLoading] = useState(false);
  const [status, setStaus] = useState('');
  const [imageURL, setImageURL] = useState(null);
  const classes = useStyles();

  const { register, handleSubmit, errors } = useForm({
    mode: 'onBlur',
    resolver: yupResolver(schema),
  });
  const history = useHistory();

  const handleImageUpload = async (e) => {
    try {
      setStaus('image is uploading...');
      const imageData = new FormData();
      imageData.set('key', process.env.REACT_APP_IMAGEBB);
      imageData.append('image', e.target.files[0]);
      const url = await uploadImageToServer(imageData);
      setImageURL(url);
      setStaus('image is uploaded');
    } catch (error) {
      console.log(error);
    }
  };

  const onSubmit = async (data) => {
    console.log(data, imageURL);
    const product = {
      name: data.name,
      author: data.author,
      price: data.price,
      image: imageURL,
    };

    await createProduct(user.token, product);

    // give a toast message
    toast.dark(`New book is created`);

    // redirect to home page
    history.push('/');
  };

  return (
    <div className={classes.center}>
      <Box m={12} />
      <MainContainer maxWidth='sm'>
        <Typography style={{ color: purple[800] }} component='h2' variant='h4'>
          <Grid container direction='row' alignItems='center'>
            <ExitToApp />
            <span className={classes.margin}>
              {!loading ? (
                <Typography style={{ color: purple[800] }} variant='h4'>
                  Create Book
                </Typography>
              ) : (
                <>
                  <ScaleLoader
                    loading={loading}
                    color={purple[700]}
                    size={15}
                  />
                </>
              )}
            </span>
          </Grid>
        </Typography>
        <Form onSubmit={handleSubmit(onSubmit)}>
          <Input
            ref={register}
            type='text'
            name='name'
            label='Book Name'
            error={!!errors.name}
            helperText={errors?.name?.message}
          />
          <Input
            ref={register}
            type='text'
            name='author'
            label='Author Name'
            error={!!errors.author}
            helperText={errors?.author?.message}
          />

          <Input
            ref={register}
            type='text'
            name='price'
            label='Price'
            error={!!errors.price}
            helperText={errors?.price?.message}
          />

          <Input
            ref={register}
            type='file'
            name='image'
            onChange={handleImageUpload}
          />

          {status && <p>{status}</p>}
          <PrimaryButton style={{ background: purple[400] }} type='submit'>
            Save
          </PrimaryButton>
        </Form>
      </MainContainer>
    </div>
  );
};

export default Create;
