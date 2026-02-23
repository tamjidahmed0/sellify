import Cookies from "js-cookie";

const setCookie = (name: string, value: string, days: number) => {
  Cookies.set(name, value, { expires: days });
};

export default setCookie;