import PropTypes from 'prop-types'
import { Link as RouterLink } from 'react-router-dom'
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material'
import { styled } from '@mui/material/styles'
// utils
// import { fCurrency } from '../../../utils/formatNumber'
//
import Label from '../Label'
// import ColorPreview from '../../ColorPreview'

// ----------------------------------------------------------------------

const CourseImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '80%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

ShopCourseCard.propTypes = {
  course: PropTypes.object,
}

export default function ShopCourseCard({ course }) {
  const { name, image_url, status_code, slug } = course

  return (
    <Card>
      <Box sx={{ pt: '100%', position: 'relative' }}>
        {status_code && (
          <Label
            variant="filled"
            color={(status_code === 'sale' && 'error') || 'info'}
            sx={{
              zIndex: 9,
              top: 16,
              right: 16,
              position: 'absolute',
              textTransform: 'uppercase',
            }}
          >
            {status_code}
          </Label>
        )}
        <Link to={`${slug}`} color="inherit" component={RouterLink}>
          <CourseImgStyle alt={name} src={image_url} />
        </Link>
      </Box>

      <Stack spacing={2} sx={{ p: 3 }}>
        <Link to={`${slug}`} color="inherit" underline="hover" component={RouterLink}>
          <Typography variant="subtitle2" noWrap>
            {name}
          </Typography>
        </Link>

        <Stack direction="row" alignItems="center" justifyContent="space-between">
          {/* <ColorPreview colors={colors} /> */}
          <Typography variant="subtitle1">
            {/* <Typography
              component="span"
              variant="body1"
              sx={{
                color: 'text.disabled',
                textDecoration: 'line-through',
              }}
            >
              
              {priceSale && fCurrency(priceSale)}
            </Typography> */}
            {/* {fCurrency(price)} */}
            Miễn phí
          </Typography>
        </Stack>
      </Stack>
    </Card>
  )
}
