async function getAuthToken() {
  // let url = `${host}/auth/login`;     // api url for login
  const url = `${domain}/auth/token`;
  const option = {                         // optional second argument
    method: 'post',               //  to customize the HTTP request
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };

  let token = await fetch(url, option);
  token = await token.json();
  return token;

}

async function fetchWithAuch(url, method, data) {
  const option = {        // optional second argument
    method,               //  to customize the HTTP request
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      user: token,
    }),
  };
  return await fetch(url, option);
}
