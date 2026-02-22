import Cookies from "js-cookie"
const deleteCookie = (name: string) => Cookies.remove(name);   
export default deleteCookie;
    