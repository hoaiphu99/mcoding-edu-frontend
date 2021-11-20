import * as React from 'react'
import PropTypes from 'prop-types'
import Card from '@mui/material/Card'
import CardHeader from '@mui/material/CardHeader'
import CardContent from '@mui/material/CardContent'
import Avatar from '@mui/material/Avatar'
import Typography from '@mui/material/Typography'
import { Box } from '@mui/system'

CourseProfessorDetails.propTypes = {
  course: PropTypes.object.isRequired,
}

export default function CourseProfessorDetails({ course }) {
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
        <Typography color="text.secondary">
          Nghề nghiệp:{' '}
          {user &&
            user.jobs?.map((job) => (
              <Typography key={job.id} variant="body2" component="p" sx={{ pl: 2 }}>
                {job.job_name}
              </Typography>
            ))}
        </Typography>
        <Typography color="text.secondary">
          Kỹ năng:{' '}
          {user &&
            user.skills?.map((skill) => (
              <Typography key={skill.id} variant="body2" component="p" sx={{ pl: 2 }}>
                {skill.skill_name}
              </Typography>
            ))}
        </Typography>
      </CardContent>
    </Card>
  )
}
