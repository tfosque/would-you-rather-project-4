export const getUserAvatarUrl = (chkUserID) => {
  let url = require('../../images/noUser.png');

  if (chkUserID === 'sarahedo') {
    url = require('../../images/snow.jpg');
  } else if (chkUserID === 'tylermcginnis') {
    url = require('../../images/tyler.png');
  } else if (chkUserID === 'johndoe') {
    url = require('../../images/leaf.jpg');
  } else if (chkUserID === 'pleaselogin') {
    url = require('../../images/noUser.png');
  }

  return url;
};
