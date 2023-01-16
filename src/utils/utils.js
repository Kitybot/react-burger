export const baseUrl = 'https://norma.nomoreparties.space/api/';

export function checkResponse (res) {
    if (!res.ok) {
      return Promise.reject(` Неудачное обращение к серверу. Код ошибки: ${res.status}.`);
    }
    return res.json();
}