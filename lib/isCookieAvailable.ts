import Cookies from "js-cookie";

const isCookieAvailable = (cookieName: string): boolean =>{
    const cookieValue = Cookies.get(cookieName);
    return cookieValue !== undefined;
}
export default isCookieAvailable;