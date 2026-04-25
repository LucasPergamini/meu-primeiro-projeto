export type Produto = {
  id: number;
  nome: string;
  preco: number;
  estoque: number;
  categoria: string;
};

export const estoque: Produto[] = [
  { id: 1, nome: "Anel de Ouro 18k", preco: 1200, estoque: 10, categoria: "anel" },
  { id: 2, nome: "Anel de Prata com Zircônia", preco: 250, estoque: 15, categoria: "anel" },
  { id: 3, nome: "Anel Solitário Diamante", preco: 3500, estoque: 3, categoria: "anel" },

  { id: 4, nome: "Colar de Ouro 18k", preco: 1800, estoque: 8, categoria: "colar" },
  { id: 5, nome: "Colar de Prata Fino", preco: 300, estoque: 20, categoria: "colar" },
  { id: 6, nome: "Colar com Pingente Coração", preco: 450, estoque: 12, categoria: "colar" },

  { id: 7, nome: "Pulseira de Ouro", preco: 1500, estoque: 6, categoria: "pulseira" },
  { id: 8, nome: "Pulseira de Prata", preco: 280, estoque: 18, categoria: "pulseira" },
  { id: 9, nome: "Pulseira com Berloques", preco: 600, estoque: 9, categoria: "pulseira" },

  { id: 10, nome: "Brinco de Ouro Pequeno", preco: 500, estoque: 14, categoria: "brinco" },
  { id: 11, nome: "Brinco de Prata Argola", preco: 180, estoque: 25, categoria: "brinco" },
  { id: 12, nome: "Brinco com Pedra Azul", preco: 350, estoque: 11, categoria: "brinco" },

  { id: 13, nome: "Relógio Luxo Dourado", preco: 2500, estoque: 4, categoria: "relogio" },
  { id: 14, nome: "Relógio Prata Clássico", preco: 900, estoque: 7, categoria: "relogio" },
  { id: 15, nome: "Relógio Esportivo", preco: 650, estoque: 10, categoria: "relogio" },

  { id: 16, nome: "Pingente Cruz Ouro", preco: 400, estoque: 13, categoria: "pingente" },
  { id: 17, nome: "Pingente Letra Personalizada", preco: 220, estoque: 16, categoria: "pingente" },
  { id: 18, nome: "Pingente Coração Prata", preco: 190, estoque: 19, categoria: "pingente" },

  { id: 19, nome: "Tornozeleira de Prata", preco: 210, estoque: 17, categoria: "tornozeleira" },
  { id: 20, nome: "Tornozeleira Ouro Delicada", preco: 520, estoque: 9, categoria: "tornozeleira" },

  { id: 21, nome: "Conjunto Colar e Brinco Ouro", preco: 2200, estoque: 5, categoria: "conjunto" },
  { id: 22, nome: "Conjunto Prata Completo", preco: 780, estoque: 8, categoria: "conjunto" }
];