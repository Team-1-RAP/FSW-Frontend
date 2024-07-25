export const handleNumberOnly = (e: React.KeyboardEvent<HTMLInputElement>) => {
  const key = e.key;
  if (!/^\d+$/.test(key) && e.key !== "Backspace" && e.key !== "Delete" && e.key !== "ArrowLeft" && e.key !== "ArrowRight") {
    e.preventDefault();
  }
};
