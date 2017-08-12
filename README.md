# React implementation example using date_book GraphQL API 

Showing how to use the datebook_book GraphQL API at https://github.com/gemvein/date_book

Sample query using a template literal:

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
          

## A sample implementation using React Create App.  

For reference, the most recent version of the [React Create app guide README.md](https://github.com/facebookincubator/create-react-app/blob/master/packages/react-scripts/template/README.md).


