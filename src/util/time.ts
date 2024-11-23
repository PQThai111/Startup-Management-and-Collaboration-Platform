const timeAgo = (timestamp: string): string => {
  const now = new Date();
  const pastDate = new Date(timestamp);
  const diffInSeconds = Math.floor((now.getTime() - pastDate.getTime()) / 1000);

  const seconds = diffInSeconds;
  const minutes = Math.floor(diffInSeconds / 60);
  const hours = Math.floor(diffInSeconds / 3600);
  const days = Math.floor(diffInSeconds / 86400);

  if (seconds < 60) {
    return 'just now';
  } else if (minutes < 60) {
    return `${minutes} minutes ago`;
  } else if (hours < 24) {
    return `${hours} hours ago`;
  } else if (days < 7) {
    return `${days} days ago`;
  } else {
    return `${pastDate.getDate()}/${pastDate.getMonth()}/${pastDate.getFullYear()}`;
  }
};

const monthBetween = (
  start: Date,
  end: Date,
): {
  text: string;
  value: number;
  year: number;
}[] => {
  const months: { text: string; value: number; year: number }[] = [];
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

  let currentDate = new Date(start);
  while (currentDate <= end) {
    const monthIndex = currentDate.getMonth();
    months.push({
      text: monthNames[monthIndex],
      value: monthIndex + 1,
      year: currentDate.getFullYear(),
    });
    currentDate.setMonth(monthIndex + 1);
  }

  return months;
};

const convertToDateFormat = (dateString: string): string => {
  const date = new Date(dateString);

  // Lấy ngày, tháng, năm
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng bắt đầu từ 0
  const year = date.getFullYear();

  return `${day}-${month}-${year}`;
};

export { timeAgo, monthBetween, convertToDateFormat };
