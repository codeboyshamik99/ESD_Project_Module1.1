import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import Paper from '@mui/material/Paper';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';


const Student = () => {


  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [photoPath, setPhotoPath] = useState('');
  const [cgpa, setCGPA] = useState('');
  const [totalCredits, setTotalCredits] = useState('');
  const [graduationYear, setGraduationYear] = useState('');
  const [branch, setBranch] = useState('');
  const [students, setStudents] = useState([]);


  const handleFirstNameChange = (event) => {
    setFirstName(event.target.value);
  };

  const handleLastNameChange = (event) => {
    setLastName(event.target.value);
  };

  const handleEmailChange = (event) => {
    setEmail(event.target.value);
  };

  const handlePhotographChange = (event) => {
    const photoUrl = event.target.value;
    setPhotoPath(photoUrl);
  };
  

  const handleCGPAChange = (event) => {
    setCGPA(event.target.value);
  };

  const handleTotalCreditsChange = (event) => {
    setTotalCredits(event.target.value);
  };

  const handleGraduationYearChange = (event) => {
    setGraduationYear(event.target.value);
  };

  const handleBranchChange = (event) => {
    setBranch(event.target.value);
  };

  const generateRollNumber = () => {
    let branchCode;
    if (branch.includes("IMTech CSE")) {
      branchCode = "IMT";
    } else if (branch.includes("IMTech ECE")) {
      branchCode = "IMT";
    } else {
      branchCode = branch.replace(/\s+/g, '').toUpperCase().slice(0, 2);
    }
  
    const currentYear = new Date().getFullYear().toString().slice(0);
    const lastThreeDigits = (students.length + 1).toString().padStart(3, '0');
    return `${branchCode}${currentYear}${lastThreeDigits}`;
  };

  

  const handleClick = (e) => {
    e.preventDefault();
    const rollNumber = generateRollNumber();
    const student = {
      first_name: firstName,
      last_name: lastName,
      email,
      photoPath: photoPath, // Use the stored photo path
      cgpa,
      total_credits: totalCredits,
      graduation_year: graduationYear,
      branch,
      rollNumber,
    };
  
    console.log(student);
  
    fetch("http://localhost:8080/student/add", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(student),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Failed to add new student");
        }
        console.log("New Student added");
        return fetch("http://localhost:8080/student/getAll");
      
      })
      .then((res) => {
        if (!res.ok) {
          throw new Error("Failed to fetch updated student list");
        }
        return res.json();
      })
      .then((result) => {
        setStudents(result);
      })
      .catch((error) => {
        console.error("Error:", error.message);
      });
  };
  

  useEffect(() => {
    fetch("http://localhost:8080/student/getAll")
      .then((res) => res.json())
      .then((result) => {
        console.log("Fetched students from backend:", result);
        setStudents(result);
      })
      .catch((error) => {
        console.error("Error fetching students:", error);
      });
  }, []);

  useEffect(() => {
    console.log("Current state of students:", students);
  }, [students]);

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        minHeight: '100vh',
      }}
    >
      <Paper
        elevation={3}
        sx={{
          padding: 2,
          border: '1px solid #ced4da',
          borderRadius: '8px',
          width: '400px',
          marginBottom: '20px',
        }}
      >
        <Typography variant="h4" gutterBottom>
          <u>Add Student</u>
        </Typography>
        <form noValidate autoComplete="off">
          <TextField
            id="outlined-basic"
            label="First Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={firstName}
            onChange={handleFirstNameChange}
          />
          <TextField
            id="outlined-basic"
            label="Last Name"
            variant="outlined"
            fullWidth
            margin="normal"
            value={lastName}
            onChange={handleLastNameChange}
          />
           <TextField
           label="Photo URL"
           variant="outlined"
           fullWidth
           margin="normal"
           value={photoPath}
           onChange={handlePhotographChange}
          />
           <TextField
            id="outlined-basic"
            label="CGPA"
            variant="outlined"
            fullWidth
            margin="normal"
            value={cgpa}
            onChange={handleCGPAChange}
          />
          
          <TextField
            id="outlined-basic"
            label="Credits"
            variant="outlined"
            fullWidth
            margin="normal"
            value={totalCredits}
            onChange={handleTotalCreditsChange}
          />

          <TextField
            id="outlined-basic"
            label="Graduation Year"
            variant="outlined"
            fullWidth
            margin="normal"
            value={graduationYear}
            onChange={handleGraduationYearChange}
          />

          <Select
            id="outlined-basic"
            label="Branch"
            variant="outlined"
            value={branch}
            onChange={handleBranchChange}
            fullWidth
            margin="normal"
          >

            <MenuItem value="MTech CSE">MTech CSE</MenuItem>
            <MenuItem value="MTech ECE">MTech ECE</MenuItem>
            <MenuItem value="MS">MS</MenuItem>
            <MenuItem value="IMTech CSE">IMTech CSE</MenuItem>
            <MenuItem value="IMTech ECE">IMTech ECE</MenuItem>
            <MenuItem value="PHD">PHD</MenuItem>
          </Select>
          <Button variant="contained" color="secondary" onClick={handleClick}>
            Submit
          </Button>
        </form>
      </Paper>

      <Typography variant="h4" gutterBottom>
        <u>Students</u>
      </Typography>

      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))',
          gap: '16px',
        }}
      >
        {students.map((student) => (
          <Paper
            elevation={6}
            style={{ padding: '15px', textAlign: 'left' }}
            key={student.id}
          >
            <Typography variant="subtitle1">
              Id: {student.id}
            </Typography>
            <Typography variant="subtitle1">
              Fname: {student.first_name}
            </Typography>
            <Typography variant="subtitle1">
              Lname: {student.last_name}
            </Typography>
            <Typography variant="subtitle1">
              Branch: {student.branch}
            </Typography>
            <Typography variant="subtitle1">
              Roll Number: {student.rollNumber}
            </Typography>
            <Typography variant="subtitle1">
              CGPA: {student.cgpa}
            </Typography>
            <Typography variant="subtitle1">
              Credits: {student.total_credits}
            </Typography>
            <Typography variant="subtitle1">
              Graduation Year: {student.graduation_year}
            </Typography>
          </Paper>
        ))}
      </Box>
    </Box>
  );
};

export default Student;





