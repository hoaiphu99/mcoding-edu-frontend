import PropTypes from 'prop-types'
import { useState } from 'react'
import { NavLink as RouterLink } from 'react-router-dom'
import { Icon } from '@iconify/react'
import chevronDownFill from '@iconify/icons-eva/chevron-down-fill'
// material
import { Box, Link, Paper, Typography, Stack } from '@mui/material'
//

// ----------------------------------------------------------------------

// const CONTENT_HEIGHT = 300
const ITEM_SPACING = 4
const ITEM_HEIGHT = 64
// const ITEM_ON_ROW = {
//   width: 'calc((100%/1) - 16px)',
//   '&:nth-of-type(3n+1)': { order: 1 },
//   '&:nth-of-type(3n+2)': { order: 2 },
//   '&:nth-of-type(3n)': { order: 3 },
// }

// ----------------------------------------------------------------------

ParentItem.propTypes = {
  path: PropTypes.string,
  title: PropTypes.string,
  open: PropTypes.bool,
  hasSub: PropTypes.bool,
}

function ParentItem({ path, title, open, hasSub, ...other }) {
  const activeStyle = {
    color: 'primary.main',
  }

  return (
    <Link
      to={path}
      component={RouterLink}
      underline="none"
      color="text.primary"
      variant="subtitle2"
      sx={{
        display: 'flex',
        cursor: 'pointer',
        alignItems: 'center',
        textTransform: 'capitalize',
        height: ITEM_HEIGHT,
        lineHeight: `${ITEM_HEIGHT}px`,
        transition: (theme) => theme.transitions.create('all'),
        '&:hover': activeStyle,
        ...(open && activeStyle),
      }}
      {...other}
    >
      {title}
      {hasSub && <Box component={Icon} icon={chevronDownFill} sx={{ ml: 1, width: 20, height: 20 }} />}
    </Link>
  )
}

MegaMenuItem.propTypes = {
  parent: PropTypes.object,
}

function MegaMenuItem({ parent }) {
  const { title, path, children } = parent
  const [open, setOpen] = useState(false)

  const handleOpen = () => {
    setOpen(true)
  }

  const handleClose = () => {
    setOpen(false)
  }

  if (children) {
    return (
      <>
        <ParentItem onMouseEnter={handleOpen} onMouseLeave={handleClose} path={path} title={title} open={open} hasSub />

        {open && (
          <Paper
            onMouseEnter={handleOpen}
            onMouseLeave={handleClose}
            sx={{
              p: 3,
              width: '20%',
              position: 'absolute',
              borderRadius: 2,
              top: ITEM_HEIGHT,
              zIndex: (theme) => theme.zIndex.modal,
              boxShadow: (theme) => theme.customShadows.z20,
            }}
          >
            <Stack alignContent="space-between" height="auto">
              {children.map((list) => {
                const { subheader, items } = list

                return (
                  <Stack key={subheader} spacing={1.25} sx={{ mb: 2.5 }}>
                    <Typography variant="subtitle1" sx={{ fontWeight: 'fontWeightBold' }}>
                      {subheader}
                    </Typography>
                    {items.map((link) => (
                      <Link
                        key={link.title}
                        component={RouterLink}
                        to={link.path}
                        underline="none"
                        sx={{
                          typography: 'body2',
                          color: 'text.primary',
                          fontSize: 13,
                          transition: (theme) => theme.transitions.create('all'),
                          '&:hover': { color: 'primary.main' },
                        }}
                      >
                        {link.title}
                      </Link>
                    ))}
                  </Stack>
                )
              })}
            </Stack>
          </Paper>
        )}
      </>
    )
  }

  return <ParentItem path={path} title={title} />
}

MegaMenuDesktopHorizon.propTypes = {
  navConfig: PropTypes.array,
}

export default function MegaMenuDesktopHorizon({ navConfig, ...other }) {
  return (
    <Stack direction="row" spacing={ITEM_SPACING} {...other}>
      {navConfig.map((parent) => (
        <MegaMenuItem key={parent.title} parent={parent} />
      ))}
    </Stack>
  )
}

// import PropTypes from 'prop-types'
// import { Icon } from '@iconify/react'
// import { motion } from 'framer-motion'
// import { useState, useEffect } from 'react'
// import { NavLink as RouterLink, useLocation } from 'react-router-dom'
// import arrowIosUpwardFill from '@iconify/icons-eva/arrow-ios-upward-fill'
// import arrowIosDownwardFill from '@iconify/icons-eva/arrow-ios-downward-fill'
// // material
// import { styled } from '@mui/material/styles'
// import { Box, Link, Grid, List, Stack, Popover, ListItem, ListSubheader, CardActionArea } from '@mui/material'

// // ----------------------------------------------------------------------

// const LinkStyle = styled(Link)(({ theme }) => ({
//   ...theme.typography.subtitle2,
//   color: theme.palette.text.primary,
//   marginRight: theme.spacing(5),
//   transition: theme.transitions.create('opacity', {
//     duration: theme.transitions.duration.shortest,
//   }),
//   '&:hover': {
//     opacity: 0.48,
//     textDecoration: 'none',
//   },
// }))

// const ListItemStyle = styled(ListItem)(({ theme }) => ({
//   ...theme.typography.body2,
//   padding: 0,
//   marginTop: theme.spacing(3),
//   color: theme.palette.text.secondary,
//   transition: theme.transitions.create('color'),
//   '&:hover': {
//     color: theme.palette.text.primary,
//   },
// }))

// // ----------------------------------------------------------------------

// IconBullet.propTypes = {
//   type: PropTypes.oneOf(['subheader', 'item']),
// }

// function IconBullet({ type = 'item' }) {
//   return (
//     <Box sx={{ width: 24, height: 16, display: 'flex', alignItems: 'center' }}>
//       <Box
//         component="span"
//         sx={{
//           ml: '2px',
//           width: 4,
//           height: 4,
//           borderRadius: '50%',
//           bgcolor: 'currentColor',
//           ...(type !== 'item' && { ml: 0, width: 8, height: 2, borderRadius: 2 }),
//         }}
//       />
//     </Box>
//   )
// }

// MenuDesktopItem.propTypes = {
//   item: PropTypes.object,
//   isHome: PropTypes.bool,
//   isOffset: PropTypes.bool,
//   isOpen: PropTypes.bool,
//   onOpen: PropTypes.func,
//   onClose: PropTypes.func,
// }

// function MenuDesktopItem({ item, isHome, isOpen, isOffset, onOpen, onClose }) {
//   const { title, path, children } = item

//   if (children) {
//     return (
//       <>
//         <LinkStyle
//           onClick={onOpen}
//           sx={{
//             display: 'flex',
//             cursor: 'pointer',
//             alignItems: 'center',
//             ...(isHome && { color: 'common.white' }),
//             ...(isOffset && { color: 'text.primary' }),
//             ...(isOpen && { opacity: 0.48 }),
//           }}
//         >
//           {title}
//           <Box
//             component={Icon}
//             icon={isOpen ? arrowIosUpwardFill : arrowIosDownwardFill}
//             sx={{ ml: 0.5, width: 16, height: 16 }}
//           />
//         </LinkStyle>

//         <Popover
//           open={isOpen}
//           anchorReference="anchorPosition"
//           anchorPosition={{ top: 80, left: 0 }}
//           anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//           transformOrigin={{ vertical: 'top', horizontal: 'center' }}
//           onClose={onClose}
//           PaperProps={{
//             sx: {
//               px: 3,
//               pt: 5,
//               pb: 3,
//               right: 16,
//               m: 'auto',
//               borderRadius: 2,
//               maxWidth: (theme) => theme.breakpoints.values.lg,
//               boxShadow: (theme) => theme.customShadows.primary,
//             },
//           }}
//         >
//           <Grid container spacing={3}>
//             {children.map((list) => {
//               const { subheader, items } = list

//               return (
//                 <Grid key={subheader} item xs={12} md={2}>
//                   <List disablePadding>
//                     <ListSubheader
//                       disableSticky
//                       disableGutters
//                       sx={{
//                         display: 'flex',
//                         lineHeight: 'unset',
//                         alignItems: 'center',
//                         color: 'text.primary',
//                         typography: 'overline',
//                       }}
//                     >
//                       <IconBullet type="subheader" /> {subheader}
//                     </ListSubheader>

//                     {items.map((item) => (
//                       <ListItemStyle
//                         key={item.title}
//                         to={item.path}
//                         component={RouterLink}
//                         underline="none"
//                         sx={{
//                           '&.active': {
//                             color: 'text.primary',
//                             typography: 'subtitle2',
//                           },
//                         }}
//                       >
//                         <IconBullet />
//                         {item.title}
//                       </ListItemStyle>
//                     ))}
//                   </List>
//                 </Grid>
//               )
//             })}
//           </Grid>
//         </Popover>
//       </>
//     )
//   }

//   return (
//     <LinkStyle
//       to={path}
//       component={RouterLink}
//       end={path === '/'}
//       sx={{
//         ...(isHome && { color: 'common.white' }),
//         ...(isOffset && { color: 'text.primary' }),
//         color: 'text.primary',
//         '&.active': {
//           color: 'primary.main',
//         },
//       }}
//     >
//       {title}
//     </LinkStyle>
//   )
// }

// MenuDesktop.propTypes = {
//   isOffset: PropTypes.bool,
//   isHome: PropTypes.bool,
//   navConfig: PropTypes.array,
// }

// export default function MenuDesktop({ isOffset, isHome, navConfig }) {
//   const { pathname } = useLocation()
//   const [open, setOpen] = useState(false)

//   useEffect(() => {
//     if (open) {
//       handleClose()
//     }
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [pathname])

//   const handleOpen = () => {
//     setOpen(true)
//   }

//   const handleClose = () => {
//     setOpen(false)
//   }

//   return (
//     <Stack direction="row">
//       {navConfig.map((link) => (
//         <MenuDesktopItem
//           key={link.title}
//           item={link}
//           isOpen={open}
//           onOpen={handleOpen}
//           onClose={handleClose}
//           isOffset={isOffset}
//           isHome={isHome}
//         />
//       ))}
//     </Stack>
//   )
// }
