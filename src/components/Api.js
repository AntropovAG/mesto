class Api {
  constructor({baseUrl, headers}) {
    this._baseUrl = baseUrl;
    this._userUrl = `${baseUrl}/users/me`;
    this._cardsUrl = `${baseUrl}/cards`;
    this._token = headers['authorization'];
  }

getInitialCards() {
  return fetch(`${this._baseUrl}/cards`, {
    headers: {
      authorization: this._token
    }
  })
    .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

postCard({name, link}) {
  return fetch(`${this._baseUrl}/cards`, {
    method: 'POST',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, link })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

deleteCard(id) {
  return fetch(`${this._baseUrl}/cards/${id}`, {
    method: 'DELETE',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

getUserInfo() {
  return fetch(`${this._baseUrl}/users/me`, {
    headers: {
      authorization: this._token
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

editProfile({name, about}) {
  return fetch(`${this._baseUrl}/users/me`, {
    method: 'PATCH',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ name, about })
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

addLike(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: 'PUT',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

removeLike(id) {
  return fetch(`${this._baseUrl}/cards/${id}/likes`, {
    method: 'DELETE',
    headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.ok ? res.json() : Promise.reject(`Ошибка ${res.status}`));
}

}

export const api = new Api({
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-39',
  headers: {
    authorization: 'c3097d83-d49e-4d71-ba65-6919ed7f0993',
    'Content-Type': 'application/json'
  }
});
