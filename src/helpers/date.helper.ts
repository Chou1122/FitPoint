export const getMonthName = (input: number | Date) => {
  const monthNames = [
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ];

  let monthNumber;

  if (input instanceof Date) {
    monthNumber = input.getMonth() + 1;
  } else if (typeof input === 'number') {
    monthNumber = input;
  } else {
    return 'Invalid input';
  }

  if (monthNumber < 1 || monthNumber > 12) {
    return 'Invalid month';
  }

  return monthNames[monthNumber - 1];
};

export const formatMonthYear = (date: Date) => {
  if (!(date instanceof Date)) {
    return 'Invalid date';
  }

  const month = (date.getMonth() + 1).toString().padStart(2, '0'); // luôn 2 chữ số
  const year = date.getFullYear();

  return `${month}/${year}`;
};

export function getDaysInMonth(date: Date) {
  const year = date.getFullYear();
  const month = date.getMonth(); // Tháng bắt đầu từ 0, do đó không cần phải điều chỉnh
  const lastDayOfMonth = new Date(year, month + 1, 0); // Lấy ngày cuối cùng của tháng
  return lastDayOfMonth.getDate(); // Trả về số ngày trong tháng
}
