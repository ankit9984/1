import Cookies from 'js-cookie';

const signup = async (username, email, password, setUser) => {
    try {
        const response = await fetch('http://localhost:3000/api/auth/register', {
            method: "POST",
            headers: {
                'Content-Type' : 'application/json',
            },
            body: JSON.stringify({username, email, password}),
        });
        const data = await response.json();
        if(response.ok){
            console.log('Signup successfull: ', data);
        }else{
            console.error('Signup failed: ', data.error);
        }
    } catch (error) {
        console.error('Signup failed: ', error);
    }
};

const login = async (username, password, setUser) => {
    console.log(username);
    console.log(password);
    try {
        const response = await fetch('http://localhost:3000/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({username, password}),
        });
        const data = await response.json();
        console.log(data.user);
        if(response.ok){
            Cookies.set('authToken', data.token);
            setUser(data.user)
        }else{
            console.error('Login failed: ', data.error);
        }
    } catch (error) {
        console.error('Login failed: ', error);
    }
}

export {
    signup,
    login
}