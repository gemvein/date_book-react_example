import React from 'react';
import Calendars from './calendars'
import { Switch, Route } from 'react-router-dom'

const Main = () => (
  <main>
    <Switch>
      <Route exact path='/' component={Calendars} />
      {/* <Route path='/calendars/:slug' component={Calendar} />
      <Route path='/calendars/:slug/events' component={Events} />
      <Route path='/calendars/:slug/events/:event' component={SingleEvent} /> */}
    </Switch>
  </main>
)

export default Main
