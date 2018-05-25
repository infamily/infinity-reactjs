import { defineMessages } from 'react-intl';

export default defineMessages({
  signInTitle: {
    id: 'infinity.scenes.OtpLogin.signInTitle',
    defaultMessage: 'Sign In'
  },
  commonErrorTitle: {
    id: 'infinity.scenes.OtpLogin.commonErrorTitle',
    defaultMessage: 'Error'
  },
  commonErrorText: {
    id: 'infinity.scenes.OtpLogin.commonErrorText',
    defaultMessage: 'Something went wrong. Try again.'
  },
  signInErrorTitle: {
    id: 'infinity.scenes.OtpLogin.signInErrorTitle',
    defaultMessage: 'SignIn Error'
  },
  invalidCaptcha: {
    id: 'infinity.scenes.OtpLogin.invalidCaptcha',
    defaultMessage: 'Invalid captcha. Try again.'
  },
  signInErrorfillOut: {
    id: 'infinity.scenes.OtpLogin.signInErrorfillOut',
    defaultMessage: 'The field should be filled out.'
  },
  signInErrorWrongCode: {
    id: 'infinity.scenes.OtpLogin.signInErrorWrongCode',
    defaultMessage: 'Wrong code. Try again.'
  },
  invalidMemberByEmail: {
    id: 'infinity.scenes.OtpLogin.EmailView.invalidEmail',
    defaultMessage:
      'Your organization is not a member of this server. Enter a valid email address.'
  },
  serverErrTitle: {
    id: 'infinity.scenes.OtpLogin.EmailView.serverErrTitle',
    defaultMessage: 'Server Error'
  },
  allFilledOut: {
    id: 'infinity.scenes.OtpLogin.EmailView.allFilledOut',
    defaultMessage: 'All fields should be filled out.'
  },
  emailPlaceholder: {
    id: 'infinity.scenes.OtpLogin.EmailView.emailPlaceholder',
    defaultMessage: 'E-mail address'
  },
  captchaPlaceholder: {
    id: 'infinity.scenes.OtpLogin.EmailView.captchaPlaceholder',
    defaultMessage: 'Captcha'
  },
  otpPlaceholder: {
    id: 'infinity.scenes.OtpLogin.EmailView.otpPlaceholder',
    defaultMessage: 'One time password'
  },
  tosRead: {
    id: 'infinity.scenes.OtpLogin.EmailView.tosRead',
    defaultMessage: 'I have read and agree to the'
  },
  tos: {
    id: 'infinity.scenes.OtpLogin.EmailView.tos',
    defaultMessage: 'Terms of Service'
  },
  continue: {
    id: 'infinity.scenes.OtpLogin.EmailView.continue',
    defaultMessage: 'Continue'
  },
  otpHasBeenSent: {
    id: 'infinity.scenes.OtpLogin.LoginView.HTML.otpHasBeenSent',
    defaultMessage:
      '<strong>One time password</strong> has been send to your email.'
  },
  resend: {
    id: 'infinity.scenes.OtpLogin.LoginView.resend',
    defaultMessage: 'Resend code'
  },
  submit: {
    id: 'infinity.scenes.OtpLogin.LoginView.submit',
    defaultMessage: 'Submit'
  }
});
