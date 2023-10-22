export const getCurrentDate = () => {
  const currentDate = new Date();
  const year = currentDate.getUTCFullYear();
  const month = new Intl.DateTimeFormat("en-US", { month: "short" }).format(
    currentDate
  );
  const day = currentDate.getUTCDate();
  const hour = currentDate.getUTCHours();
  const minutes = currentDate.getUTCMinutes();

  const createTime = `${month} ${day}, ${year} at ${hour}:${
    minutes < 10 ? "0" + minutes : minutes
  }`;
  return createTime;
};
