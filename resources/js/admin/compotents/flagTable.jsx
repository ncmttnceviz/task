import {Button, Table, TableCell, TableHead, TableBody, TableRow} from "@mui/material";

const FlagTable = ({data}) => {

    return (
        <Table>
            <TableHead>
                <TableRow>
                    <TableCell>Id</TableCell>
                    <TableCell>Title</TableCell>
                    <TableCell>Color</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {
                    data.map((item) => {
                        return (
                            <TableRow key={item.id}>
                                <TableCell>{item.id}</TableCell>
                                <TableCell>{item.title}</TableCell>
                                <TableCell>
                                    <Button variant={'contained'} fullWidth sx={{
                                        background: item.color_code,
                                        color: 'black'
                                    }}> {item.color_code} </Button>
                                </TableCell>
                            </TableRow>
                        )
                    })
                }
            </TableBody>
        </Table>
    )

}

export default FlagTable;
