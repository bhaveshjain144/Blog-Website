import React, {useState} from 'react';
import { Box, TextField, Button, styled, Typography } from '@mui/material';

const Component = styled(Box)`
    width: 400px;
    margin: auto;
    box-shadow: 5px 2px 5px 2px rgb(0 0 0/ 0.6)
`

const Image = styled('img')({
    width: 100,
    margin: 'auto',
    display: 'flex',
    padding: '50px 0 0'
});

const Wrapper = styled(Box)`
padding: 25px 35px;
display: flex;
flex: 1;
flex-direction: column;
& > div, & > button, & > p {
    margin-top: 20px;
}
`
const LoginButton = styled(Button)`
    text-transform: none;
    background: #FB641B;
    color: #fff;
    height: 48px;
    border-radius: 2px;
`

const SignupButton = styled(Button)`
    text-transform: none;
    background: #fff;
    color: #2874f0;
    height: 48px;
    font-size: 22px;
    border-radius: 2px;
    box-shadow: 0 2px 4px 0 rgb(0 0 0/ 50%)
`

const Text = styled(Typography)`
    color: #32908F;
    font-size: 18px;
`

const signupInitialValues = {
    name: '',
    username: '',
    password: ''
}
function Login() {
    
    const imageURL = 'https://www.sesta.it/wp-content/uploads/2021/03/logo-blog-sesta-trasparente.png';

    const [account, toggleAccount] = useState('login');
    const [signup, setSignup] = useState(signupInitialValues)

    const toggle = () => {
        account === 'login'?
            toggleAccount('signup')
        :
            toggleAccount('login');
    }

    const onInputChange = (e) => {
        setSignup({ ...signup, [e.target.name]: e.target.value});
    }
    return (
        <div>
            <Component>
                <Box>
                    <Image src={imageURL} alt="login" />
                    {
                        account === 'login'?
                            <Wrapper>
                                <TextField variant='standard' label="Enter username"/>
                                <TextField variant='standard' label="Enter password"/>
                                <LoginButton variant='contained'>Login</LoginButton>
                                <Text style={{ textAlign: 'center' }} >OR</Text>
                                <SignupButton onClick={() => toggle()}>Create an account</SignupButton>
                            </Wrapper>
                        :
                            <Wrapper>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='name' label="Enter Name"/>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='username' label="Enter username"/>
                                <TextField variant='standard' onChange={(e) => onInputChange(e)} name='password' label="Enter password"/>
                                <SignupButton>Signup</SignupButton>
                                <Text style={{ textAlign: 'center' }} >OR</Text>
                                <LoginButton variant='contained' onClick={() => toggle()}>Already have an account</LoginButton>
                            </Wrapper>
                    }
                </Box>
            </Component>
        </div>
    );
}

export default Login;  