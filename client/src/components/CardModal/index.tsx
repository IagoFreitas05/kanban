import { useEffect, useState } from "react";
import closeIcon from "../../assets/images/close-icon.svg";
import { ModalBody, Overlay, Actions, FormGroup } from "./styles";
import { changeCard, saveCard } from "../../services/CardService.ts";
import { toast } from "react-toastify";
import { Card } from "../../types/Card.ts";

interface OrderModalProps {
    visible: boolean;
    onClose: () => void;
    onSaveCard: (card: Card) => void;
    currentEdit?: Card;
    onEditCard: (card: Card) => void;
}

export function CardModal({
    visible,
    onClose,
    onSaveCard,
    currentEdit,
    onEditCard,
}: OrderModalProps) {
    const [title, setTitle] = useState<string>("");
    const [content, setContent] = useState<string>("");
    const [formValid, setFormValid] = useState<boolean>(false);
    const [editing, setEditing] = useState<boolean>(false);

    useEffect(() => {
        if (currentEdit) {
            setTitle(currentEdit.titulo);
            setContent(currentEdit.conteudo);
            setEditing(true);
        }

        function handleKeyDown(event: KeyboardEvent) {
            if (event.key === "Escape") {
                onClose();
            }
        }
        document.addEventListener("keydown", handleKeyDown);
        return () => {
            document.removeEventListener("keydown", handleKeyDown);
        };
    }, [onClose]);

    function handleClose() {
        sanitize();
        onClose();
    }
    function handleSaveCard() {
        if (editing && currentEdit) {
            changeCard({
                _id: currentEdit._id,
                lista: currentEdit.lista,
                titulo: title,
                conteudo: content,
            }).then((card) => onEditCard(card.data.card));
            toast.success("Tarefa alterada com sucesso");
        } else {
            saveCard(title, content).then((card) => onSaveCard(card.data.card));
            toast.success("Tarefa salva com sucesso");
        }
        sanitize();
        onClose();
    }

    function sanitize() {
        setContent("");
        setTitle("");
        setEditing(false);
        setFormValid(false);
    }

    if (!visible) {
        return null;
    }

    function verifyFormValid() {
        if (content.length > 0 && title.length > 0) {
            setFormValid(true);
        }
    }
    const handleTitleChange = (event) => {
        setTitle(event.target.value);
        verifyFormValid();
    };

    const handleContentChange = (event) => {
        setContent(event.target.value);
        verifyFormValid();
    };
    return (
        <Overlay>
            <ModalBody>
                <header>
                    <strong>Nova tarefa</strong>
                    <button type="button" onClick={handleClose}>
                        <img src={closeIcon} alt="fechar modal" />
                    </button>
                </header>
                <FormGroup>
                    <input
                        type="text"
                        placeholder="título"
                        value={title}
                        onChange={handleTitleChange}
                    />
                    <textarea
                        placeholder="conteúdo"
                        value={content}
                        onChange={handleContentChange}
                    ></textarea>
                    <small>todos os campos são necessários*</small>
                </FormGroup>
                <Actions>
                    <button
                        disabled={!formValid}
                        onClick={handleSaveCard}
                        type="button"
                        className="primary"
                    >
                        <strong>Salvar</strong>
                    </button>
                    <button
                        onClick={handleClose}
                        type="button"
                        className="secondary"
                    >
                        <strong>Cancelar</strong>
                    </button>
                </Actions>
            </ModalBody>
        </Overlay>
    );
}
