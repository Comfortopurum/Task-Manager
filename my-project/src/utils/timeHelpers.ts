export const formatDuration = (minutes: number): string => {
    if (minutes < 60) {
      return `${minutes}m`;
    }
    
    const hours = Math.floor(minutes / 60);
    const remainingMinutes = minutes % 60;
    
    if (remainingMinutes === 0) {
      return `${hours}h`;
    }
    
    return `${hours}h ${remainingMinutes}m`;
  };
  
  export const getTimeFromMinutes = (minutes: number): { hours: number; minutes: number } => {
    return {
      hours: Math.floor(minutes / 60),
      minutes: minutes % 60
    };
  };