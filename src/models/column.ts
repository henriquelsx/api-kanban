export interface column {
  id?: number;
  name: string;
  display_order: number;
  board_id: number; // Relação com o Quadro
}