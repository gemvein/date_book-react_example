import React, { Component } from 'react'
import './App.css'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class App extends Component {

 static defaultProps = {
    className: ''
  }

  constructor(props) {
    super(props);

    this.state = {
      events: []
    }
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <h1>Calendar</h1>
        </div>
        <div className="big-calendar">
          <BigCalendar
            events={this.state.events}
            startAccessor='startDate'
            endAccessor='endDate'
          />
        </div>
      </div>
    )
  }


  componentDidMount() {
    fetch('http://localhost:3000/date_book/api', {
      method: 'post',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        query: 
        `{
          event_occurrences {
            start,
            end,
            url,
            popover_url,
            event {
              id,
              name,
              slug,
              all_day,
              css_class,
              text_color,
              background_color
              border_color
            } 
          }
        }`,
      })
    })
      .then((res) => res.json())
      .then((data) => data.data.event_occurrences)
      .then((events) => this.setState({ events }))
  }

}

export default App
