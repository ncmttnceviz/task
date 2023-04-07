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
import {makePointRequest} from "../api/pointRequestApi";

const Panel = () => {
    const [point, setPoint] = useState();
    const [errors, setErrors] = useState()
    const [message, setMessage] = useState()
    const [pending, setPending] = useState(false)
    const [status, setStatus] = useState()

    const sendForm = async () => {
        setPending(true)
        await makePointRequest(point).then((res) => {
            setErrors(res.status ? [] : res.data)
            setMessage(res.message)
            setStatus(res.status)
        })
        setPending(false)
        setTimeout(() => {
            setErrors([])
            setMessage()
            setPoint()
        }, 2000)
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
                        <Grid item xs={12} margin={3}  >
                            <FormControl variant={"standard"} fullWidth>
                                <TextField
                                    label="Point"
                                    variant="filled"
                                    type={'number'}
                                    error={!!errors?.point}
                                    helperText={errors?.point}
                                    defaultValue={point}
                                    onChange={(e) => setPoint(e.target.value)}
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
                            >Request</Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}

export default Panel;
