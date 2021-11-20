import PropTypes from 'prop-types'
import { Icon } from '@iconify/react'
import { useRef, useState } from 'react'
import editFill from '@iconify/icons-eva/edit-fill'
import trash2Outline from '@iconify/icons-eva/trash-2-outline'
import moreVerticalFill from '@iconify/icons-eva/more-vertical-fill'
import bookOpenFill from '@iconify/icons-eva/book-open-fill'
import attachFill from '@iconify/icons-eva/attach-fill'
// material
import { Menu, MenuItem, IconButton, ListItemIcon, ListItemText } from '@mui/material'

// ----------------------------------------------------------------------

CourseMoreMenu.propTypes = {
  onDelete: PropTypes.func,
  onOpen: PropTypes.func,
  onOpenSection: PropTypes.func,
  onOpenAttach: PropTypes.func,
  onEdit: PropTypes.func,
  isLesson: PropTypes.bool,
}

export default function CourseMoreMenu({ onDelete, onOpen, onOpenSection, onOpenAttach, onEdit, isLesson }) {
  const ref = useRef(null)
  const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <IconButton ref={ref} onClick={() => setIsOpen(true)}>
        <Icon icon={moreVerticalFill} width={20} height={20} />
      </IconButton>

      <Menu
        open={isOpen}
        anchorEl={ref.current}
        onClose={() => setIsOpen(false)}
        PaperProps={{
          sx: { width: 220, maxWidth: '100%' },
        }}
        anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {!isLesson && (
          <MenuItem onClick={onOpen} sx={{ color: 'text.secondary' }}>
            <ListItemIcon>
              <Icon icon={bookOpenFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Bài học mới" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        {isLesson && (
          <MenuItem onClick={onOpenAttach}>
            <ListItemIcon>
              <Icon icon={attachFill} width={24} height={24} />
            </ListItemIcon>
            <ListItemText primary="Quản lý tệp đính kèm" primaryTypographyProps={{ variant: 'body2' }} />
          </MenuItem>
        )}

        <MenuItem
          onClick={() => {
            if (!isLesson) {
              onOpenSection()
            } else {
              onOpen()
            }
            onEdit()
          }}
          sx={{ color: 'text.secondary' }}
        >
          <ListItemIcon>
            <Icon icon={editFill} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Sửa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>

        <MenuItem onClick={onDelete} sx={{ color: 'red' }}>
          <ListItemIcon>
            <Icon icon={trash2Outline} width={24} height={24} />
          </ListItemIcon>
          <ListItemText primary="Xóa" primaryTypographyProps={{ variant: 'body2' }} />
        </MenuItem>
      </Menu>
    </>
  )
}
