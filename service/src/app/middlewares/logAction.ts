import { NextFunction, Request, Response } from "express";
import { Card } from "../models/Card";

const methodMap = {
  PUT: "Alterado",
  DELETE: "Removido"
};

export const logAction = async (req: Request, res: Response, next: NextFunction) => {
  const method = req.method;
  const actionText = methodMap[method as keyof typeof methodMap] || "Ação desconhecida";
  const { id } = req.params;

  try {
    const deletedCard = await Card.findById(id);
    if (!deletedCard) {
      return res.status(404).json({ error: "Card não encontrado" });
    }

    const now = new Date();
    const formattedDate = formatDate(now);

    console.log(`${formattedDate} - ${deletedCard.titulo} ${id} - ${actionText}`);
    next();
  } catch (error) {
    console.error("Erro ao registrar ação:", error);
    res.status(500).json({ error: "Não foi possível realizar a ação" });
  }
};

function formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');
  const seconds = String(date.getSeconds()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}:${seconds}`;
}
