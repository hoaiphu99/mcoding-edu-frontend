import propTypes from 'prop-types'
import { useState } from 'react'
// material
import { TextField, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/lab'
// utils
import { fYear } from '../../utils/formatTime'

// ----------------------------------------------------------------------

PickerYear.propTypes = {
  onHandleChange: propTypes.func.isRequired,
}

export default function PickerYear({ onHandleChange }) {
  const [value, setValue] = useState(new Date())

  return (
    <Stack spacing={3} direction="column" sx={{ width: '30%' }}>
      <Typography variant="body1">Chọn năm</Typography>
      <DatePicker
        views={['year']}
        label="Năm"
        value={value}
        onChange={(newValue) => {
          onHandleChange(fYear(newValue))
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
      />
    </Stack>
  )
}
