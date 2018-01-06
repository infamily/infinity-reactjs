function getErrorMessage(data) {
  if (data.detail) return JSON.stringify(data.detail);
  if (data.email) return JSON.stringify(data.email[0]);
  if (data.captcha.non_field_errors) return 'Invalid captcha. Try again.';
  if (data.captcha) return JSON.stringify(data.captcha);
  return
}

export default {
  getErrorMessage,
};