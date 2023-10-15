export const saveDataToLocalStorage = (data: Record<string, string>): void => {
  for (const key in data) {
    if (typeof data[key] !== "object" && data[key] !== null) {
      localStorage.setItem(key, data[key]);
      continue;
    }
    localStorage.setItem(key, JSON.stringify(data[key]));
  }
};

export const clearLocalStorage = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
