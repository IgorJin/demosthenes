import Workspace from './containers/Dashboard/Workspace/Workspace'
import Events from './containers/Dashboard/Events/Events'
import Contacts from './containers/Dashboard/Contacts/Contacts'
import Settings from './containers/Dashboard/Settings'

export default [
    {
      path: "/dashboard/events",
      main: Events,
    },
    {
      path: "/dashboard/workspace",
      main: Workspace,
    },
    {
      path: "/dashboard/contacts",
      main: Contacts,
    },
    {
      path: "/dashboard/settings",
      main: Settings,
    },
  ]