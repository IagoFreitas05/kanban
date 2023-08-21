import { Request, Response } from "express";
import { Card } from "../../models/Card";
import { marked } from "marked";
import { sanitize } from "isomorphic-dompurify";

export async function createCard(req: Request, res: Response) {
  const { titulo, conteudo, lista } = req.body;
  const errors = [];

  if (!titulo || titulo === "") {
    errors.push("Título é necessário");
  }
  if (!conteudo || conteudo === "") {
    errors.push("Conteúdo é necessário");
  }
  if (!lista || lista === "") {
    errors.push("Lista é necessário");
  }

  if (!["TO_DO", "DOING", "DONE"].includes(lista)) {
    errors.push("O nome da sua lista precisa ser: TO_DO, DOING ou DONE");
  }

  if (errors.length > 0) {
    res.status(400).json({ errors });
  } else {
    const sanitizedTest = sanitize(conteudo);
    const card = await Card.create({ conteudo: sanitizedTest, titulo, lista });
    res.status(200).json({ card });
  }
}
