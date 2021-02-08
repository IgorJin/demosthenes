import Dashboard from './components/Dashboard/Dashboard'
import Room from './components/Dashboard/Room/Room'
import Contacts from './components/Dashboard/Contacts/Contacts'
import Settings from './components/Dashboard/Settings'

export default [
    {
      path: "/",
      exact: true,
      main: Room,
    },
    {
      path: "/dashboard",
      exact: true,
      main: Dashboard,
    },
    {
      path: "/contacts",
      main: Contacts,
    },
    {
      path: "/settings",
      main: Settings,
    },
  ]