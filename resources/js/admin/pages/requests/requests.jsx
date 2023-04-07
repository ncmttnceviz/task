import {
    Stack,
    Grid,
    Typography,
    Box,
    LinearProgress,
    Snackbar,
    Alert,
    TextField,
    FormControl, NativeSelect, Button
} from "@mui/material";
import {useEffect, useState} from "react";
import {filterRequests, getRequests} from "../../api/requestsApi";
import {getFlags} from "../../api/flagApi";
import {getUsers} from "../../api/usersApi";
import {Filter} from "@mui/icons-material";
import RequestsTable from "../../compotents/requestsTable";


const Requests = () => {

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [status, setStatus] = useState();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState();
    const [total, setTotal] = useState(-1)

    const [flag, setFlag] = useState(null)
    const [userId, setUserId] = useState(null)
    const [username, setUsername] = useState(null)
    const [flags, setFlags] = useState([])
    const [users, setUsers] = useState([])

    useEffect(() => {
        loadData()
        loadFlagData()
        loadUserData()
    }, [page])

    const loadFlagData = () => {
        getFlags().then((res) => {
            setFlags(res.data)
        })
    }

    const loadUserData = () => {
        getUsers().then((res) => {
            setUsers(res.data)
        })
    }


    const loadData = async () => {
        filterRequests({flag: flag, user_id: userId, username: username}, page).then((res) => {
            fillState(res)
        })
    }

    const fillState = (res) => {
        setMessage(res.message)
        setStatus(res.status)
        setItems(res.data?.requests)
        setLoading(false)
        setPerPage(res.data?.per_page)
        setTotal(res.data?.total)
    }

    const handlePage = (event, page) => {
        setPage(page + 1)
    }

    return (
        <>
            <Grid container spacing={2} marginTop={3}>
                <Grid item xs={9}>
                    <Stack direction={'row'} justifyContent={'space-between'} marginBottom={1}>
                        <Typography>Point Requests</Typography>
                    </Stack>
                    <Box sx={{width: '100%'}}>
                        {loading && <LinearProgress/>}
                    </Box>
                </Grid>
                <Grid item xs={9} marginTop={2}>
                    <Grid container>
                        <Grid item xs={2}>
                            <FormControl margin={'dense'}>
                                <NativeSelect
                                    defaultValue={flag}
                                    onChange={(e) => setFlag(e.target.value)}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={null}></option>
                                    {
                                        flags.map((flag) => {
                                            return (
                                                <option key={flag.id} value={flag.id}>{flag.title}</option>
                                            )
                                        })
                                    }
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl margin={'dense'}>
                                <NativeSelect
                                    defaultValue={userId}
                                    onChange={(e) => setUserId(e.target.value)}
                                    inputProps={{
                                        name: 'age',
                                        id: 'uncontrolled-native',
                                    }}
                                >
                                    <option value={null}></option>
                                    {
                                        users.map((user) => {
                                            return (
                                                <option key={user.id} value={user.id}>{user.name}</option>
                                            )
                                        })
                                    }
                                </NativeSelect>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl margin={'dense'}>
                                <TextField
                                    size={'small'}
                                    label={'User'}
                                    defaultValue={username}
                                    onChange={(e) => setUsername(e.target.value)}
                                ></TextField>
                            </FormControl>
                        </Grid>
                        <Grid item xs={2}>
                            <FormControl margin={'dense'}>
                                <Button
                                    variant={'outlined'}
                                    color={'primary'}
                                    startIcon={<Filter/>}
                                    onClick={() => loadData()}
                                > Filter
                                </Button>
                            </FormControl>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={9}>
                    <RequestsTable
                        items={items}
                        perPage={perPage}
                        currentPage={page}
                        handlePage={handlePage}
                        total={total}
                        reload={loadData}
                        isDetail={true}
                    />
                </Grid>
                <Snackbar open={!!message} autoHideDuration={6000}>
                    <Alert variant="filled" severity={status ? 'success' : 'error'}>
                        {message}
                    </Alert>
                </Snackbar>
            </Grid>
        </>
    )
}

export default Requests;
