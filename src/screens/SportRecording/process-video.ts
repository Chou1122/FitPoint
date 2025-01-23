import axios from 'axios';
import {API_URL} from '@env';

interface Navigation {
  navigate: (route: string, params?: any) => void;
}

export const processVideoWithAI = async (
  setIsLoading: (value: boolean) => void,
  navigation: Navigation,
  videoUrl: string,
): Promise<void> => {
  console.log('Video url:', videoUrl);

  try {
    const response = await axios.post(`${API_URL}/process-push-up`, {
      videoUrl: videoUrl,
    });

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
