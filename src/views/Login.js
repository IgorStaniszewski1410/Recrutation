import React, {useState, useEffect} from 'react';
import {useDispatch, useSelector } from 'react-redux';
import Avatar from '@material-ui/core/Avatar';
import {Box} from '@material-ui/core'
import CssBaseline from '@material-ui/core/CssBaseline';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import EmojiEmotionsSharp from '@material-ui/icons/EmojiEmotionsSharp';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import {login} from '../store/user.js'

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
    width: '200px', // Fix IE 11 issue.
    marginTop: theme.spacing(2),
    maxHeight: '90px',
  },
  label: {
    maxHeight: '100px;'
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

const Login = (props) => {
  const classes = useStyles();
  const dispatch = useDispatch();
  const userData = useSelector(state => state);
  const [userName, setUserName] = useState('');

  useEffect(() => {
    if (userData?.user.isLogged) {
      props.history.push('/dashboard')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userData?.user.isLogged]);

  const handleSubmit = () => {
    dispatch(login({username: userName}))
  };

  const handleChange = (e) => {
    setUserName(e.target.value)
  };

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
          <form className={classes.form}>
            <Box>
              <TextField
                id="name"
                value={userName}
                name="name"
                label="Użytkownik"
                fullWidth
                onChange={handleChange}
              />
            </Box>
            <Button
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              onClick={handleSubmit}
            >
              Rozpocznij
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default Login;
