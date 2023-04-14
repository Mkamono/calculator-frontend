import React, { ChangeEvent, useState } from 'react'
import { TextField, Box, Container, Link, Typography } from '@mui/material'
import ApiInfoDialog from '@/components/dialog'
import Title from '@/components/Title'
import { parseIndex, isAlphabetOnly } from '@/hooks/myfunc'
import { fetchResult, RequestData, ResponseData } from '@/pages/api/calculator'

const defaultValue = {
  formula: "20nm/(4ms**2)",
  result: '5.000000×10⁻³ m/s²',
  units: ['m', 's'],
  all_units: ['m', '/', 's', '²'],
  error: '',
}

const Boxsx = {
  m: 4,
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
}

export default function App() {
  // define state
  const [responseData, setResponseData] = useState<ResponseData>({ ...defaultValue })
  const [requestData, setRequestData] = useState<RequestData>({
    formula: defaultValue.formula,
    all_units: defaultValue.all_units,
  })
  const [allUnits, setAllUnits] = useState<string[]>(defaultValue.all_units)


  // define handler
  const handleFormulaChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setRequestData({ formula: value, all_units: [] })
    fetchResult(false, { ...requestData, [name]: value }).then((responseData) => {
      setResponseData(responseData)
      setAllUnits(responseData.all_units)
    })
  }

  const handleUnitsChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    const index = parseIndex(name);

    const NewAllUnits = [...allUnits]
    NewAllUnits[index] = value
    setAllUnits(NewAllUnits)
  }

  const handleUnitsSubmit = () => {
    setRequestData({ ...requestData, all_units: allUnits })
    fetchResult(true, { ...requestData, all_units: allUnits }).then((responseData) => {
      setResponseData(responseData);
    })
  }

  return (
    <Box>
      <Container maxWidth="lg">
        <Box
          sx={{ ...Boxsx, flexDirection: 'column' }}>
          <Title />
          <TextField fullWidth sx={{ m: 4 }} inputProps={{ style: { textAlign: 'center' } }} label="Formula" name='formula' onChange={handleFormulaChange} value={requestData.formula} />
          <Typography variant="h4">{responseData.result}</Typography>
          <Typography variant="h4" color="red">{responseData.error}</Typography>
          <Box sx={{ ...Boxsx, width: '100%' }}>
            {allUnits.map((item, index) => {
              return (
                isAlphabetOnly(responseData.all_units[index]) ?
                  <TextField
                    key={index}
                    sx={{ m: 1, width: '10ch' }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    name={`all_units[${index}]`}
                    onChange={handleUnitsChange}
                    value={item}
                    onKeyPress={e => {
                      if (e.key === 'Enter') {
                        handleUnitsSubmit()
                      }
                    }}
                  /> :
                  <TextField
                    disabled
                    key={index}
                    sx={{ m: 1, width: '5ch' }}
                    inputProps={{ style: { textAlign: 'center' } }}
                    name={`all_units[${index}]`}
                    value={item}
                  />
              );
            })
            }
          </Box>
          <ApiInfoDialog requestData={requestData} responseData={responseData} />
          <Link href="https://github.com/Mkamono?tab=repositories">
            see my github repository here !
          </Link>
        </Box>
      </Container >
    </Box >
  )
}