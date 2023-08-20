export interface Card{
    _id: string;
    titulo: string;
    conteudo: string;
    lista: "TO_DO" | "DOING" | "DONE";
}
