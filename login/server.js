// Before using this sample app, you must have generated a secret key by completing Step 1 and 2 of this guide
// https://developer.kustomer.com/chat-sdk/v2.0-Web/docs/authenticate-chat-with-jwt-token
// and replaced SECRET_KEY in this file

const path = require('path');
const express = require('express');
const jwt = require('jsonwebtoken');

const app = express();

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '/index.html'));
});

app.post('/login', (req, res) => {
  // let's say just for this example that Amy is logging in
  const userFromDB = { id: 'uuid1', name: 'Amy', email: 'amy@amy.com' };

  var kustomerLoginJwtToken = jwt.sign(
    {
      externalId: userFromDB.id,
      email: userFromDB.email,
      iat: Math.floor(Date.now() / 1000),
    },
    // replace SECRET_KEY with your own by following Steps 1 and 2 here
    // https://developer.kustomer.com/chat-sdk/v2.0-Web/docs/authenticate-chat-with-jwt-token
    'SECRET_KEY',
    {
      header: {
        alg: 'HS256',
        typ: 'JWT',
      },
    }
  );

  res.send({
    id: userFromDB.id,
    name: userFromDB.name,
    email: userFromDB.email,
    kustomerLoginJwtToken: kustomerLoginJwtToken,
  });
});

app.listen(3000, () => {
  console.log(`Example login app listening at http://localhost:3000`);
});
