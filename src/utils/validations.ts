export function validateEmail (email: string){
  var re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return re.test(String(email).toLowerCase()) ? '' : 'Invalid email';
}

export function validateUsername (username: string){
  return username.length >= 6 ? '' : 'Username minimum 6 characters';
}

export function validatePassword (pass: string){
  return pass.length <= 5 ? 'Password must be more than 5 characters' : '';
}

export function isEmpty (text: string, value: string){
  return value !== undefined
    ? value.length > 0 ? '' : `${text} must be filled`
    : '';
}

export function validateUrlOrEmpty (url: string){
  if (url === '') return '';
  return validateUrl(url);
}

export function validateUrl (url: string){
  return /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w.-]+)+[\w\-._~:/?#[\]@!$&'()*+,;=.]+$/.test(
    url
  )
    ? ''
    : 'Invalid url';
}
