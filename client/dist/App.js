"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const react_1 = require("react");
require("./App.scss");
const react_router_dom_1 = require("react-router-dom");
const react_redux_1 = require("react-redux");
const Search_1 = require("./components/Search");
const Sidebar_1 = require("./components/Sidebar/Sidebar");
const CabinetLoginPage_1 = require("./components/CabinetLoginPage");
const Comnponents_1 = require("./webinar/Comnponents");
const routes_1 = require("./routes");
const cn = require('classnames');
function App({ isLoginIn }) {
    const [sidebarState, setSidebarState] = react_1.useState(false);
    const toggleSidebar = () => {
        setSidebarState(!sidebarState);
    };
    if (react_router_dom_1.useRouteMatch('/webinar'))
        return <Comnponents_1.default />;
    return (<div className='App'>
      {!isLoginIn &&
        <CabinetLoginPage_1.default />}
      <Sidebar_1.default sidebarState={sidebarState} onToggleSidebar={toggleSidebar}/>
      <div className='main'>
        <Search_1.default />
          <div className='content'>
            <div className='content__inner'>
            {!isLoginIn && <react_router_dom_1.Redirect to="/"/>}
              <react_router_dom_1.Switch>
                {routes_1.default.map((route, index) => (<react_router_dom_1.Route key={index} path={route.path} exact={route.exact} children={<route.main />}/>))}
              </react_router_dom_1.Switch>
            </div>
          </div>
      </div>
    </div>);
}
const mapStateToProps = state => ({
    isLoginIn: state.authReducer.isLogin
});
exports.default = react_redux_1.connect(mapStateToProps)(App);
//# sourceMappingURL=App.js.map