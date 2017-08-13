import './calendars.css'
import React, { Component} from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

class Calendars extends Component {

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
      <div className="calendars">
        <BigCalendar
          events={this.state.events}
          startAccessor='startDate'
          endAccessor='endDate'
        />
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
      .then((data) => { 
        let event_occurrences = data.data.event_occurrences.map((occurrence) => {
          let event = occurrence.event
          let className = ''
          
          if(event.css_class !== null) {
            className = event.css_class;
          }

          if(event.all_day == true) {
              className = className + ' all-day';
          } else {
              className = className + ' part-day';
          }
          return({
              id: event.id,
              title: event.name,
              description: event.description,
              className: className,
              textColor: event.text_color,
              backgroundColor: event.background_color,
              borderColor: event.border_color,
              allDay: event.all_day,
              url: occurrence.url,
              popover_url: occurrence.popover_url,
              start: occurrence.start,
              end: occurrence.end
          });
        })
        console.log(event_occurrences)
        return event_occurrences
      } )
      .then((events) => this.setState({ events }))
  }
}

export default Calendars
