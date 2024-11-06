export const formattedDateHours = (data: string | Date) => {
  const dataObj = new Date(data);

  const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  const horaFormatada = dataObj.toLocaleTimeString("pt-BR", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
  });

  return `${dataFormatada} às ${horaFormatada}`;
};

export const formattedDate = (data: string | Date) => {
  const dataObj = new Date(data);

  const dataFormatada = dataObj.toLocaleDateString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });

  return `${dataFormatada}`;
};
