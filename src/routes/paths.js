// ----------------------------------------------------------------------

function path(root, sublink) {
  return `${root}${sublink}`
}

const ROOTS_DASHBOARD = '/dashboard'

// ----------------------------------------------------------------------

export const PATH_DASHBOARD = {
  root: ROOTS_DASHBOARD,
  general: {
    pageOne: path(ROOTS_DASHBOARD, '/one'),
    pageTwo: path(ROOTS_DASHBOARD, '/two'),
    pageThree: path(ROOTS_DASHBOARD, '/three'),
  },
  users: {
    root: path(ROOTS_DASHBOARD, '/users'),
    pageUserList: path(ROOTS_DASHBOARD, '/users/list-user'),
    pageFive: path(ROOTS_DASHBOARD, '/users/five'),
    pageSix: path(ROOTS_DASHBOARD, '/users/six'),
  },
}
