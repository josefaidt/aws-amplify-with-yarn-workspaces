const pkg = require('@my/fancy-pkg')

exports.handler = async event => {
  // TODO implement
  console.log('EVENT: ', JSON.stringify(event))
  const { a, b } = event['queryStringParameters']
  let message = `Missing query parameters 🤢`
  if (a && b)
    message =
      `The sum of ${a} and ${b} is ` + pkg.add(parseInt(a, 10), parseInt(b, 10))
  const response = {
    statusCode: 200,
    //  Uncomment below to enable CORS requests
    //  headers: {
    //      "Access-Control-Allow-Origin": "*",
    //      "Access-Control-Allow-Headers": "*"
    //  },
    body: JSON.stringify(message),
  }
  return response
}
