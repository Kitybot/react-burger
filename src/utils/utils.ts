export const baseUrl = 'https://norma.nomoreparties.space/api/';
export const wsBaseUrl = 'wss://norma.nomoreparties.space/orders';

export async function checkResponse (res: Response) {
    if (!res.ok) {
      let message: string;
      try {
        const data: {message?: string} = await res.json();
        message = data.message ? 
          `Код ошибки: ${res.status}. Ответ сервера: ${data.message}.` :
          ` Неудачное обращение к серверу. Код ошибки: ${res.status}.`;
      } catch (err) {
        message = ` Неудачное обращение к серверу. Код ошибки: ${res.status}. 
          Ошибка: ${err}`;
      }
      return Promise.reject(message);
    }
    return res.json();
  }
export function setCookie(name: string,
                          value: string,
                          props:{  [name: string]: any; 
                            path?: string; 
                            "max-age"?: number; 
                            expires?: any; } ) {
  props = props || {};
  let exp = props.expires;
  if (typeof exp == 'number' && exp) {
    const d = new Date();
    d.setTime(d.getTime() + exp * 1000);
    exp = props.expires = d;
  }
  if (exp && exp.toUTCString) {
    props.expires = exp.toUTCString();
  }
  value = encodeURIComponent(value);
  let updatedCookie = name + '=' + value;
  for (const propName in props) {
    updatedCookie += '; ' + propName;
    const propValue = props[propName];
    if (propValue !== true) {
      updatedCookie += '=' + propValue;
    }
  }
  document.cookie = updatedCookie;
}

export function getCookie(name: string) {
  let matches = document.cookie.match(new RegExp(
    "(?:^|; )" + name.replace(/([\.$?*|{}\(\)\[\]\\\/\+^])/g, '\\$1') + "=([^;]*)"
  ));
  return matches ? decodeURIComponent(matches[1]) : undefined;
}
export function getAccessTokenOutCookie() {
  const token = 'Bearer ' + getCookie('accessToken');
  return token;
}

export const timeString = (orderTime: string, currentDate: Date) => {
  const [orderDay, other] = orderTime.split('T');
  const orderDate =  new Date(new Date(orderDay).toDateString());
  const pastDays = (currentDate.getTime() - orderDate.getTime()) / 86400000;
  let days: string;
  switch (pastDays) {
    case 0 :
      days = 'Сегодня,';
      break;
    case 1 :
      days = 'Вчера,';
      break;
    default :
      const StringPastDays = String(pastDays);
      const lastGigtPastDays = parseInt(StringPastDays.slice(-1));
      const lastTwoGigtPastDays = parseInt(StringPastDays.slice(-2));
      if (lastGigtPastDays === 1 && lastTwoGigtPastDays > 20) {
        days = `${pastDays} дeнь назад,`;
      } else if (lastGigtPastDays >= 2 && lastGigtPastDays <= 4 && 
          (lastTwoGigtPastDays < 10 || lastTwoGigtPastDays > 21)) {
        days = `${pastDays} дня назад,`;
      } else {
        days = `${pastDays} дней назад,`;
      }
  }
  const time = other.slice(0, 5);
  const gmt = new Date(orderTime).getTimezoneOffset() / -60
  const timeZone = `i-GMT${gmt >=0 && '+'}${gmt}`;
  return `${days} ${time} ${timeZone}`;
};

export function countingPrice(type: string,
                              price: number,
                              previousValue: {  burgerPrice: number; 
                                burgerIngredients?: JSX.Element[]; 
                                liste?: JSX.Element[]; }) {
  if (type === "bun") {
    previousValue.burgerPrice += price * 2;
  } else {
    previousValue.burgerPrice += price;
  }
}

export const getOrderStatus = (status: string | undefined) => {
  switch (status) {
    case 'created':
      return 'Создан';
    case 'pending':
      return 'Готовится';
    case 'done':
      return 'Выполнен';
    case 'cancell':
      return 'Отменён'
    default:
      return;
  }
}