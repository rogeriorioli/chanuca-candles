import { GoogleGenerativeAI } from "@google/generative-ai";

export default async function handler(req, res) {
  const API_KEY = process.env.GEMINI_API_KEY;

  if (!API_KEY) {
    return res.status(500).json({
      title: "Configuração Necessária",
      content: "A chave de API GEMINI_API_KEY não foi configurada no ambiente do servidor."
    });
  }

  try {
    const genAI = new GoogleGenerativeAI(API_KEY);
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash", temperature: 0.7 });

    const randomSeed = Math.floor(Math.random() * 1000000);

    const prompt = `Gere conteúdo criativo sobre Chanucá (Hanukkah). Seed aleatória: ${randomSeed}.
    
    Escolha ALEATORIAMENTE E SEM REPETIR O ANTERIOR APENAS UM dos seguintes tópicos:
    1. Uma história curta e inspiradora sobre Chanucá (diferente das comuns).
    2. Uma receita tradicional de Chanucá (como Latkes, Sufganiyot, Kugel, etc) com ingredientes e modo de preparo.
    3. Três curiosidades históricas ou culturais POUCO CONHECIDAS sobre a festividade.
    4. Uma explicação sobre o significado de um dos dias de Chanucá.

    Responda em Português do Brasil.
    
    Formate a resposta como um objeto JSON válido com dois campos: 
    "title" (um título curto e chamativo) 
    e "content" (o texto completo do conteúdo, pode ter quebras de linha).
    Não use markdown no JSON, apenas texto puro.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    const puredText = text.replace(/```json/g, '').replace(/```/g, '').trim();

    try {
        const json = JSON.parse(puredText);
        return res.status(200).json(json);
    } catch (e) {
        return res.status(200).json({
            title: "Chanucá",
            content: text
        });
    }

  } catch (error) {
    console.error("Erro ao conectar com Gemini:", error);
    return res.status(500).json({
      title: "Erro de Conexão",
      content: "Desculpe, não conseguimos buscar o conteúdo agora. Tente novamente mais tarde."
    });
  }
}
