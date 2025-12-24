export const formatDate = (dateString, options = {}) => {
  if (!dateString) return "";

  const date = new Date(dateString);

  // Default options: e.g., Jan 01, 2025
  const defaultOptions = {
    year: "numeric",
    month: "short",
    day: "numeric",
  };

  const formatter = new Intl.DateTimeFormat("en-US", { ...defaultOptions, ...options });
  return formatter.format(date);
};
