import {FacebookLoginClient} from "@greatsumini/react-facebook-login";
import {API} from "aws-amplify";
import events from "./dispatch";
import Transformers from "./index";

const socialStatus = {
  CREATE: 1,
  EXISTS: 2,
  INVALID: 3,
  ERROR: 4
}

const socialPlatform = {
  FACEBOOK: 'facebook',
  GOOGLE: 'google'
}

const errorMessages = {
  existing: "A user with that email already exists. Please login with that account",
  internalError: "An internal error occurred. We are actively investigating."
}

FacebookLoginClient.init({
  appId: process.env.REACT_APP_FACEBOOK_APP_ID,
  version: process.env.REACT_APP_FACEBOOK_API_VERSION || "v15.0",
  xfbml: true
});

const loginOrCreateFBUser = async (callback) => {
  FacebookLoginClient.getProfile(async (profile) => {
    const action = await getSocialStatus(profile.id, profile.email, socialPlatform.FACEBOOK);
    switch(action) {
      case socialStatus.EXISTS:
        const existingUser = Transformers.transformFacebookUser(profile);
        events.loginEvent('facebook', JSON.stringify(existingUser));
        break;
      case socialStatus.CREATE:
        const createdUser = await createFbUser(profile)
        events.loginEvent('facebook', createdUser);
        break;
      case socialStatus.INVALID:
        callback(errorMessages.existing);
        break;
      default:
        callback(errorMessages.internalError);
    }
  }, {fields: "first_name, last_name, email, id"});
}

const loginOrCreateGoogleUser = async (token, callback) => {
  const req = await fetch(`https://www.googleapis.com/oauth2/v3/userinfo?access_token=${token}`)
  const googleUser = await req.json();
  const action = await getSocialStatus(googleUser.sub, googleUser.email, socialPlatform.GOOGLE);
  switch(action) {
    case socialStatus.EXISTS:
      const existingUser = Transformers.transformGoogleUser(googleUser);
      events.loginEvent('google', JSON.stringify(existingUser));
      break;
    case socialStatus.CREATE:
      const createdUser = await createGoogleUser(googleUser);
      events.loginEvent('google', createdUser);
      break;
    case socialStatus.INVALID:
      callback(errorMessages.existing);
      break;
    default:
      callback(errorMessages.internalError);
  }
}

const getSocialStatus = async (id, email, platform) => {
  return JSON.parse(await API.post('tcgapi', `/users/socialLogin`, {
    body: {
      id: id,
      email: email,
      platform: platform
    }
  }));
}

const createFbUser = async (profile) => {
  const user = Transformers.transformFacebookUser(profile);
  try {
    return JSON.parse(await API.post('tcgapi', '/users', {body: user}));
  } catch (err) {
    return null;
  }
}

const createGoogleUser = async(profile) => {
  const user = Transformers.transformGoogleUser(profile);
  try {
    return JSON.parse(await API.post('tcgapi', '/users', {body: user}));
  } catch (err) {
    return null;
  }
}


const social = {
  loginOrCreateFBUser,
  loginOrCreateGoogleUser
}

export default social;
