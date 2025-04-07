export const generateCode = (length: number) => {
  const code = Math.floor(Math.random() * 1000000);
  return code.toString().padStart(length, "0");
};
