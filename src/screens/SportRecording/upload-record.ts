import axios from 'axios';
import {API_URL} from '@env';
import {processVideoWithAI} from './process-video';

interface Video {
  path: string;
}

interface Navigation {
  navigate: (route: string, params?: any) => void;
}

export const handleRecordingFinished = async (
  video: Video,
  setIsRecording: (value: boolean) => void,
  setIsLoading: (value: boolean) => void,
  navigation: Navigation,
  userId: string | number,
  sportId: string | number,
  img: string | any,
  time: number | string | any,
  name: string,
): Promise<void> => {
  console.log('Video file saved at:', video.path);

  setIsRecording(false);

  try {
    setIsLoading(true);

    const formData = new FormData();
    formData.append('video', {
      uri: 'file://' + video.path,
      name: 'recording.mov',
      type: 'video/quicktime',
    });

    const response = await axios.post(`${API_URL}/upload-cloud`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });

    if (response.status === 200) {
      await processVideoWithAI(
        setIsLoading,
        navigation,
        response.data.videoUrl,
        userId,
        sportId,
        img,
        time,
        name,
      );
    } else {
      console.error('API error:', response.data.error);
      setIsLoading(false);
    }
  } catch (error) {
    console.error('Error during video upload:', error);
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
