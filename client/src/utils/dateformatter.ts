export function formatDate(dateString?: string): string {
  if (!dateString) return "";

  const date = new Date(dateString);

  if (isNaN(date.getTime())) return "Invalid Date"; 

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium", 
  }).format(date);
}
