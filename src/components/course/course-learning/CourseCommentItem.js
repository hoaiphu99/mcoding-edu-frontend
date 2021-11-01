import PropTypes from 'prop-types'
// material
import { Avatar, Divider, ListItem, Typography, ListItemText, ListItemAvatar } from '@mui/material'
// utils
import { fDate } from '../../../utils/formatTime'

// ----------------------------------------------------------------------

CourseCommentItem.propTypes = {
  name: PropTypes.string,
  avatarUrl: PropTypes.string,
  message: PropTypes.string,
  postedAt: PropTypes.string,
}

export default function CourseCommentItem({ name, avatarUrl, message, postedAt }) {
  return (
    <>
      <ListItem
        disableGutters
        sx={{
          alignItems: 'flex-start',
          py: 3,
        }}
      >
        <ListItemAvatar>
          <Avatar alt={name} src={avatarUrl} sx={{ width: 48, height: 48 }} />
        </ListItemAvatar>

        <ListItemText
          primary={name}
          primaryTypographyProps={{ variant: 'subtitle1' }}
          secondary={
            <>
              <Typography
                gutterBottom
                variant="caption"
                sx={{
                  display: 'block',
                  color: 'text.disabled',
                }}
              >
                {fDate(postedAt)}
              </Typography>
              <Typography component="span" variant="body2">
                {message}
              </Typography>
            </>
          }
        />
      </ListItem>

      <Divider
        sx={{
          ml: 'auto',
          width: (theme) => `calc(100% - ${theme.spacing(7)})`,
        }}
      />
    </>
  )
}
