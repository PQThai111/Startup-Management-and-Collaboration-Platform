import { StartupCategory } from '../constant/startup_category';

export function convertToFormData(obj: any): FormData {
  const formData = new FormData();

  // Duyệt qua các thuộc tính của object và thêm vào FormData
  for (const key in obj) {
    if (obj.hasOwnProperty(key)) {
      const value = obj[key];

      // Xử lý giá trị null/undefined hoặc kiểu phức tạp
      if (value === null || value === undefined) {
        continue;
      } else if (typeof value === 'boolean') {
        // Boolean chuyển thành chuỗi "true"/"false"
        formData.append(key, value.toString());
      } else if (typeof value === 'object' && !(value instanceof File)) {
        // Object phức tạp (nếu có) chuyển thành JSON
        formData.append(key, JSON.stringify(value));
      } else {
        // Các kiểu dữ liệu khác
        formData.append(key, value as string);
      }
    }
  }

  return formData;
}

export const getEnumObjects = (): { key: number; label: string }[] => {
  return Object.entries(StartupCategory)
    .filter(([_, value]) => !isNaN(Number(value)))
    .map(([key, value]) => ({
      key: Number(value),
      label: key,
    }));
};


export function getWeekOfMonth(date: Date) {
  const startOfMonth = new Date(date.getFullYear(), date.getMonth(), 1); // First day of the month
  const currentDay = date.getDate(); // Current day of the month
  const startDayOfWeek = startOfMonth.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)

  // Calculate the offset from the first week
  const offset = startDayOfWeek;
  const daysPassed = currentDay + offset - 1; // Adjust for the offset
  const weekNumber = Math.ceil(daysPassed / 7);

  return weekNumber;
}

export function getWeekDates(date: Date) {
  const currentDayOfWeek = date.getDay(); // Day of the week (0 = Sunday, 6 = Saturday)
  const currentDate = date.getDate(); // Day of the month

  // Adjust to get the Monday of the current week
  const startOfWeek = new Date(date);
  startOfWeek.setDate(currentDate - currentDayOfWeek + (currentDayOfWeek === 0 ? -6 : 1)); // Monday adjustment

  // Calculate all the dates of the week (Monday to Sunday)
  const weekDates = [];
  for (let i = 0; i < 7; i++) {
      const weekDate = new Date(startOfWeek);
      weekDate.setDate(startOfWeek.getDate() + i);
      weekDates.push(weekDate);
  }

  return weekDates;
}

export function parseTimeSlot(inputString: string): { startTime: string; endTime: string } | null {
  // Check if the input string is valid
  if (typeof inputString !== 'string' || inputString.trim() === '') {
    console.error('Invalid input: input string is empty or not a string');
    return null;
  }

  try {
    // Split the string into parts
    const a = inputString.split('-').map(x => x.trim());
    if (a.length < 3) {
      console.error('Invalid input: expected format "datePart - startPart - endPart"');
      return null;
    }

    const [datePart, startPart, endPart] = a;

    // Validate the datePart
    const baseDate = new Date(datePart);
    if (isNaN(baseDate.getTime())) {
      console.error('Invalid input: datePart is not a valid date');
      return null;
    }

    // Validate time parts (HH:MM format)
    const timeRegex = /^\d{1,2}:\d{2}$/;
    if (!timeRegex.test(startPart) || !timeRegex.test(endPart)) {
      console.error('Invalid input: startPart or endPart does not match "HH:MM" format');
      return null;
    }

    // Replace the time in datePart with startPart and endPart
    const updatedDateStart = datePart.replace(/\d{2}:\d{2}:\d{2}/, `${startPart}:00`);
    const updatedDateEnd = datePart.replace(/\d{2}:\d{2}:\d{2}/, `${endPart}:00`);

    const startTime = new Date(updatedDateStart);
    const endTime = new Date(updatedDateEnd);

    // Validate parsed dates
    if (isNaN(startTime.getTime()) || isNaN(endTime.getTime())) {
      console.error('Invalid input: resulting startTime or endTime is not a valid date');
      return null;
    }

    const formatDate = (date: Date): string => {
      const year = date.getFullYear();
      const month = String(date.getMonth() + 1).padStart(2, '0');
      const day = String(date.getDate()).padStart(2, '0');
      const hours = String(date.getHours()).padStart(2, '0');
      const minutes = String(date.getMinutes()).padStart(2, '0');
      const seconds = String(date.getSeconds()).padStart(2, '0');
      const milliseconds = String(date.getMilliseconds()).padStart(3, '0');

      // Add the timezone offset manually (GMT+0700)
      return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}.${milliseconds}Z`;
    };

    const startTimeString = formatDate(startTime);
    const endTimeString = formatDate(endTime);

    return { startTime: startTimeString , endTime: endTimeString };
  } catch (error) {
    console.error('Error parsing time slot:', error);
    return null; // Return null if there's an error parsing the input string
  }
}
