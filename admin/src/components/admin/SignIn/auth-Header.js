import AuthUser from './AuthUser';

export default function authHeader() {
    const {getToken} = AuthUser();
    const token = JSON.parse(localStorage.getItem('token'));
    if(token){
        console.log("inside authheader" + token);
        return {"Authorization" : 'Bearer '+token};
    }else{
        return {};
    }
}
