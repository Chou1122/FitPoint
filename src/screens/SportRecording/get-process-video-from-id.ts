export const GetProcessVideoUrlFromId = (sportId: number | string) => {
  switch (sportId) {
    case 1:
      return 'process-push-up';
    case 2: 
      return 'process-vertical-jump';
    case 3:
      return 'process-plank';
    default:
      return 'process-push-up';
  }
};
