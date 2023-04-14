import { Box, Typography, Table, TableBody, TableCell, TableRow, Dialog, Button } from '@mui/material'
import { RequestData, ResponseData } from '../pages/api/calculator'
import { useState } from 'react'

type Props = {
  requestData: RequestData
  responseData: ResponseData
}

export default function ApiInfoDialog(props: Props) {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const { requestData, responseData } = props
  return (
    <>
      <Button variant="contained" onClick={handleClickOpen}>Api Details</Button>
      <Dialog open={open} onClose={handleClose}>
        <Box sx={{ m: 4, width: 'auto' }}>
          <Typography variant="h4">
            RequestData
          </Typography>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Formula</TableCell>
                <TableCell>{requestData.formula}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>All Units</TableCell>
                <TableCell>{requestData.all_units.join(", ")}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
        <Box sx={{ m: 4, width: 'auto' }}>
          <Typography variant="h4">
            ResponseData
          </Typography>
          <Table aria-label="simple table">
            <TableBody>
              <TableRow>
                <TableCell>Formula</TableCell>
                <TableCell>{responseData.formula}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Result</TableCell>
                <TableCell>{responseData.result}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Units</TableCell>
                <TableCell>{responseData.units.join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>All Units</TableCell>
                <TableCell>{responseData.all_units.join(", ")}</TableCell>
              </TableRow>
              <TableRow>
                <TableCell>Error</TableCell>
                <TableCell>{responseData.error}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </Box>
      </Dialog>
    </>
  )
}

