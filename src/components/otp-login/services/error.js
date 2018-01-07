function getErrorMessage(data) {
  if (data.detail) return data.detail;
  if (data.email) return data.email[0];
  if (data.captcha.non_field_errors) return 'Invalid captcha. Try again.';
  if (data.captcha) return JSON.stringify(data.captcha);
  return 'Somthing went wrong. Try again.';
}

export default {
  getErrorMessage,
};