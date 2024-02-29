import axios from 'axios';

function createUserWithEmailAndPassword(email, userData, setLoading) {
    return new Promise((resolve, reject) => {
        if (!email || !userData) {
            reject(new Error("Email and password are required."));
            return;
        }
        axios.post('http://localhost:8080/api/createUser', {
            email: email,
            ...userData
        })
        .then(response => {
            setLoading(false);
            resolve(response.data);
        })
        .catch(error => {
            console.error('Error creating user:', error);
            reject(error);
        });
    });
}

function signInWithEmailAndPassword(email, password, setUser, setLoading) {
    return new Promise((resolve, reject) => {
        if (!email || !password) {
            reject(new Error("Email and password are required."));
            return;
        }
        axios.post('http://localhost:8080/api/login', {
            email: email,
            password: password
        })
        .then(response => {
            if (response?.data) {
            const userCredential = response.data;
            setLoading(false);
            resolve(userCredential);
            }
            else {
                // Handle case where response or data is undefined
                console.error('Invalid response format:', response);
                reject(new Error('Invalid response format'));
            }
        })
        .catch(error => {
            console.error('Error signing in:', error);
            reject(error);
        });
    });
}


export { createUserWithEmailAndPassword,signInWithEmailAndPassword};

