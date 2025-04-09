export const dateWithoutYear = (expenesData) => {
  return expenesData.map((data) => ({
    ...data,
    date: data.date.slice(5), // Elimina el año de la fecha
  }));
}