import {withStyles} from '@material-ui/core/styles';

const css = theme => ({
  body: {
    // The AppBar needs to be position: fixed so offset this by the bar's height
    position: 'relative',
    display: 'inline-block',
    top: 75
  },
  backdrop: {
    zIndex:1000
  },
  appbar: {
    backgroundColor: theme.palette.background.dark
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
  confirmed: {
    backgroundColor: theme.palette.warning.dark
  },
  deaths: {
    backgroundColor: theme.palette.error.dark
  },
  cardBody: {
    backgroundColor: theme.palette.background.default,
    paddingBottom: '0 !important',
    paddingTop:0
  },
  green: {
    color: theme.palette.success.light
  },
  red: {
    color: theme.palette.error.dark
  },
  xsIcon: {
    fontSize: '1em'
  },
  filters: {
    paddingLeft: 30,
    "& > div": {
      display: 'inline-block',
      paddingRight: 10
    }
  },
  success: {
    color: theme.palette.success.main,
    fontSize: 'inherit'
  },
  warning: {
    color: theme.palette.warning.main,
    fontSize: 'inherit'
  },
  historyCalendar: {
    height: 150
  },
  lineChartContainer: {
    height: 300
  },
  bottomNav: {
    width: '100%',
    position: 'fixed',
    bottom: '0%'
  }
})

export const styled = () => (c) => withStyles(css)(c)