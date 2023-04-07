import {
    Box,
    Card,
    CardContent,
    FormControl,
    Grid,
    TextField,
    Button, Snackbar, Alert
} from "@mui/material";
import {Send} from "@mui/icons-material";
import {useState} from "react";
import {signin} from "../api/authApi";
import {useNavigate} from 'react-router-dom';

const Login = () => {

    const navigate = useNavigate();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState()
    const [errors, setErrors] = useState()
    const [message, setMessage] = useState()
    const [pending, setPending] = useState(false)
    const [status, setStatus] = useState()

    const sendForm = async () => {
        setPending(true)
        const response = await signin(email, password)
        setErrors(response.status ? [] : response.data)
        setMessage(response.message)
        setStatus(response.status)
        setPending(false)

        if (response.status) {
            console.log(1)
            setTimeout(() => {
                navigate('/panel');
            }, 1000)
        }
    }


    return (
        <Box flexDirection={'row'} height={'100%'}>
            <Grid
                style={{height: '100%'}}
                container
                alignItems={'center'}
                justifyContent={'center'}
            >
                <Card sx={{minWidth: 350}}>
                    <CardContent>
                        <Snackbar open={!!message} autoHideDuration={6000}>
                            <Alert variant="filled" severity={status ? 'success' : 'error'}>
                                {message}
                            </Alert>
                        </Snackbar>
                        <Grid item xs={12} margin={3}>
                            <FormControl variant={"standard"} fullWidth>
                                <TextField
                                    label="Email"
                                    variant="filled"
                                    error={!!errors?.email}
                                    helperText={errors?.email}
                                    defaultValue={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <FormControl fullWidth>
                                <TextField
                                    label="Password"
                                    type={'password'}
                                    variant="filled"
                                    error={!!errors?.password}
                                    helperText={errors?.password}
                                    defaultValue={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item margin={5}>
                            <Button
                                disabled={pending}
                                variant={'contained'}
                                fullWidth
                                endIcon={<Send/>}
                                onClick={() => sendForm()}
                            >Login</Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}

export default Login;
