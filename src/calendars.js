import './calendars.css'
import React, { Component } from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import { QueryRenderer, graphql } from 'react-relay'
import environment from './environment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

class Calendars extends Component {

  render() {
    return (
        <div className="calendars">

          <QueryRenderer
              environment={environment}
              query={graphql`
                query calendarsQuery {
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
                }
              `}
              // query={graphql`
              //     query pageQuery($pageSlug: String!, $userSlug: String!) {
              //       page(slug: $pageSlug, user_id: $userSlug) {
              //         name,
              //         body
              //       }
              //     }
              //   `}

              // variables={{
              //   userSlug: 'john-doe',
              //   pageSlug: 'index'
              // }}
              render={({error, props}) => {
                if (error) {
                  return <div>{error.message}</div>
                } else if (props) {
                  const events = props.event_occurrences.map((occurrence) => {
                    let event = occurrence.event
                    let className = ''

                    if (event.css_class !== null) {
                      className = event.css_class
                    }

                    if (event.all_day === true) {
                      className = className + ' all-day'
                    } else {
                      className = className + ' part-day'
                    }
                    return ({
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
                      startDate: occurrence.start,
                      endDate: occurrence.end
                    })
                  })

                  return <BigCalendar
                      events={events}
                      startAccessor='startDate'
                      endAccessor='endDate'
                      titleAccessor='title'
                      allDayAccessor='allDay'
                  />
                }
                return <div>Loading</div>
              }}
          />

        </div>
    )
  }

}

export default Calendars
