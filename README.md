# blackboard-send-mail

Send e-mails from Node.js – easy as Peeled bananas! 🍌✉️

[![npm version](https://badge.fury.io/js/blackboard-send-mail.svg)](https://badge.fury.io/js/blackboard-send-mail)

[![NPM](https://nodei.co/npm/blackboard-send-mail.png)](https://nodei.co/npm/blackboard-send-mail/)

## Installation

```sh
$ npm install blackboard-send-mail
```

or

```sh
$ yarn add blackboard-send-mail
```

## Importing

```javascript
// Using Node.js `require()`
const bsm = require('blackboard-send-mail');
```

## Overview

### Connecting to Mail

First, we need to define a connection mail service. `bsm.connect`

```js
bsm.connect({
    host: "HOST_MAIL_DOMAIN",
    auth: {
        user:"EMAIL_DOMAIN",
        pass: "PASSWORD"
    }
})
```

### Send Email

```js
bsm.sendMail({
    from: '"Fred Foo 👻" <foo@example.com>', // sender address
    to: "bar@example.com, baz@example.com", // list of receivers
    subject: "Hello ✔", // Subject line
    text: "Hello world?", // plain text body
    html: "<b>Hello world?</b>", // html body
  }).then(info => {
       console.log("Message sent: %s", info.messageId);
  // Message sent: <b658f8ca-6296-ccf4-8306-87d57a0b4321@example.com>
  });
```