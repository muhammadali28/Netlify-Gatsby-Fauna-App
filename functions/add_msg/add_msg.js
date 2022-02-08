const faunadb = require('faunadb'),
  q = faunadb.query;

exports.handler = async (event, context) => {
    try {
       
       const messageBody= JSON.parse(event.body); 
       var client = new faunadb.Client({ secret:'fnAEe7CLrmACSQWAW9EtFw10adQSQ_uUuYS9tNFn'});

       const result = await client.query(
        q.Create(
                q.Collection('Posts'),
                { data: { title: messageBody.title } },
            )
      );

      console.log("Entry Created and Inserted in Container: " + result.ref.id);

      return {
        statusCode: 200,
        body: JSON.stringify({ title: result.ref.id }),
        // // more keys you can return:
        // headers: { "headerName": "headerValue", ... },
        // isBase64Encoded: true,
      }
    } catch (error) {
      return { statusCode: 500, body: error.toString() }
    }
}
  
  