import { Request, Response } from "express";
import { Card } from "../../models/Card";

export async function deleteCard(req: Request, res: Response) {
  try {
    const { id } = req.params;
    const deletedCard = await Card.findByIdAndDelete(id);

    if (!deletedCard) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Erro ao deletar o card:", error);
    res.status(500).json({ error: "Não foi possível deletar o card" });
  }
}
