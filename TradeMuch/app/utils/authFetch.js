const domain = 'http://localhost:1337';
const newUser = {
  email: 'test@gmail.com',
  password: 'testuser',
};

export async function getAuthToken() {
  const domain = 'http://localhost:1337';
  const newUser = {
    email: 'test@gmail.com',
    password: 'testuser',
  };
  const url = `${domain}/auth/token`;
  const requestOption = {
    method: 'post',
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(newUser),
  };

  let token = await fetch(url, requestOption);
  token = await token.json();
  return token;
}

export async function fetchWithAuth(url, method, data) {
  const token = await getAuthToken();
  const requestOption = {        // optional second argument
    method,               //  to customize the HTTP request
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      ...data,
      token,
    }),
  };
  return await fetch(url, requestOption);
}
