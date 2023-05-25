const transformFacebookUser = ({id, first_name, last_name, email, tokens}) => {
  return {
    username: email,
    firstName: first_name,
    lastName: last_name,
    facebookId: id,
    tokens: tokens || 0
  }
}

const transformGoogleUser = ({sub, given_name, family_name, email, tokens}) => {
  return {
    googleId: `google_${sub}`,
    username: email,
    firstName: given_name,
    lastName: family_name,
    tokens: tokens || 0
  }
}

const Transformers = {
  transformFacebookUser,
  transformGoogleUser
}


export default Transformers;
