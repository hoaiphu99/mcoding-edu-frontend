import propTypes from 'prop-types'
import { useState } from 'react'
// material
import { Stack, MenuItem, TextField, Button } from '@mui/material'
import { DatePicker } from '@mui/lab'
// utils
import { fYear } from '../../utils/formatTime'
// ----------------------------------------------------------------------

const QUARTER = [
  { value: '1', label: 'Quý 1' },
  { value: '2', label: 'Quý 2' },
  { value: '3', label: 'Quý 3' },
  { value: '4', label: 'Quý 4' },
]

// ----------------------------------------------------------------------

PickerQuarterYear.propTypes = {
  onHandleChange: propTypes.func.isRequired,
}

export default function PickerQuarterYear({ onHandleChange }) {
  const [quarter, setQuarter] = useState('1')
  const [value, setValue] = useState(new Date())

  const handleChangeQuarter = (event) => {
    setQuarter(event.target.value)
  }

  return (
    <Stack spacing={3} direction={{ xs: 'column', md: 'row' }}>
      <TextField select label="Chọn quý" value={quarter} onChange={handleChangeQuarter}>
        {QUARTER.map((option) => (
          <MenuItem key={option.value} value={option.value}>
            {option.label}
          </MenuItem>
        ))}
      </TextField>
      <DatePicker
        views={['year']}
        label="Năm"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} margin="normal" helperText={null} />}
      />
      <Button
        onClick={() => {
          const data = {
            quarter,
            year: fYear(value),
          }

          onHandleChange(data)
        }}
        variant="contained"
      >
        Xem
      </Button>
    </Stack>
  )
}
