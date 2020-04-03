import axios from "axios";

export default function login(data) {
  axios
    .get("http://localhost:8080/api/admin/accounts/get-admin")
    .then(res => {
      console.log(res.data);
    })
    .catch(err => {
      console.log(err);
    });
}
