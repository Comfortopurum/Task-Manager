export const formatDate = (date: Date): string => {
    return date.toLocaleDateString('en-US', {
      weekday: 'short',
      month: 'short',
      day: 'numeric'
    });
  };
  
  export const isSameDay = (date1: Date, date2: Date): boolean => {
    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  };
  
  export const getStartOfWeek = (date: Date): Date => {
    const result = new Date(date);
    const day = date.getDay();
    result.setDate(date.getDate() - day);
    result.setHours(0, 0, 0, 0);
    return result;
  };
  
  export const getStartOfMonth = (date: Date): Date => {
    const result = new Date(date);
    result.setDate(1);
    result.setHours(0, 0, 0, 0);
    return result;
  };