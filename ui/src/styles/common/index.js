import {withStyles} from '@material-ui/core/styles';

const css = theme => ({
  actionButton: {
    color: theme.palette.secondary.contrastText,
    backgroundColor: theme.palette.secondary.main
  },
  appbar: {
    backgroundColor: theme.palette.background.dark
  },
  backdrop: {
    zIndex:1000
  },
  badgedIcon: {
    width: 'auto',
    paddingRight: 10
  },
  body: {
    position: 'relative',
    display: 'inline-block',
    top: 75
  },
  breadcrumbs: {
    // Hide on small screens
    [theme.breakpoints.down('sm')]: {
      display: 'none'
    }
  },
  cardHeader: {
    backgroundColor: theme.palette.background.default
  },
  cardBody: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: '0 !important',
    paddingTop:0
  },
  confirmed: {
    backgroundColor: theme.palette.warning.dark
  },
  deaths: {
    backgroundColor: theme.palette.error.dark
  },
  icon: {
    width: 'auto'
  },
  filterLabel: {
    paddingBottom: 6
  },
  filters: {
    [theme.breakpoints.up('sm')]: {
      "& > div": {
        minWidth: 120,
        display: 'inline-block',
        paddingRight: 10
      },
    },
    [theme.breakpoints.down('xs')]: {
      "& > div": {
        display: 'inline-flex',
        width: '33%',
        paddingRight: 10
      }
    }
  },
  filterIcon: {
    padding: 6,
    top:3,
    [theme.breakpoints.down('xs')]: {
        display: 'none'
    },
    '& > span span': {
      fontSize: '.5em',
    }
  },
  green: {
    color: theme.palette.success.main
  },
  headlineTitleBox: {
    maxHeight: 100,
    overflowX: 'hidden'
  },
  historyCalendar: {
    height: 150
  },
  lineChartContainer: {
    height: 300
  },
  link: {
    color: theme.palette.primary.linkText
  },
  localBadges: {
    '& > .MuiBadge-badge': {
      position:'relative',
      left:-100,
      top: -3
    }
  },
  navLink: {
    width: 'fit-content',
    color: theme.palette.primary.contrastText
  },
  navButton: {
    color: theme.palette.secondary.contrastText,
    "&:hover": {
      background: theme.palette.secondary.light
    }
  },
  paneCard: {
    '& > div': {
      border: 0,
      padding: '0 !important'
    }
  },
  red: {
    color: theme.palette.error.dark
  },
  smIcon: {
    fontSize: '1.1em',
    width: 'auto'
  },
  success: {
    color: theme.palette.success.main,
    fontSize: 'inherit'
  },
  tabsContainer: {
    position: 'relative',
    left: -25
  },
  warning: {
    color: theme.palette.warning.main,
    fontSize: 'inherit'
  },
  xsIcon: {
    fontSize: '1em',
    width: 'auto'
  }
})

export const styled = () => (c) => withStyles(css)(c)
