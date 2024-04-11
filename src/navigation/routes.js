import React, { lazy } from "react";
import About from "../components/about";
import Advisor from "../components/advisor";
import Pricing from "../components/pricing";
import UserList from "../components/user-list";
import Error from "../components/error";
import Faq from "../components/faq";
import Contact from "../components/contact";
import Register from "../components/register";
import { Route, Switch } from "react-router-dom";
import {
  LeaseRequestStep1,
  LeaseRequestStep2,
  LeaseRequestStep3,
  LeaseRequestStep4,
  LeaseRequestStep5,
  LeaseRequestStep6,
  LeaseRequestStep7,
  LeaseRequestOwner,
  LeaseRequestOwnerCancellation,
  LeaseRequestBankAccount,
} from "../views/lease-request";

const Home = lazy(() => import("../views/home/home.component"));

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Home} />
      <Route
        exact
        path="/lease-request/:id/cancellation"
        component={LeaseRequestOwnerCancellation}
      />
      <Route
        exact
        path="/lease-request/:id/owner"
        component={LeaseRequestOwner}
      />
      <Route
        exact
        path="/lease-request/:id/connect-account"
        component={LeaseRequestBankAccount}
      />
      <Route
        exact
        path="/lease-request/:id/result"
        component={LeaseRequestStep7}
      />
      <Route
        exact
        path="/lease-request/:id/analyze"
        component={LeaseRequestStep6}
      />
      <Route
        exact
        path="/lease-request/:id/accounts"
        component={LeaseRequestStep5}
      />
      <Route
        path="/lease-request/:id/connect/2"
        exact
        component={LeaseRequestStep4}
      />
      <Route
        path="/lease-request/:id/connect/1"
        exact
        component={LeaseRequestStep3}
      />
      <Route exact path="/lease-request/:id" component={LeaseRequestStep2} />
      <Route exact path="/lease-request" component={LeaseRequestStep1} />
      <Route path="/contact" component={Contact} />
      <Route path="/about" component={About} />
      <Route path="/faq" component={Faq} />
      <Route path="/advisor" component={Advisor} />
      <Route path="/pricing" component={Pricing} />
      <Route path="/user-list" component={UserList} />
      <Route path="/register" component={Register} />
      <Route path="/error" component={Error} />
      {/* <Route path="/property" component={Property} />
      <Route path="/availavbe-property" component={AvilableProperty} />
      <Route path="/properties-by-city" component={PropertiesByCity} />
      <Route path="/recent-properties" component={RecentProperties} />
      <Route path="/property-details" component={PropertyDetails} /> */}
      {/* <Route path="/news" component={News} />
      <Route path="/news-details" component={NewsDetails} />
      <Route path="/search-map" component={SearchMap} />
      <Route path="/search-grid" component={SearchGrid} />
      <Route path="/search-list" component={SearchList} />
      <Route path="/add-property" component={AddNew} /> */}
    </Switch>
  );
};

export default Routes;
