const dateGenerator = () => {
  // 20 June 1995 - the first APOD
  const start = new Date(1995, 5, 20);

  // Today - the last APOD
  const end = new Date();

  // Random APOD date
  const random = new Date(
    start.getTime() + Math.random() * (end.getTime() - start.getTime())
  );

  // Return a string in APOD api format
  return random.toISOString().substr(0, 10);
};

export default dateGenerator;
