export const generateFlatData = () => {
  const data = [];
  const startDate = new Date(); // Starting date and time

  for (let i = 0; i < 1000; i++) {
    const timestamp = startDate.getTime() + i * 3600; // Increment by 1 hour
    data.push({ x: timestamp, y: 0.0 });
  }
  /**
   * For SVG and gradient/glow filter limiation we can't have exactly have a flat line.
   * If it's completely flat, the line will not show up, due to svg spec
   * And if there is very little variant the gradient and glow filter will not show up
   * https://github.com/recharts/recharts/issues/1234
   */
  data[0].y += 0.005;
  data[data.length - 1].y -= 0.005;

  return data;
};

export const downsampleData = <T>(data: T[], numberOfPoints = 50) => {
  if (data.length <= numberOfPoints || numberOfPoints <= 2) return data;

  const selectedPoints = [];
  const step = (data.length - 2) / (numberOfPoints - 2);

  selectedPoints.push(data[0]); // Include the first data point

  for (let i = 1; i < numberOfPoints - 1; i++) {
    const index = Math.round(i * step);
    selectedPoints.push(data[index]);
  }

  selectedPoints.push(data[data.length - 1]); // Include the last data point

  return selectedPoints;
};
