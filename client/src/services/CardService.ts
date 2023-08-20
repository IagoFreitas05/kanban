import { api } from "../utils/api.ts";
import { toast } from "react-toastify";

const token = localStorage.getItem("token");

export async function listCard() {
    try {
        return await api.get("cards", {
            headers: {
                "Content-type": "application/json",
                Authorization: `Bearer ${token}`,
            },
        });
    } catch (e) {
        toast.error("não foi possível resgatar os cards");
    }
}

export async function saveCard(titulo: string, conteudo: string) {
    try {
        return await api.post(
            "cards",
            {
                titulo: titulo,
                conteudo: conteudo,
                lista: "TO_DO",
            },
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (e) {
        toast.error("não foi possível salvar esse card");
    }
}
