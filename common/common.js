/* eslint-disable no-useless-escape */
/* eslint-disable default-case */
/* eslint-disable no-unused-expressions */
/* eslint-disable brace-style, camelcase, semi */

// TODO: call this something other than common/common.js
// perhaps common/functions.js ?

const is_object_empty = (obj) => {
  const names = Object.getOwnPropertyNames(obj);
  return Promise.resolve({ status: names.length === 0, names });
};

const validate_email = (email) => {
  const re =
    /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(email);
};

const validate_mobile = (phone) => {
  const number = phone.toString();
  const re = /^(\([0-9]{3}\)|[0-9]{3}-)[0-9]{3}-[0-9]{4}$/;
  return re.test(number);
};

const validate_pseudo = (value) => !!(value && value.length >= 6);

const validate_password = (value) => !!(value && value.length >= 8);

const validate_cvc = (value) => !!(value && value.length <= 3);

const validate_credit_card = (value) => !(value && value.length !== 16);

const validation = (parameters, obj) =>
  is_object_empty(obj).then(({ status, names }) => {
    if (!status) {
      const existedFields = {
        keys: names,
        emptyKeys: [],
      };
      parameters.forEach((element) => {
        obj[element] === undefined &&
          existedFields.emptyKeys.push({ fieldName: element, message: 'Required' });
      });

      // Specific fields validations
      existedFields.emptyKeys.length <= 0 &&
        existedFields.keys.forEach((element) => {
          switch (element) {
            case 'pseudo':
              !validate_pseudo(obj.pseudo) &&
                existedFields.emptyKeys.push({
                  fieldName: element,
                  message: 'pseudo is not valid.',
                });
              break;
            case 'email':
              !validate_email(obj.email) &&
                existedFields.emptyKeys.push({
                  fieldName: element,
                  message: 'Email address is not valid.',
                });
              break;
            case 'phone':
              !validate_mobile(obj.phone) &&
                existedFields.emptyKeys.push({
                  fieldName: element,
                  message: 'Mobile number is not valid.',
                });
              break;
            case 'password':
              !validate_password(obj.password) &&
                existedFields.emptyKeys.push({
                  fieldName: element,
                  message: 'Password at least 5 characters',
                });
              break;
            case 'confirm_password':
              if (obj.password !== obj.confirm_password) {
                existedFields.emptyKeys.push({
                  fieldName: 'password',
                  message: 'Password is not matched.',
                });
                existedFields.emptyKeys.push({
                  fieldName: 'confirm_password',
                  message: 'Password is not matched.',
                });
              }
              break;
            case 'cardNumber':
              !validate_credit_card(obj.cardNumber) &&
                existedFields.emptyKeys.push({ fieldName: element, message: 'Invalid Card no' });
              break;
            case 'cardCvc':
              !validate_cvc(obj.cardCvc) &&
                existedFields.emptyKeys.push({ fieldName: element, message: 'cvc only 3 digit' });
              break;
          }
        });
      return Promise.resolve({
        status: !(existedFields.emptyKeys.length > 0),
        response: existedFields.emptyKeys,
      });
    }
    return Promise.resolve({ status: false, response: parameters });
  });

module.exports = {
  validation,
};
