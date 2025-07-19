/**
 * Formatta una data ISO nel formato italiano "19 Luglio alle 20:30"
 * @param {string} dateString - Data in formato ISO (AAAA-MM-GGTHH:MM:SS)
 * @returns {string} Data formattata in italiano
 */
export function formatDateItalian(dateString) {
  if (!dateString) return '-';

  const date = new Date(dateString);

  // Verifica se la data è valida
  if (isNaN(date.getTime())) return dateString;

  // Array dei nomi dei mesi in italiano
  const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${day} ${month} alle ${hours}:${minutes}`;
}

/**
 * Formatta una data ISO nel formato italiano solo data "19 Luglio 2024"
 * @param {string} dateString - Data in formato ISO
 * @returns {string} Data formattata in italiano (solo data)
 */
export function formatDateOnlyItalian(dateString) {
  if (!dateString) return '-';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  const monthNames = [
    'Gennaio',
    'Febbraio',
    'Marzo',
    'Aprile',
    'Maggio',
    'Giugno',
    'Luglio',
    'Agosto',
    'Settembre',
    'Ottobre',
    'Novembre',
    'Dicembre',
  ];

  const day = date.getDate();
  const month = monthNames[date.getMonth()];
  const year = date.getFullYear();

  return `${day} ${month} ${year}`;
}

/**
 * Formatta solo l'ora nel formato "20:30"
 * @param {string} dateString - Data in formato ISO
 * @returns {string} Ora formattata
 */
export function formatTimeOnly(dateString) {
  if (!dateString) return '-';

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return dateString;

  const hours = date.getHours().toString().padStart(2, '0');
  const minutes = date.getMinutes().toString().padStart(2, '0');

  return `${hours}:${minutes}`;
}
