const quarterToDate = (quarter: string) => {
  if (quarter.includes("1Q")) return new Date(`${quarter.slice(0, 4)}-01-01`);
  if (quarter.includes("2Q")) return new Date(`${quarter.slice(0, 4)}-04-01`);
  if (quarter.includes("3Q")) return new Date(`${quarter.slice(0, 4)}-07-01`);
  return new Date(`${quarter.slice(0, 4)}-10-01`);
};

const dateToQuarter = (date: Date) => {
  const fullYear = date.getFullYear();
  const month = date.getUTCMonth() + 1;

  const quarter = (() => {
    if (month <= 3) return "1Q";
    if (month <= 6) return "2Q";
    if (month <= 9) return "3Q";
    return "4Q";
  })();
  return quarter === "1Q" ? `${fullYear}.${quarter}` : quarter;
};

const convertNiceGap = (range: [number, number]) => {
  const diff = Math.abs(range[0] - range[1]);

  return [
    1000000,
    2000000,
    5000000,
    10000000,
    20000000,
    50000000,
    100000000,
    200000000,
    500000000,
    1000000000,
    2000000000,
    5000000000,
    10000000000,
  ].find((gap) => diff / gap <= 10)!;
};

const convertNiceDomain = (domain: [number, number]): [number, number] => {
  return [
    Math.floor(domain[0] / Math.pow(10, `${domain[0]}`.length - 2)) * Math.pow(10, `${domain[0]}`.length - 2),
    Math.ceil(domain[1] / Math.pow(10, `${domain[1]}`.length - 2)) * Math.pow(10, `${domain[1]}`.length - 2),
  ];
};

const generateNiceTicks = (gap: number, domain: [number, number]) => {
  const ticks = [] as number[];
  for (let tick = domain[0]; tick <= domain[1];) {
    ticks.push(tick);
    tick += gap;
  }
  return ticks;
};

export default {
  quarterToDate,
  dateToQuarter,
  convertNiceGap,
  convertNiceDomain,
  generateNiceTicks,
};
