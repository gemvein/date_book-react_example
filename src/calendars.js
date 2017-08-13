import './calendars.css'
import React from 'react';
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment); // or globalizeLocalizer

const Calendars = () => (
  <div className="calendars">
    Foo. BAR!
    {/* <BigCalendar
    /> */}
  </div>
)
  
export default Calendars


  // componentDidMount() {
  //   fetch('http://localhost:3000/date_book/api', {
  //     method: 'post',
  //     headers: {
  //       Accept: 'Calendarlication/json',
  //       'Content-Type': 'Calendarlication/json',
  //     },
  //     body: JSON.stringify({
  //       query: 
  //       `{
  //         event_occurrences {
  //           start,
  //           end,
  //           url,
  //           popover_url,
  //           event {
  //             id,
  //             name,
  //             slug,
  //             all_day,
  //             css_class,
  //             text_color,
  //             background_color
  //             border_color
  //           } 
  //         }
  //       }`,
  //     })
  //   })
  //     .then((res) => res.json())
  //     .then((data) => data.data.event_occurrences)
  //     .then((events) => this.setState({ events }))
  // }



    // event = occurrence.event;
    // if(event.css_class == null) {
    //     className = '';
    // } else {
    //     className = event.css_class;
    // }
    // if(event.all_day == true) {
    //     className = className + ' all-day';
    // } else {
    //     className = className + ' part-day';
    // }
    // return({
    //     id: event.id,
    //     title: event.name,
    //     description: event.description,
    //     className: className,
    //     textColor: event.text_color,
    //     backgroundColor: event.background_color,
    //     borderColor: event.border_color,
    //     allDay: event.all_day,
    //     url: occurrence.url,
    //     popover_url: occurrence.popover_url,
    //     start: occurrence.start,
    //     end: occurrence.end
    // });
