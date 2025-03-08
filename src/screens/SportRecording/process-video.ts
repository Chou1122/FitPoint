import axios from 'axios';
import {API_URL} from '@env';
import {GetProcessVideoUrlFromId} from './get-process-video-from-id';

interface Navigation {
  navigate: (route: string, params?: any) => void;
}

export const processVideoWithAI = async (
  setIsLoading: (value: boolean) => void,
  navigation: Navigation,
  videoUrl: string,
  userId: string | number,
  sportId: string | number,
  img: string | any,
  time: number | string | any,
  name: string,
): Promise<void> => {
  console.log('Video url:', videoUrl);
  console.log('ID: ', sportId);

  try {
    const response = await axios.post(
      `${API_URL}/${GetProcessVideoUrlFromId(sportId)}`,
      {
        videoUrl: videoUrl,
        userId: userId,
        sportId: sportId,
      },
    );

    if (response.status === 200) {
      setIsLoading(false);

      console.log(response.data.aiResult);

      //@ts-ignore
      navigation.navigate('MainTab', {
        screen: 'Home',
        params: {
          screen: 'RecordResult',
          params: {
            videoResult: JSON.parse(response.data.aiResult),
            id: sportId,
            img,
            time,
            name,
          },
        },
      });
    } else {
      console.error('API error:', response.data.error);
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Error during process video:', error);
    setIsLoading(false);
  }
};

export const handleRecordingError = (
  error: Error,
  setIsRecording: (value: boolean) => void,
): void => {
  console.error('Recording error:', error);
  setIsRecording(false);
};
