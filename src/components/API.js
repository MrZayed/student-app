const API_URL = 'http://localhost:8080/api/students';

// Function to log in and get the JWT
export const login = async (username, password) => {
    const response = await fetch('http://localhost:8080/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
        const data = await response.json();
        localStorage.setItem('jwt', data.token); // Store the JWT in localStorage
        return data.token; // Return the token if needed
    } else {
        throw new Error('Login failed');
    }
};

// Function to get the JWT from localStorage
const getJwt = () => {
    return localStorage.getItem('jwt');
};

// Fetch students with the JWT
export const getStudents = async () => {
    try {
        const response = await fetch(API_URL, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJwt()}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch students:', error);
        throw error;
    }
};

// Fetch a student by ID
export const getStudentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJwt()}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch student:', error);
        throw error;
    }
};

// Add a new student
export const addStudent = async (student) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${getJwt()}`,
            },
            body: JSON.stringify(student),
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to add student:', error);
        throw error;
    }
};

// Delete a student
export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
            headers: {
                Authorization: `Bearer ${getJwt()}`,
            },
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Failed to delete student:', error);
        throw error;
    }
};
