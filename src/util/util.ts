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
