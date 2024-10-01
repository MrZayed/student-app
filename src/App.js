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

    const fetchAllStudents = async () => {
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

    return (
        <Container maxWidth="lg">
            <Typography variant="h4" gutterBottom align="center">
                Student Management
            </Typography>
            {error && <Typography color="error" align="center">{error}</Typography>}
            
            <Button 
                variant="contained" 
                color="primary" 
                onClick={fetchAllStudents} 
                style={{ marginBottom: '20px' }}
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
