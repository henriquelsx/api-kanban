export interface card {
  id?: number;
  title: string;
  description?: string;
  author_id: number; // Referência ao Usuário (Autor)
  column_id: number; // Referência à Coluna
}