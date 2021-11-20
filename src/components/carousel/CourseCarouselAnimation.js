import Slider from 'react-slick'
import slugify from 'slugify'
import PropTypes from 'prop-types'
import { motion } from 'framer-motion'
import { useState, useRef } from 'react'
import { Link as RouterLink } from 'react-router-dom'
// material
import { alpha, useTheme, styled } from '@mui/material/styles'
import { Box, Card, Paper, Button, Typography, CardContent, Avatar, Link } from '@mui/material'
// utils
import mockData from '../../utils/mock-data'
//
import { varFadeInRight, MotionContainer } from '../animate'
import { CarouselControlsArrowsIndex } from './controls'

// ----------------------------------------------------------------------

const MOCK_CAROUSELS = [...Array(5)].map((_, index) => ({
  id: mockData.id(index),
  title: mockData.text.title(index),
  image: mockData.image.feed(index),
  description: mockData.text.description(index),
}))

const CarouselImgStyle = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
})

// ----------------------------------------------------------------------

CarouselItem.propTypes = {
  item: PropTypes.object,
  isActive: PropTypes.bool,
}

function CarouselItem({ item, isActive }) {
  const theme = useTheme()
  const { image_url, name, user } = item

  return (
    <Paper
      sx={{
        position: 'relative',
        paddingTop: { xs: '100%', md: '50%' },
      }}
    >
      <CarouselImgStyle alt={name} src={image_url} />

      <Box
        sx={{
          top: 0,
          width: '100%',
          height: '100%',
          position: 'absolute',
          backgroundImage: `linear-gradient(to top, ${theme.palette.grey[900]} 0%,${alpha(
            theme.palette.grey[900],
            0,
          )} 100%)`,
        }}
      />
      <CardContent
        sx={{
          bottom: 0,
          width: '100%',
          maxWidth: 480,
          textAlign: 'left',
          position: 'absolute',
          color: 'common.white',
        }}
      >
        <MotionContainer open={isActive}>
          <motion.div variants={varFadeInRight}>
            <Link
              to={`/khoa-hoc/${slugify(name, { lower: true, locale: 'vi' })}`}
              underline="none"
              color="inherit"
              component={RouterLink}
            >
              <Typography variant="h3" gutterBottom>
                {name}
              </Typography>
            </Link>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Avatar src={user.avatar_url} />
            <Typography variant="body2" noWrap gutterBottom>
              {user.name}
            </Typography>
          </motion.div>
          <motion.div variants={varFadeInRight}>
            <Link to={`/khoa-hoc/${slugify(name, { lower: true, locale: 'vi' })}`} component={RouterLink}>
              <Button variant="contained"> Xem thêm </Button>
            </Link>
          </motion.div>
        </MotionContainer>
      </CardContent>
    </Paper>
  )
}

CourseCarouselAnimation.propTypes = {
  course: PropTypes.array,
}

export default function CourseCarouselAnimation({ course }) {
  const theme = useTheme()
  const carouselRef = useRef()
  const [currentIndex, setCurrentIndex] = useState(theme.direction === 'rtl' ? MOCK_CAROUSELS.length - 1 : 0)

  const settings = {
    speed: 800,
    dots: false,
    arrows: false,
    autoplay: true,
    slidesToShow: 1,
    slidesToScroll: 1,
    rtl: Boolean(theme.direction === 'rtl'),
    beforeChange: (current, next) => setCurrentIndex(next),
  }

  const handlePrevious = () => {
    carouselRef.current.slickPrev()
  }

  const handleNext = () => {
    carouselRef.current.slickNext()
  }

  return (
    <Card sx={{ mb: 2 }}>
      <Slider ref={carouselRef} {...settings}>
        {course.map((item, index) => {
          if (item.status_code === 'PUB') {
            return <CarouselItem key={item.course_id} item={item} isActive={index === currentIndex} />
          }
          return null
        })}
      </Slider>

      <CarouselControlsArrowsIndex
        index={currentIndex}
        total={course.length}
        onNext={handleNext}
        onPrevious={handlePrevious}
      />
    </Card>
  )
}
