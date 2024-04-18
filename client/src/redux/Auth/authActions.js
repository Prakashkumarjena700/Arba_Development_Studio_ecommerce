import { loginStart, loginSuccess, loginFailure, registerStart, registerSuccess, registerFailure } from './authSlice';

export const login = (userName, password) => async (dispatch) => {
    dispatch(loginStart());
    try {

        console.log(userName, password);

        //   const response = await fetch('/api/login', {
        //     method: 'POST',
        //     body: JSON.stringify({ userName, password }),
        //     headers: {
        //       'Content-Type': 'application/json',
        //     },
        //   });
        //   const data = await response.json();
        //   if (!response.ok) {
        //     throw new Error(data.message || 'Login failed.');
        //   }
        //   dispatch(loginSuccess({ user: data.user, token: data.token }));
    } catch (error) {
        dispatch(loginFailure(error.message));
    }
};

export const register = (userData) => async (dispatch) => {
    dispatch(registerStart());
    try {
        const response = await fetch('/api/register', {
            method: 'POST',
            body: JSON.stringify(userData),
            headers: {
                'Content-Type': 'application/json',
            },
        });
        const data = await response.json();
        if (!response.ok) {
            throw new Error(data.message || 'Registration failed.');
        }
        dispatch(registerSuccess({ user: data.user, token: data.token }));
    } catch (error) {
        dispatch(registerFailure(error.message));
    }
};
