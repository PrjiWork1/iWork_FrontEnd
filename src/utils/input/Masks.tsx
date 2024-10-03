export const maskCPF = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{3})(\d)/, "$1.$2") // Adiciona o primeiro ponto
    .replace(/^(\d{3}\.\d{3})(\d)/, "$1.$2") // Adiciona o segundo ponto
    .replace(/(\d{3})(\d{1,2})$/, "$1-$2"); // Adiciona o traço
};

export const maskData = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{2})(\d)/, "$1/$2") // Adiciona a barra após o dia
    .replace(/^(\d{2})\/(\d{2})(\d)/, "$1/$2/$3"); // Adiciona a barra após o mês
};

export const maskPhone = (value: string) => {
  return value
    .replace(/\D/g, "") // Remove caracteres não numéricos
    .replace(/^(\d{2})(\d)/, "($1) $2") // Adiciona parênteses
    .replace(/^(\(\d{2}\)) (\d{5})(\d)/, "$1 $2-$3") // Adiciona traço
    .replace(/(\d{2})(\d{4})$/, "$1-$2"); // Para números menores
};
