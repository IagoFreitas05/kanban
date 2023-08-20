import { api } from "../utils/api.ts";
import {toast} from "react-toastify";
import {Card} from "../types/Card.ts";

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

export async function changeCard(card: Card) {
    try {
        return await api.put(
            `/cards/${card._id}`,
            {
                titulo: card.titulo,
                conteudo: card.conteudo,
                lista: card.lista,
            },
            {
                headers: {
                    "Content-type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (e) {
        toast.error("não foi possível atualizar esse card");
    }
}

export async function deleteCard(id: string) {
    try {
        return await api.delete(
            `cards/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );
    } catch (e) {
        return e;
    }
}

