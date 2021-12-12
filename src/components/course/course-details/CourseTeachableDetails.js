import * as React from 'react'
import PropTypes from 'prop-types'
import { Card, CardHeader, CardContent, Avatar, Typography, Stack } from '@mui/material'
import { Box } from '@mui/system'

import Label from '../../Label'

CourseTeachableDetails.propTypes = {
  course: PropTypes.object.isRequired,
}

export default function CourseTeachableDetails({ course }) {
  const { user } = course
  return (
    <Card sx={{ mt: 2, mb: 2 }}>
      <CardHeader title="Thông tin giảng viên" />
      <Box sx={{ p: 3, display: 'flex', alignItems: 'center' }}>
        <Avatar sx={{ width: 80, height: 80 }} src={user && user.avatar_url} />
        <Typography variant="h6" component="h2" sx={{ pl: 2 }}>
          {user && user.name}
        </Typography>
      </Box>
      <CardContent>
        <Stack spacing={3} direction="column">
          <Typography color="text.secondary">
            Nghề nghiệp
            <Stack spacing={2} direction="row" component="span">
              {user &&
                user.jobs?.map((job, index) => (
                  <Label key={index} variant="outlined" color="secondary">
                    {job.job_name}
                  </Label>
                ))}
            </Stack>
          </Typography>
          <Typography color="text.secondary">
            Kỹ năng
            <Stack spacing={2} direction="row" component="span">
              {user &&
                user.skills?.map((skill, index) => (
                  <Label key={index} color="primary">
                    {skill.skill_name}
                  </Label>
                ))}
            </Stack>
          </Typography>
        </Stack>
      </CardContent>
    </Card>
  )
}
