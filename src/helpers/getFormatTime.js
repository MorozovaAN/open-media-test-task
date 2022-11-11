export const getFormatTime = (seconds) => {
  const s = seconds % 60;
  const m = Math.round((seconds - s) / 60) % 60;

  return `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`;
};
