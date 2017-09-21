import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import {QueryRenderer, graphql} from 'react-relay'
import environment from '../../environment'
import EventCalendar from 'react-event-calendar'
import moment from 'moment'
import {Grid, Menu, Button, Popup, Popover, Modal} from 'semantic-ui-react'

import 'react-event-calendar/style.css'


const dataFormat = 'YYYY-MM-DD';
const monthNames = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',]

class Calendars extends Component {

  constructor(props) {
    super(props)

    this.state = {
      moment: moment(),
      showPopover: false,
      showModal: false,
      popupTitle: null,
      popupContent: null,
      popoverTarget: null,
    }

    this.handleNextMonth = this.handleNextMonth.bind(this)
    this.handlePreviousMonth = this.handlePreviousMonth.bind(this)
    this.handleToday = this.handleToday.bind(this)
    this.handleEventClick = this.handleEventClick.bind(this)
    this.handleEventMouseOver = this.handleEventMouseOver.bind(this)
    this.handleEventMouseOut = this.handleEventMouseOut.bind(this)
    this.handleDayClick = this.handleDayClick.bind(this)
    this.handleModalClose = this.handleModalClose.bind(this)
  }

  handleNextMonth() {
    this.setState({
      moment: this.state.moment.add(1, 'M'),
    })
  }

  handlePreviousMonth() {
    this.setState({
      moment: this.state.moment.subtract(1, 'M'),
    })
  }

  handleToday() {
    this.setState({
      moment: moment(),
    })
  }

  handleEventMouseOver(target, eventData, day) {
    this.setState({
      showPopover: true,
      popoverTarget: () => ReactDOM.findDOMNode(target),
      popupTitle: eventData.title,
      popupContent: eventData.description,
    })
  }

  handleEventMouseOut(target, eventData, day) {
    this.setState({
      showPopover: false,
    })
  }

  handleEventClick(target, eventData, day) {
    this.setState({
      showPopover: false,
      showModal: true,
      popupTitle: eventData.title,
      popupContent: eventData.description,
    })
  }

  handleDayClick(target, day) {
    this.setState({
      showPopover: false,
      showModal: true,
      popupTitle: this.getMomentFromDay(day).format('Do of MMMM YYYY'),
      popupContent: 'User clicked day (but not event node).',
    })
  }

  getMomentFromDay(day) {
    return moment().set({
      'year': day.year,
      'month': (day.month + 0) % 12,
      'date': day.day
    })
  }

  handleModalClose() {
    this.setState({
      showModal: false,
    })
  }

  getHumanDate() {
    return [moment.months('MM', this.state.moment.month()), this.state.moment.year(),].join(' ')
  }

  render() {
    return (
        <div className="calendars">

          <Grid>
            <Grid.Row>
              <Grid.Column width={8}>
                <Menu>
                  <Button onClick={this.handlePreviousMonth}>&lt;</Button>
                  <Button onClick={this.handleNextMonth}>&gt;</Button>
                  <Button onClick={this.handleToday}>Today</Button>
                </Menu>
              </Grid.Column>
              <Grid.Column width={8}>
                <h1>{this.getHumanDate()}</h1>
              </Grid.Column>
            </Grid.Row>
            <br />
            <Grid.Row>
              <Grid.Column width={16}>

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
                            eventClasses: classNames.join(' '),
                            data: {
                              allDay: event.all_day,
                              url: occurrence.url,
                              popover_url: occurrence.popover_url,
                              style: {
                                color: event.textColor,
                                backgroundColor: event.calendar.background_color,
                                borderColor: event.calendar.border_color
                              }
                            },
                            start: moment(occurrence.start).format(dataFormat),
                            end: moment(occurrence.end).subtract(1, 'seconds').format(dataFormat),

                          })
                        })

                        return <EventCalendar
                            month={this.state.moment.month()}
                            year={this.state.moment.year()}
                            events={events}
                            onEventClick={this.handleEventClick}
                            onEventMouseOver={this.handleEventMouseOver}
                            onEventMouseOut={this.handleEventMouseOut}
                            onDayClick={this.handleDayClick}
                            maxEventSlots={10}
                        />
                      }
                      return <div>Loading</div>
                    }}
                /> {/* End QueryRenderer */}

              </Grid.Column>
            </Grid.Row>
          </Grid>

          <Popup
              show={this.state.showPopover}
              rootClose
              onHide={() => this.setState({showPopover: false,})}
              placement="top"
              container={this}
              target={this.state.popoverTarget}>
            {/*<Popover id="event">{this.state.popupTitle}</Popover>*/}
          </Popup>

          <Modal show={this.state.showModal} onHide={this.handleModalClose}>
            <Modal.Header closeButton>
              {this.state.popupTitle}
            </Modal.Header>
            <Modal.Content>
              {this.state.popupContent}
            </Modal.Content>
            <Modal.Actions>
              <Button onClick={this.handleModalClose}>Close</Button>
            </Modal.Actions>
          </Modal>

        </div>
    )
  }

}

export default Calendars
