import propTypes from 'prop-types'
import { useState } from 'react'
// material
import { TextField, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/lab'
// utils
import { fMonthYear } from '../../utils/formatTime'

// ----------------------------------------------------------------------

PickerMonthYear.propTypes = {
  onHandleChange: propTypes.func.isRequired,
}

export default function PickerMonthYear({ onHandleChange }) {
  const [value, setValue] = useState(new Date())

  return (
    <Stack spacing={3} direction="column" sx={{ width: '30%' }}>
      <Typography variant="body1">Chọn tháng</Typography>
      <DatePicker
        views={['year', 'month']}
        label="Tháng và năm"
        minDate={new Date('2021-01-01')}
        maxDate={new Date('2035-12-30')}
        value={value}
        onChange={(newValue) => {
          onHandleChange(fMonthYear(newValue))
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
      />
    </Stack>
  )
}
