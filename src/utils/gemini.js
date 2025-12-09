export const fetchChanukahContent = async () => {
  try {
    const response = await fetch('/api/gemini');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Erro ao conectar com Gemini:", error);
    return {
      title: "Erro de Conexão",
      content: "Desculpe, não conseguimos buscar o conteúdo agora. Tente novamente mais tarde."
    };
  }
};
