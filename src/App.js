// src/App.js

import React, { useState } from 'react';
import {
    Button,
    Container,
    Typography,
    TextField,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Paper,
    Grid,
} from '@mui/material';
import { getStudents, addStudent, deleteStudent } from './components/API';

const App = () => {
    const [students, setStudents] = useState([]);
    const [newStudent, setNewStudent] = useState({ name: '', email: '', age: '' });
    const [error, setError] = useState(null);
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [showLoginFields, setShowLoginFields] = useState(false); // New state for showing login fields


    const isAuthenticated = () => {
        return !!localStorage.getItem('jwt'); // Check if JWT exists
    };

    const fetchAllStudents = async () => {
        if (!isAuthenticated){
            setError("sorry , you should login firstly!")
            return;
        }
        try {
            const data = await getStudents();
            setStudents(data);
            setError(null);
        } catch (error) {
            setError('Error fetching students');
        }
    };

    const handleAddStudent = async () => {
        try {
            await addStudent(newStudent);
            setNewStudent({ name: '', email: '', age: '' }); // Clear input fields
            fetchAllStudents(); // Refresh the student list
        } catch (error) {
            setError('Error adding student');
        }
    };

    const handleDeleteStudent = async (id) => {
        try {
            await deleteStudent(id);
            fetchAllStudents(); // Refresh the student list
        } catch (error) {
            setError('Error deleting student');
        }
    };

    const login = async () => {
        try {
            const response = await fetch('http://localhost:8080/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            });

            if (response.ok) {
                const data = await response.json();
                localStorage.setItem('jwt', data.token); // Store the token
                setError(null);
                fetchAllStudents(); // Fetch students after successful login
            } else {
                setError('Login failed. Please check your credentials.');
            }
        } catch (error) {
            setError('Error during login');
        }
    };

    const handleLoginClick = () => {
        setShowLoginFields(true); // Show login fields when button is clicked
    };

    return (
        <Container maxWidth="lg">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <Typography variant="h4" gutterBottom>
                    Student Management
                </Typography>
                <Button 
                    variant="contained" 
                    color="primary" 
                    onClick={handleLoginClick} // Show login fields
                >
                    Login
                </Button>
            </div>

            {error && <Typography color="error" align="center">{error}</Typography>}

            {showLoginFields && (
                <Grid container spacing={2} justifyContent="center" alignItems="center">
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Username"
                            variant="outlined"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12} sm={4}>
                        <TextField
                            label="Password"
                            type="password"
                            variant="outlined"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            fullWidth
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <Button 
                            variant="contained" 
                            color="primary" 
                            onClick={login} 
                            style={{ marginTop: '20px' }}
                        >
                            Submit
                        </Button>
                    </Grid>
                </Grid>
            )}

            <Button 
                variant="contained" 
                color="primary" 
                onClick={fetchAllStudents} 
                style={{ marginBottom: '20px', marginTop: '20px' }}
            >
                Fetch All Students
            </Button>

            <Typography variant="h6" gutterBottom align="center">
                Add a New Student
            </Typography>

            <Grid container spacing={2} justifyContent="center" alignItems="center">
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Name"
                        variant="outlined"
                        value={newStudent.name}
                        onChange={(e) => setNewStudent({ ...newStudent, name: e.target.value })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Email"
                        variant="outlined"
                        value={newStudent.email}
                        onChange={(e) => setNewStudent({ ...newStudent, email: e.target.value })}
                        fullWidth
                    />
                </Grid>
                <Grid item xs={12} sm={4}>
                    <TextField
                        label="Age"
                        variant="outlined"
                        value={newStudent.age}
                        onChange={(e) => setNewStudent({ ...newStudent, age: e.target.value })}
                        fullWidth
                    />
                </Grid>
            </Grid>
            <Button 
                variant="contained" 
                color="primary" 
                onClick={handleAddStudent} 
                style={{ marginTop: '20px' }}
            >
                Add Student
            </Button>

            {students.length > 0 && (
                <TableContainer component={Paper} style={{ marginTop: '20px' }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>Name</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>Age</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {students.map((student) => (
                                <TableRow key={student.id}>
                                    <TableCell>{student.name}</TableCell>
                                    <TableCell>{student.email}</TableCell>
                                    <TableCell>{student.age}</TableCell>
                                    <TableCell>
                                        <Button 
                                            variant="contained" 
                                            color="secondary" 
                                            onClick={() => handleDeleteStudent(student.id)}
                                        >
                                            Delete
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            )}
        </Container>
    );
};

export default App;
