import React from 'react'
import { BrowserRouter, Switch, Route } from 'react-router-dom'

import Main from './components/pages/main'
import Poll from './components/pages/poll'

const Routes = () => (
    <BrowserRouter>
        <Switch>
            <Route path="/" exact component={Main} />
            <Route path="/polls/:pollId" component={Poll}/>
        </Switch>
    </BrowserRouter>
)

export default Routes