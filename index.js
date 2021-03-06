'use strict';
let request = require('request');
let https   = require('https');

let Pushould = (function() {
  function Pushould(arg) {
    this.url = arg.url;
    this.server_token = arg.server_token;
    this.email = arg.email;
    this.password = arg.password;
    this.domain = this.url.replace('https://', '');

    this.agentOptions = {
      host: this.domain,
      port: '443',
      path: '/',
      rejectUnauthorized: false
    }

    this.agent = new https.Agent(this.agentOptions);
  }

  Pushould.prototype.trigger = function(arg) {
    this.room = arg.room;
    this.event = arg.event;
    this.data = arg.data;
    let account_info = { email: this.email,
                         password: this.password };
    let send_data = { room: this.room,
                      event: this.event,
                      token: this.server_token,
                      custom: this.data };

    let options = {
      url: this.url,
      json: true,
      headers: {
        'Accept':'application/json',
        'Content-Type':'application/json'
      },
      qs: {
        'account': JSON.stringify(account_info),
        'data': JSON.stringify(send_data)
      },
      agent: this.agent
    }
    function callback(error, response, body) {
      if (!error) {
        console.log(response.statusCode);
      }
    }

    return request.get(options, callback);
  };

  return Pushould;

})();

module.exports = Pushould;
