// src/components/API.js

const API_URL = 'http://localhost:8080/api/students'; // Your Spring Boot backend URL

export const getStudents = async () => {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch students:', error);
        throw error;
    }
};

export const getStudentById = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`); // Fetch by ID
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Failed to fetch student:', error);
        throw error;
    }
};

export const addStudent = async (student) => {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

export const deleteStudent = async (id) => {
    try {
        const response = await fetch(`${API_URL}/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) {
            throw new Error(`Error: ${response.statusText}`);
        }
    } catch (error) {
        console.error('Failed to delete student:', error);
        throw error;
    }
};
