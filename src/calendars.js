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

function StyledEvent({ event }) {
  let style = ''
  if (event.textColor != null) {
    style = `${style} color: ${event.textColor};`
  }
  if (event.backgroundColor != null) {
    style = `${style} background-color: ${event.backgroundColor};`
  }
  if (event.borderColor != null) {
    style = `${style} border-color: ${event.borderColor};`
  }
  return (
      <span className={event.className} style={style}>
      <strong>
      {event.title}
      </strong>
        { event.desc && (':  ' + event.desc)}
    </span>
  )
}


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
                      calendar {
                        css_class,
                        text_color,
                        background_color,
                        border_color
                      }
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
                    if (event.calendar.css_class !== null) {
                      className = `${className} ${event.css_class}`
                    }

                    if (event.all_day === true) {
                      className = `${className} event event-all-day`
                    } else {
                      className = `${className} event event-part-day`
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
                      startDate: moment(occurrence.start).toDate(),
                      endDate: moment(occurrence.end).toDate()
                    })
                  })

                  return <BigCalendar
                      events={events}
                      startAccessor='startDate'
                      endAccessor='endDate'
                      titleAccessor='title'
                      allDayAccessor='allDay'

                      components={
                        {
                          month: {
                            event: StyledEvent
                          }
                        }
                      }
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
