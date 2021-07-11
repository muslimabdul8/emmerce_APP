import Axios from 'axios'
import { API_URL } from '../../constants/API'


export const registerUser = ()=>{
    return(dispatch)=>{

        const{fullName, username, email, password}=this.state
            Axios.post(`${API_URL}/users`,{
                fullName,
                username,
                email,
                password,
                role:"user",
            })
            .then((result)=>{
               delete result.data.password
                dispatch({
                    type:"USER_LOGIN",
                    payload: result.data
                })
                alert("Berhasil Mendaftar Akun!")
            })
            .catch(()=>{
                alert("Gagal Mendaftarkan Akun!")
            })
    }
}

export const loginUser =({username, password})=>{
    return(dispatch)=>{
        Axios.get(`${API_URL}/users`,{
            params: {
                username,

            }
        })
        .then((result)=>{
            if(result.data.length){
                if (password === result.data[0].password){
                    delete result.data[0].password

                    localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
                    dispatch({
                        type:"USER_LOGIN",
                        payload: result.data[0]
                    })
                }else{
                    //handle error password wrong
                    dispatch({
                        type: "USER_ERROR",
                        payload: "Wrong Password!"
                    })
                }
            }else{
                //handle error username not found
                dispatch({
                    type: "USER_ERROR",
                    payload: "User Not Found!"
                })
            }
        })
        .catch((err)=>{
            alert("Terjadi Kesalahan di server")
        })
    }  
}
export const logoutUser=()=>{
    localStorage.removeItem("userDataEmmerce")

    return {
        type: "USER_LOGOUT",
    }
}

export const userKeepLogin =(userdata)=>{
    return(dispatch)=>{
        Axios.get(`${API_URL}/users`,{
            params: {
                id: userdata.id
            }
        })
        .then((result)=>{
            delete result.data[0].password

                    localStorage.setItem("userDataEmmerce",JSON.stringify(result.data[0]))
            
            dispatch({
                type:"USER_LOGIN",
                payload: result.data[0]
            })
        })
        .catch(()=>{
            alert("Terjadi Kesalahan di server")
        })
    }
}

export const checkStorage = ()=>{
    return{
        type: "CHECK_STORAGE",
    }
}