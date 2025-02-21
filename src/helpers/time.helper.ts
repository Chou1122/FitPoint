export const convertSecondsToMinSecObject = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  return {minutes, seconds: remainingSeconds};
};

export const formatSecondsToMMSS = (seconds: number) => {
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  const formattedMinutes = String(minutes).padStart(2, '0');
  const formattedSeconds = String(remainingSeconds).padStart(2, '0');

  return `${formattedMinutes}:${formattedSeconds}`;
};

export const formatTime = (
  secondsInput: string | number | undefined,
): string => {
  if (secondsInput === undefined || secondsInput === null) return '';

  // Chuyển đổi giá trị đầu vào thành số nguyên
  const seconds =
    typeof secondsInput === 'number'
      ? secondsInput
      : parseInt(secondsInput, 10);

  // Nếu không phải số hợp lệ, trả về rỗng
  if (isNaN(seconds) || seconds < 0) return '';

  // Tính số phút và số giây
  const minutes = Math.floor(seconds / 60);
  const remainingSeconds = seconds % 60;

  // Định dạng kết quả dựa vào giá trị phút & giây
  if (minutes === 0) {
    return remainingSeconds === 1 ? '1 second' : `${remainingSeconds} seconds`;
  } else if (remainingSeconds === 0) {
    return minutes === 1 ? '1 minute' : `${minutes} minutes`;
  } else {
    return `${minutes}m${remainingSeconds}s`;
  }
};

export const formatTimeHistory = (isoString: string): string => {
  const date = new Date(isoString);

  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Tháng trong JS bắt đầu từ 0
  const year = date.getFullYear();
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  return `${day}/${month}/${year} ${hours}:${minutes}`;
};
