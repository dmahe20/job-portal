
import Cookies from 'js-cookie';
export const getLoggedInUser = () => {
// Decode the URL-encoded string

    const userData = {};
    userData["emailId"] = Cookies.get("email");
    userData["userType"] = Cookies.get("userType");
    if(userData["emailId"]) return userData;
    return null;
}
