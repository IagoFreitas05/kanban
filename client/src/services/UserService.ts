import {api} from "../utils/api.ts";
import {toast} from "react-toastify";


export async function authUser(){
    try {
        const response = await api.post(`/login`, {
            login: import.meta.env.VITE_USER,
            senha: import.meta.env.VITE_USER_PASSWORD
        }, {
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const token = response.data.token;
        localStorage.setItem("token", token);
        toast.success("Usuário autenticado com sucesso");
    } catch (error) {
       toast.error("não foi possível autenticar");
    }
}
