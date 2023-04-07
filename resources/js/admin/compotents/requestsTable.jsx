import {
    Table,
    TableCell,
    TableHead,
    TableBody,
    TableRow,
    TablePagination,
    Button,
    TableFooter,
    TextField,
    FormControl, NativeSelect, Stack, Snackbar, Alert
} from "@mui/material";
import {Edit, Save} from "@mui/icons-material";
import {useState} from "react";
import {updateState} from "../api/requestsApi";

const RequestsTable = ({items, total, currentPage, perPage, handlePage, reload, isDetail}) => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState();
    const [state, setState] = useState()
    const [point, setPoint] = useState()
    const [status, setStatus] = useState(true)

    const handleItem = (item) => {
        setSelectedItem(item)
        setState(1)
        setPoint(item.desired_point)
        handleClickScroll()
    }

    const handleClickScroll = () => {
        const element = document.getElementById('edit');
        if (element) {
            element.scrollIntoView({behavior: 'smooth'});
        }
    };

    const sendForm = () => {
        setPending(true)
        updateState(selectedItem.id, point, state)
            .then((res) => {
                setMessage(res.message)
                setStatus(res.status)
                setTimeout(() => {
                    setSelectedItem(null)
                    setMessage(null)
                    reload()
                }, 2000)
            })
        setPending(false)
    }

    return (
        <Table>
            <Snackbar open={!!message} autoHideDuration={6000}>
                <Alert variant="filled" severity={status ? 'success' : 'error'}>
                    {message}
                </Alert>
            </Snackbar>
            <TableHead id={'edit'}>
                {
                    selectedItem &&
                    <TableRow>
                        <TableCell colSpan={5}>
                            <Stack direction={'row'} justifyContent={'space-between'} marginBottom={1}>
                                <FormControl>
                                    <TextField
                                        label={'Point'}
                                        defaultValue={selectedItem.desired_point}
                                        onChange={(e) => setPoint(e.target.value)}
                                    ></TextField>
                                </FormControl>
                                <FormControl>
                                    <NativeSelect
                                        onChange={(e) => setState(e.target.value)}
                                    >
                                        <option  value={1}>Approve</option>
                                        <option  value={2}>Reject</option>
                                    </NativeSelect>
                                </FormControl>
                                <FormControl>
                                    <Button
                                        disabled={pending}
                                        variant={'contained'}
                                        color={'success'}
                                        startIcon={<Save/>}
                                        onClick={() => sendForm()}
                                    >
                                        Save
                                    </Button>
                                </FormControl>
                            </Stack>
                        </TableCell>
                    </TableRow>
                }
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>User Name</TableCell>
                    <TableCell>Desired Point</TableCell>
                    {
                        isDetail ?
                        <>
                            <TableCell>Added Point</TableCell>
                            <TableCell>Admin</TableCell>
                        </> :
                            <TableCell>#</TableCell>
                    }

                </TableRow>
            </TableHead>
            <TableBody>
                {
                    items.map((item) => {
                        return (
                            <TableRow key={item.id} sx={{backgroundColor: isDetail ? '#ffffff'  : item.flag }}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.desired_point}</TableCell>
                                {
                                    isDetail === true ?
                                        <>
                                            <TableCell>{item.added_point}</TableCell>
                                            <TableCell>{item.admin}</TableCell>
                                        </> :
                                        <TableCell>

                                            <Button
                                                variant={"contained"}
                                                startIcon={<Edit/>}
                                                size={'small'}
                                                color={'primary'}
                                                onClick={() => handleItem(item)}
                                            > Actions
                                            </Button>
                                        </TableCell>
                                }
                            </TableRow>
                        )
                    })
                }
            </TableBody>

            <TableFooter>
                <TableRow>
                    <TablePagination
                        page={currentPage - 1}
                        count={total}
                        rowsPerPage={perPage}
                        onPageChange={handlePage}
                        rowsPerPageOptions={[25]}
                    />
                </TableRow>
            </TableFooter>
        </Table>
    )

}

export default RequestsTable;
