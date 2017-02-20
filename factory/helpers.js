module.exports.parseBody = function parseBody(body) {
  return body.split('&').reduce(function(prev, s) {
    var pair = s.split('=')
    prev[pair[0]] = decodeURIComponent(pair[1])
    return prev
  }, {})
}

module.exports.handleCORS = function handleCORS(cb) {
  return function (err, res) {
    if (err) {
      return cb(null, {
        statusCode: 400,
        headers: {
          "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
          "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
        },
        body: JSON.stringify(err.message),
      })
    }
    cb(null, {
      statusCode: 200,
      headers: {
        "Access-Control-Allow-Origin" : "*", // Required for CORS support to work
        "Access-Control-Allow-Credentials" : true // Required for cookies, authorization headers with HTTPS
      },
      body: JSON.stringify(res),
    })
  }
}
