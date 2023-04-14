export const parseIndex = (name: string) => {
  const regex = /all_units\[(\d+)\]/;
  const match = name.match(regex);
  return match ? parseInt(match[1]) : -1;
};

export const isAlphabetOnly = (str: string): boolean => {
  const regex = /^[a-zA-Z]*$/;
  return regex.test(str);
};
