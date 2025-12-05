# Hanukiá Interativa

Uma aplicação web interativa para celebrar Chanucá, desenvolvida com React, Tailwind CSS e Framer Motion.

## Funcionalidades

- **Hanukiá Interativa**: Arraste o Shamash (vela central) para acender as outras velas.
- **Animações Realistas**: Chamas com animação de flicker e brilho.
- **Lógica de Chanucá**:
  - Identifica o dia atual (simulado ou real).
  - Permite acender apenas as velas permitidas para o dia.
  - Segue a tradição: posicionamento da direita para a esquerda.
- **Persistência**: O estado das velas é salvo automaticamente no navegador.
- **Controles**: Botão para reiniciar e seletor de dia para simulação.

## Como Rodar

1. Instale as dependências:
   ```bash
   npm install
   ```

2. Rode o servidor de desenvolvimento:
   ```bash
   npm run dev
   ```

3. Abra o navegador no link indicado (geralmente `http://localhost:5173`).

## Tecnologias

- **React**: Biblioteca de UI.
- **Tailwind CSS**: Estilização.
- **Framer Motion**: Animações e Drag & Drop.
- **Vite**: Build tool.

## Estrutura

- `src/components/Hanukia.jsx`: Componente principal com a lógica.
- `src/components/Candle.jsx`: Componente visual da vela.
- `src/components/Shamash.jsx`: Componente do Shamash arrastável.
- `src/utils/chanukahDate.js`: Lógica de datas.
