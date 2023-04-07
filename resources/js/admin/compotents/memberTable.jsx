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
    FormControl, InputLabel, NativeSelect, Grid, Stack, Snackbar, Alert
} from "@mui/material";
import {Link} from "react-router-dom";
import {Edit, Save} from "@mui/icons-material";
import {useEffect, useState} from "react";
import {getFlags} from "../api/flagApi";
import {updateFlag} from "../api/membersApi";

const MemberTable = ({items, total, currentPage, perPage, handlePage, reload}) => {

    const [selectedItem, setSelectedItem] = useState(null);
    const [selectedFlag, setSelectedFlag] = useState(null);
    const [pending, setPending] = useState(false);
    const [message, setMessage] = useState();
    const [flags, setFlags] = useState([])
    const [status, setStatus] = useState(true)

    useEffect(() => {
        loadFlagData()
    }, [])

    const loadFlagData = () => {
        getFlags().then((res) => {
            setFlags(res.data)
        })
    }

    const  handleItem = (item) => {
        setSelectedItem(item)
        handleClickScroll()
    }

    const handleClickScroll = () => {
        const element = document.getElementById('edit');
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    const sendForm = () => {
        console.log(selectedFlag)
        setPending(true)
        updateFlag(selectedItem.id, selectedFlag)
            .then((res) => {
                setMessage(res.message)
                setStatus(res.status)
                setTimeout(() => {
                    setSelectedItem(null)
                    setMessage(null)
                    reload()
                },2000)
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
                                        label={'Member'}
                                        disabled={true}
                                        defaultValue={selectedItem.name}
                                    ></TextField>
                                </FormControl>
                                <FormControl>
                                    <InputLabel variant="standard" htmlFor="uncontrolled-native">
                                        Flag
                                    </InputLabel>
                                    <NativeSelect
                                        defaultValue={selectedItem.flag_id}
                                        onChange={(e) => setSelectedFlag(e.target.value)}
                                        inputProps={{
                                            id: 'uncontrolled-native',
                                        }}
                                    >
                                        <option value={0}>seçiniz</option>
                                        {
                                            flags.map((flag) => {
                                                return (
                                                    <option key={flag.id} value={flag.id}>{flag.title}</option>
                                                )
                                            })
                                        }
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
                    <TableCell>Name</TableCell>
                    <TableCell>Email</TableCell>
                    <TableCell>Flag</TableCell>
                    <TableCell>Flag</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    items.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.name}</TableCell>
                                <TableCell>{item.email}</TableCell>
                                <TableCell>{item.flag_name}</TableCell>
                                <TableCell>

                                    <Button
                                        variant={"outlined"}
                                        startIcon={<Edit/>}
                                        size={'small'}
                                        color={'warning'}
                                        onClick={() => handleItem(item)}
                                    > Edit Flag
                                    </Button>
                                </TableCell>
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

export default MemberTable;
