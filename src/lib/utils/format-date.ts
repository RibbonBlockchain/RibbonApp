export const formatDate = (
  dateString: Date | undefined
): string | undefined => {
  if (!dateString) {
    return undefined;
  }

  const date = new Date(dateString);
  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatActiveDate = (dateString: string) => {
  const date = new Date(dateString);

  const year = date.getFullYear();
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);

  const formattedDate = `${year}-${month}-${day}`;

  return formattedDate;
};

export const formatDateTime = (
  timestamp: string
): { date: string; time: string } => {
  const date = new Date(timestamp);
  const options: Intl.DateTimeFormatOptions = {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: true,
  };

  const formattedDate = new Intl.DateTimeFormat("en-US", options).format(date);
  const [datePart, timePart] = formattedDate.split(", ");

  return {
    date: datePart.replace(/\//g, "-"),
    time: timePart,
  };
};
