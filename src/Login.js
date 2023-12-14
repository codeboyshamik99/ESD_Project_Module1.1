
import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';

const Login = ({ handleLogin }) => {
  const [rollNumber, setRollNumber] = useState('');
  const [id, setId] = useState('');

  const handleRollNumberChange = (event) => {
    setRollNumber(event.target.value);
  };

  const handleIdChange = (event) => {
    setId(event.target.value);
  };

  const handleLoginClick = () => {
    handleLogin({ rollNumber, id });
  };

  return (
    <Paper
      elevation={3}
      style={{
        padding: '20px',
        border: '1px solid #ced4da',
        borderRadius: '8px',
        width: '300px',
        margin: 'auto',
        marginTop: '50px',
      }}
    >
      <Typography variant="h5" gutterBottom>
        Login
      </Typography>
      <form>
        <TextField
          id="rollNumber"
          label="Roll Number"
          variant="outlined"
          fullWidth
          margin="normal"
          value={rollNumber}
          onChange={handleRollNumberChange}
        />
        <TextField
          id="id"
          label="ID"
          type="password" // Assuming ID should be hidden as a password
          variant="outlined"
          fullWidth
          margin="normal"
          value={id}
          onChange={handleIdChange}
        />
        <Button
          variant="contained"
          color="primary"
          fullWidth
          onClick={handleLoginClick}
        >
          Login
        </Button>
      </form>
    </Paper>
  );
};

export default Login;
