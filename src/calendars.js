import './calendars.css'
import React, {Component} from 'react'
import BigCalendar from 'react-big-calendar'
import moment from 'moment'
import 'react-big-calendar/lib/css/react-big-calendar.css'
import {QueryRenderer, graphql} from 'react-relay'
import environment from './environment'

// Setup the localizer by providing the moment (or globalize) Object
// to the correct localizer.
BigCalendar.momentLocalizer(moment) // or globalizeLocalizer

function StyledEventWrapper({event}) {
  const dayClassName = (event.all_day === true) ? 'rbc-event-allday' : 'rbc-event-partday'

  return (
    <div className={`rbc-event ${dayClassName} ${event.className}`}
         style={event.style}>
      <strong>
        {event.title}
      </strong>
    </div>
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
                let classNames = []

                if (event.css_class !== null) {
                  classNames.push(event.css_class)
                }
                if (event.calendar.css_class !== null) {
                  classNames.push(event.calendar.css_class)
                }

                return ({
                  id: event.id,
                  title: event.name,
                  description: event.description,
                  className: classNames.join(' '),
                  style: {
                    color: event.textColor,
                    backgroundColor: event.calendar.background_color,
                    borderColor: event.calendar.border_color
                  },
                  allDay: event.all_day,
                  url: occurrence.url,
                  popover_url: occurrence.popover_url,
                  startDate: moment(occurrence.start).toDate(),
                  endDate: moment(occurrence.end).subtract(1, 'seconds').toDate()
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
                    eventWrapper: StyledEventWrapper
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
