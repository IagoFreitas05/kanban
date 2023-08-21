import { Request, Response } from "express";
import { Card } from "../../models/Card";
import {sanitize} from "isomorphic-dompurify";
import {marked} from "marked";

export async function changeCard(req: Request, res: Response) {
  const { titulo, conteudo, lista } = req.body;
  const { id } = req.params;

  const errors = [];
  if (!titulo) errors.push("Título é necessário");
  if (!conteudo) errors.push("Conteúdo é necessário");
  if (!lista || !["TO_DO", "DOING", "DONE"].includes(lista)) {
    errors.push("Lista é necessária e deve ser TO_DO, DOING ou DONE");
  }

  if (errors.length > 0) {
    return res.status(400).json({ errors });
  }

  try {
    const sanitized = sanitize(conteudo);
    const card = await Card.findByIdAndUpdate(
      id,
      { titulo, conteudo: sanitized, lista },
      { new: true },
    );

    if (!card) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    res.status(200).json({ card });
  } catch (error) {
    console.error("Error updating card:", error);
    res.status(500).json({ error: "Não foi possível atualizar o card" });
  }
}
