import PropTypes from 'prop-types'
// material
import { Box, List } from '@mui/material'
//
import CourseCommentItem from './CourseCommentItem'

// ----------------------------------------------------------------------

CourseCommentList.propTypes = {
  comments: PropTypes.array.isRequired,
}

export default function CourseCommentList({ comments }) {
  return (
    <List disablePadding>
      {comments.map((comment) => {
        const { comment_id, content, created_at, student } = comment

        return (
          <Box key={comment_id} sx={{}}>
            <CourseCommentItem
              name={student.name}
              avatarUrl={student.avatar_url}
              postedAt={created_at}
              message={content}
            />
          </Box>
        )
      })}
    </List>
  )
}
