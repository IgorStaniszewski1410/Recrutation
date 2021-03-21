import React from 'react';
import {useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import {Box} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmojiEmotionsSharp from '@material-ui/icons/EmojiEmotionsSharp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {login} from '../../store/user.js'

import {Formik} from 'formik'
import TextField from "@material-ui/core/TextField/TextField";
import Button from "@material-ui/core/Button";

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
  },
  image: {
    backgroundImage: 'url(https://source.unsplash.com/random)',
    backgroundRepeat: 'no-repeat',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[50] : theme.palette.grey[900],
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  paper: {
    margin: theme.spacing(8, 4),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  form: {
    width: '100%', // Fix IE 11 issue.
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));


const Login = () => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const { user } = useSelector(state => state.user);

  console.log(user, 'user');
  // console.log(user, 'userProps');
  // useEffect(() => {
  //   props.history.push('/dashboard')
  // }, [user]);

  return (
    <Grid container component="main" className={classes.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={classes.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={classes.paper}>
          <Avatar className={classes.avatar}>
            <EmojiEmotionsSharp />
          </Avatar>
          <Typography component="h1" variant="h5">
            Wybierz nazwę użytkownika
          </Typography>
          <Formik
            initialValues={{ username: '', password: '' }}
            onSubmit={(values) => { dispatch(login(values)) }}
            >
              {({ isSubmitting }) => (
                <form onSubmit={() => {}}>
                  <Box mb={4}>
                    <TextField
                      id="name"
                      name="name"
                      label="Użytkownik"
                      fullWidth

                    />
                  </Box>
                  <Button
                    fullWidth
                    type="submit"
                    variant="contained"
                    color="primary"
                    className={classes.submit}
                  >
                    Rozpocznij
                  </Button>
                </form>
              )}
            </Formik>
          {user.username}
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
