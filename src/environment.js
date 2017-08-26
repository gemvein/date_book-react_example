const {
  Environment,
  Network,
  RecordSource,
  Store,
} = require('relay-runtime')

const source = new RecordSource()
const store = new Store(source)
const handlerProvider = null

// Define a function that fetches the results of an operation (query/mutation/etc)
// and returns its results as a Promise:
function fetchQuery(
    operation,
    variables,
    cacheConfig,
    uploadables,
) {
  return fetch('http://localhost:3000/date_book/api', {
    method: 'POST',
    headers: {
      // Add authentication and other headers here
      'content-type': 'application/json'
    },
    body: JSON.stringify({
      query: operation.text, // GraphQL text from input
      variables,
    }),
  }).then(response => {
    return response.json()
  })
}

// Create a network layer from the fetch function
const network = Network.create(fetchQuery)

const environment = new Environment({
  handlerProvider, // Can omit.
  network,
  store,
})

export default environment
