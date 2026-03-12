import { describe, it, expect } from 'vitest';
import { moveCardSchema } from '../src/schemas/card.schema.js';

describe('Card Move Validation', () => {
  it('deve permitir IDs de coluna válidos', () => {
    const data = { column_id: 10 };
    expect(() => moveCardSchema.parse(data)).not.toThrow();
  });

  it('deve bloquear IDs negativos ou zero', () => {
    const data = { column_id: -1 };
    expect(() => moveCardSchema.parse(data)).toThrow();
  });
});