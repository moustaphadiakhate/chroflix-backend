/* eslint-disable brace-style, camelcase, semi */

/**
 * sample response while operation has done
 * @param {*request} req
 * @param {*response} res
 * @param {*string} status
 * @param {*array|object} response
 */

const send_response = (res, status, data, message) => {
  res.status(status).json({
    status,
    data,
    message,
    error: status !== 200,
  });
};

const send = (req, res, status, response) => {
  if (status === 'success') {
    send_response(res, 200, response, 'Success');
  } else {
    switch (status) {
      case 'err':
        send_response(res, 501, response, 'Error');
        break;
      case 'notValid':
        send_response(res, 401, response, 'NotValid');
        break;
      case 'emailPresent':
        send_response(res, 409, response, 'emailPresent');
        break;
      case 'phonePresent':
        send_response(res, 409, response, 'phonePresent');
        break;
      case 'noValue':
        send_response(res, 404, response, 'NoValue');
        break;
      case 'notAuthorized':
        send_response(res, 401, response, 'Not Authorized');
        break;
      case 'objEmpty':
        send_response(res, 400, response, 'ObjEmpty');
        break;
      case 'badRequest':
        send_response(res, 400, response, 'Bad REQUEST');
        break;
      case 'validationErr':
        send_response(res, 422, response, 'ValidationError');
        break;
      case 'verificationErr':
        send_response(res, 304, response, 'VarificationError');
        break;
      case 'forbidden':
        send_response(res, 409, response, 'FORBIDDEN');
        break;
      case 'signedin':
        send_response(res, 200, response, 'LogIn');
        break;
      case 'signedout':
        send_response(res, 200, response, 'LogOut');
        break;
      default:
        send_response(res, 500, response, 'InternalServerError');
    }
  }
};

module.exports = {
  send,
};
