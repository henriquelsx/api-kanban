import { describe, it, expect } from 'vitest';
import { userSchema } from '../src/schemas/user.schema.js';

describe('User Schema Validation', () => {
  it('deve passar com dados válidos', () => {
    const data = { name: 'Henrique', email: 'devops@teste.com', phone: '11999998888' };
    expect(() => userSchema.parse(data)).not.toThrow();
  });

  it('deve falhar com e-mail mal formatado', () => {
    const data = { name: 'Henrique', email: 'email-invalido', phone: '11999998888' };
    expect(() => userSchema.parse(data)).toThrow();
  });
});