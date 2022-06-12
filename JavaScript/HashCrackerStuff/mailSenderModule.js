var helper = require('sendgrid').mail;
var sg;

function _prepareMail(from_email, subject, to_email, content) {
  from_email = new helper.Email(from_email);
  to_email = new helper.Email(to_email);
  content=new helper.Content('text/plain',content);
  var mail = new helper.Mail(from_email, subject, to_email, content);
  var request = sg.emptyRequest({
    method: 'POST',
    path: '/v3/mail/send',
    body: mail.toJSON(),
  });
  return request;
}

function _sendMail(request, callback) {
  sg.API(request, function(error, response) {
    callback(error, response);
  });
}

module.exports = {
  
  initializeModule: function(key , senderMail){
    sg = require('sendgrid')(key);
    from_email = new helper.Email(senderMail);
  },
  
  sendMail: function(from_email, subject, to_email, content, callback) {
    var request = _prepareMail(from_email, subject, to_email, content);
    _sendMail(request, function(error, response) {
      console.log(response.statusCode);
      console.log(response.body);
      console.log(response.headers);
      callback(error, response);
    });
  }
}
