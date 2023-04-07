import {Alert, Box, Button, Card, CardContent, FormControl, Grid, Snackbar, TextField} from "@mui/material";
import {Send} from "@mui/icons-material";
import {useState} from "react";
import {ColorPicker} from "react-mui-color";
import {addFlag} from "../../api/flagApi";
import { useNavigate } from "react-router-dom";

const AddFlag = () => {

    const navigate = useNavigate();

    const [status, setStatus] = useState(true)
    const [pending, setPending] = useState(false)
    const [message, setMessage] = useState();
    const [errors, setErrors] = useState();
    const [title, setTitle] = useState(null);
    const [color, setColor] = useState('#ffffff');

    const sendForm = async () => {
        setPending(true)
        const res = await addFlag(title, color)
        setStatus(res.status)
        setMessage(res.message)
        setErrors(res.data)
        setPending(false)
        setInterval(() => {
            navigate('/admin/flags')
        }, 1000)
    }

    const handleColor = (arg) => {
        setColor(arg)
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
                                    label="Title"
                                    variant="filled"
                                    error={!!errors?.title}
                                    helperText={errors?.title}
                                    defaultValue={title}
                                    onChange={(e) => setTitle(e.target.value === '' ? null : e.target.value)}
                                />
                            </FormControl>
                        </Grid>
                        <Grid item xs={12} margin={3}>
                            <FormControl fullWidth>
                                <ColorPicker
                                    variant="string"
                                    color={color}
                                    colors={["#000000", "#ffffff"]}
                                    onChange={handleColor}
                                    sx={{
                                        "& #cp-predefined-root": {
                                            width: "150px",
                                        },
                                    }}
                                    initialColor={color}
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
                            >Save</Button>
                        </Grid>
                    </CardContent>
                </Card>
            </Grid>
        </Box>
    )
}

export default AddFlag;
