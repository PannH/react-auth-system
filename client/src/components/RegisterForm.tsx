import { useState, useEffect } from 'react'
import { useMutation } from 'react-query';
import axios, { AxiosResponse } from 'axios';
import '../styles/RegisterForm.css'

const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-_]).{8,32}$/;

// Create an account
async function createAccount(username: string, password: string): Promise<AxiosResponse> {

   const res = await axios.post('http://localhost:1234/create-account', { username, password });

   if (res.data.error)
      throw Error(res.data.error);
   else
      return res;

}

function RegisterForm() {

   // Mutation hook
   const accountMutation = useMutation((accountCredentials: {username: string, password: string }) => {
      return createAccount(accountCredentials.username, accountCredentials.password);
   });

   // State hooks
   const [ username, setUsername ] = useState('');
   const [ password, setPassword ] = useState('');
   const [ errorMessage, setErrorMessage ] = useState('');
   const [ successMessage, setSucessMessage ] = useState('');

   // Username and password update
   const updateUsername = (e: any) => {
      setUsername(e.target.value);
      setSucessMessage('');
   }

   const updatePassword = (e: any) => {
      setPassword(e.target.value);
      setSucessMessage('');
   }

   // Username and password verification
   useEffect(() => {

      const isUsernameValid = username.length >= 3 && username.length <= 32;

      if (!isUsernameValid && username !== '')
         setErrorMessage('The username must be between 3 and 32 characters long.');
      else
         setErrorMessage('');

   }, [username])

   useEffect(() => {

      const isPasswordValid = !!password.match(PASSWORD_REGEX)

      if (!isPasswordValid && password !== '')
         setErrorMessage('The password must contain at least: one lowercase letter, one uppercase letter, one number, one special character and be between 8 and 32 characters long.');
      else
         setErrorMessage('');

   }, [password])

   // Form Submit
   const handleFormSubmit = async (e: any) => {

      e.preventDefault();

      setUsername('');
      setPassword('');

      accountMutation.mutate({ username, password }, {
         onError: (err: any) => setErrorMessage(err.message),
         onSuccess: () => setSucessMessage('Your account has been successfully created.')
      });

   }

   // JSX
   return (
      <form className='register-form' onSubmit={handleFormSubmit}>
         <h1>Register</h1>
         <div className='input-container'>
            <label><i className="fa-solid fa-hashtag"></i> Username</label>
            <input onChange={updateUsername} value={username} required={true} type='text' placeholder='Username'/>
         </div>
         <div className='input-container'>
            <label><i className="fa-solid fa-hashtag"></i> Password</label>
            <input onChange={updatePassword}  value={password} required={true} type='password' placeholder='Password'/>
         </div>
         { errorMessage
            ? <span className='error-message'><i className='fa-solid fa-triangle-exclamation'></i> {errorMessage}</span>
            : null }
         { successMessage
            ? <span className='success-message'><i className='fa-solid fa-thumbs-up'></i> {successMessage}</span>
            : null }
         { accountMutation.isLoading
            ? <span className='loading-message'><i className='fa-solid fa-rotate'></i> Creating your account...</span>
            : null }
         <button disabled={!!errorMessage} type='submit' className='register-button'>
            <i className='fa-solid fa-user-plus'></i> Register
         </button>
      </form>
   )
}

export default RegisterForm;