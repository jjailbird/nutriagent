import React from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';
import AppContainer from '../../ui/layouts/AppContainer.jsx';
import SignIn from '../../ui/components/accounts/SignIn.jsx';
import SignUp from '../../ui/components/accounts/SignUp.jsx';
import Home from '../../ui/pages/Home.jsx';
import FoodContainer from '../../ui/pages/FoodContainer.jsx';
import UploadFile from '../../ui/components/uploads/FileUpload.jsx';
import EchartPage from '../../ui/pages/EchartPage.jsx';

export const renderRoutes = () => (
  <Router history={browserHistory}>
    <Route path="/" component={AppContainer}>
      <IndexRoute component={Home} />
      <Route path="home" component={Home} />
      <Route path="food(/:query)" component={FoodContainer} />
      <Route path="upload" component={UploadFile} />
      <Route path="chart/echart" component={EchartPage} />
      <Route path="signin" component={SignIn} />
      <Route path="signup" component={SignUp} />
    </Route>
  </Router>
);
