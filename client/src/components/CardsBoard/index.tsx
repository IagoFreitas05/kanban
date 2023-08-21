import { Board, OrdersContainer } from "./style";
import { Card } from "../../types/Card.ts";
import { changeCard, deleteCard } from "../../services/CardService.ts";
import { toast } from "react-toastify";
import {marked} from 'marked';

interface OrdersBoardProps {
    icon: string;
    title: string;
    orders: Card[];
    onCancelOrder: (orderId: string) => void;
    onChangeOrderStatus: (orderId: string, lista: Card["lista"]) => void;
    onCurrentEdited: (card: Card) => void;
}

export function OrdersBoard({
    icon,
    title,
    orders,
    onCancelOrder,
    onChangeOrderStatus,
    onCurrentEdited,
}: OrdersBoardProps) {
    const convertToHtml = (conteudo: string) => {
        return marked(conteudo);
    };
    function handleCancelOrder(id: string) {
        deleteCard(id)
            .then(() => toast.success("Tarefa removida"))
            .catch(() => toast.error("Não foi possível remover a tarefa"));
        onCancelOrder(id);
    }

    function handleChangeList(card: Card) {
        let updatedStatus = card.lista;

        if (updatedStatus === "TO_DO") {
            updatedStatus = "DOING";
        } else {
            updatedStatus = "DONE";
        }
        card.lista = updatedStatus;
        changeCard(card);
        onChangeOrderStatus(card._id, updatedStatus);
    }

    function handleEdited(card: Card) {
        onCurrentEdited(card);
    }

    return (
        <Board>
            <header>
                <span>{icon}</span>
                <strong>{title}</strong>
                <span>{orders.length}</span>
            </header>
            {orders.length > 0 && (
                <OrdersContainer>
                    {orders.map((card) => (
                        <>
                            <div key={card._id}>
                                <strong>
                                    <button onClick={() => handleEdited(card)}>
                                        ✎
                                    </button>{" "}
                                    {card.titulo}
                                </strong>
                                <span className="content" dangerouslySetInnerHTML={{ __html: convertToHtml(card.conteudo)  }} />
                                <span className="buttons-container">
                                    <button
                                        onClick={() =>
                                            handleCancelOrder(card._id)
                                        }
                                    >
                                        🗑️
                                    </button>
                                    {card.lista != "DONE" && (
                                        <button
                                            onClick={() =>
                                                handleChangeList(card)
                                            }
                                        >
                                            {" "}
                                            →{" "}
                                        </button>
                                    )}
                                </span>
                            </div>
                        </>
                    ))}
                </OrdersContainer>
            )}
        </Board>
    );
}
