export const dateTimeFormatter = timestamp => {
  let options = {
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    };

  let date = new Date(timestamp);
  return date.toLocaleDateString("en-us", options);
}
