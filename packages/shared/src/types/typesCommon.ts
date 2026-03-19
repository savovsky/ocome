import { keysLanguage } from '../keys/keysLanguage';

// Usage:
// const someKeys = { ABC: 'a_b_c', DEF: 'd_e_f', GHI: 'g_h_i' }
// ObjectValues<typeof someKeys> => 'a_b_c' | 'd_e_f' | 'g_h_i'
export type ObjectValues<T extends object> = T[keyof T];

export type ILanguage = ObjectValues<typeof keysLanguage>;
