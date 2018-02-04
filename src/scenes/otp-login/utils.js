import crypto from 'sha1';

function checkSubscription(data) {
  const domain = data.email.split('@')[1];
  const code = crypto(data.key + domain);
  const isIncluded = data.membership.indexOf(code) > -1;
  return isIncluded;
}

export {
  checkSubscription,
}