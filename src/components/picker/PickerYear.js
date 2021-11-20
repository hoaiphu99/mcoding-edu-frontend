import { useState } from 'react'
// material
import { TextField, Stack, Typography } from '@mui/material'
import { DatePicker } from '@mui/lab'
// utils
import { fYear } from '../../utils/formatTime'
// ----------------------------------------------------------------------

export default function PickerYear() {
  const [value, setValue] = useState(new Date())
  console.log('🚀 ~ file: pickerYear.js ~ line 11 ~ PickerYear ~ value', fYear(value))

  return (
    <Stack spacing={3} direction="column" sx={{ width: '30%' }}>
      <Typography variant="body1">Chọn năm</Typography>
      <DatePicker
        views={['year']}
        label="Năm"
        value={value}
        onChange={(newValue) => {
          setValue(newValue)
        }}
        renderInput={(params) => <TextField {...params} fullWidth margin="normal" helperText={null} />}
      />
    </Stack>
  )
}
