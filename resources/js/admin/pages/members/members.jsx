import {Stack, Grid, Typography, Box, LinearProgress, Snackbar, Alert, Table} from "@mui/material";
import {useEffect, useState} from "react";
import {getMembers} from "../../api/membersApi";
import MemberTable from "../../compotents/memberTable";


const Members = () => {

    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [perPage, setPerPage] = useState(25);
    const [status, setStatus] = useState();
    const [items, setItems] = useState([]);
    const [message, setMessage] = useState();
    const [total, setTotal] = useState(-1)

    useEffect( () => {
        loadData()
    },[page])

    const  loadData = async () => {
        getMembers(page).then((res) => {
            setMessage(res.message)
            setStatus(res.status)
            setItems(res.data?.members)
            setLoading(false)
            setPerPage(res.data?.per_page)
            setTotal(res.data?.total)
        })
    }

    const handlePage = (event ,page) => {
        setPage(page + 1)
    }

    return (
        <>
            <Grid container spacing={2} marginTop={3}>
                <Grid item xs={9}>
                    <Stack direction={'row'} justifyContent={'space-between'} marginBottom={1}>
                        <Typography>Members</Typography>
                    </Stack>
                    <Box sx={{width: '100%'}}>
                        {loading && <LinearProgress/>}
                    </Box>
                </Grid>
                <Grid item xs={9}>
                    <MemberTable
                    items={items}
                    perPage={perPage}
                    currentPage={page}
                    handlePage={handlePage}
                    total={total}
                    reload={loadData}
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

export default Members;
