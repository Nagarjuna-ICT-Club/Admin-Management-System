import jwtDecode from "jwt-decode"

export default function isAuthenticated() {
  let token = localStorage.getItem("access-token");
  if(token === null) return false
   
  const { exp } = jwtDecode(token.split(" ")[1]);
  if (exp < (new Date().getTime() + 1) / 1000) {
    return false;
  }else{
    return true
  }
}
