import propTypes from 'prop-types'
import { Icon } from '@iconify/react'
import attachFill from '@iconify/icons-eva/attach-fill'
// material
import { List, ListItem, ListItemAvatar, ListItemText, Avatar, Tooltip, Link, Typography } from '@mui/material'

CourseAttachmentList.propTypes = {
  attachments: propTypes.array,
}

export default function CourseAttachmentList({ attachments }) {
  return (
    <>
      {attachments?.length <= 0 && (
        <Typography variant="body1" sx={{ mt: 1 }}>
          Không có tệp đính kèm
        </Typography>
      )}
      <List>
        {attachments.map((file) => (
          <ListItem key={file.attachment_id}>
            <ListItemAvatar>
              <Avatar>
                <Icon icon={attachFill} width={24} height={24} />
              </Avatar>
            </ListItemAvatar>
            <Tooltip title="Nhấn để tải xuống" placement="top">
              <Link href={file.file_url} underline="none" color="inherit">
                <ListItemText primary={file.file_name} />
              </Link>
            </Tooltip>
          </ListItem>
        ))}
      </List>
    </>
  )
}
