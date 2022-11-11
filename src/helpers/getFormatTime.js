export const getFormatTime = (seconds) => {
    const round = Math.round(seconds);
    const s = round % 60;
    const m = Math.round((round - s) / 60) % 60;

    return `${m > 9 ? m : '0' + m}:${s > 9 ? s : '0' + s}`;
  };
