import React from "react";
import {Switch, Route, Redirect} from 'react-router-dom'
import MainPage from "./pages/MainPage/MainPage";
import DetailPage from "./pages/DetailPage/DetailPage";
import CreatePage from "./pages/CreatePage/CreatePage";
import ErrorPage from "./pages/ErrorPage";

export const useRoutes = () => {
      return (
        <Switch>
            <Route path='/' exact>
                <MainPage />
            </Route>
            <Route path="/detail/:id" render={(props) => (<DetailPage {...props} /> )} />

            <Route path='/create'>
                <CreatePage />
            </Route>
            <Route path='/error'>
                <ErrorPage />
            </Route>
            <Redirect to="/error"/>
        </Switch>
    )
}