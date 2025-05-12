import axios from 'axios';
import {API_URL} from '@env';
import {processVideoWithAI} from './process-video';
import * as FileSystem from 'react-native-fs';

interface Video {
  path: string;
}

interface Navigation {
  navigate: (route: string, params?: any) => void;
}

const MAX_DIRECT_UPLOAD_SIZE = 80 * 1024 * 1024; // 80MB

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
  maxScore: number,
  score: number,
  urlVideo: string,
): Promise<void> => {
  console.log('Video file saved at:', video.path);

  setIsRecording(false);

  try {
    setIsLoading(true);

    const formData = new FormData();

    const fileName = video.path.split('/').pop();

    const fileInfo = await FileSystem.stat(video.path);
    const fileSize = fileInfo.size;

    let videoUrl = '';

    //Cloundinary upload
    if (fileSize <= MAX_DIRECT_UPLOAD_SIZE) {
      formData.append('file', {
        uri: 'file://' + video.path,
        name: fileName,
        type: 'video/mp4',
      });

      formData.append('upload_preset', 'perfect_fit_video');

      try {
        const cloudinaryRes = await axios.post(
          'https://api.cloudinary.com/v1_1/dx3prv3ka/video/upload',
          formData,
          {
            headers: {
              'Content-Type': 'multipart/form-data',
            },
          },
        );

        if (cloudinaryRes.status === 200) {
          videoUrl = cloudinaryRes.data.secure_url;
          console.log('Upload trực tiếp thành công:', videoUrl);
        } else {
          console.error('Cloudinary error response:', cloudinaryRes.data);
          throw new Error('Upload lên Cloudinary thất bại');
        }
      } catch (error) {
        console.error('Error during Cloudinary upload:', error);
        throw error;
      }
    }
    // Upload to my server
    else {
      formData.append('video', {
        uri: 'file://' + video.path,
        name: fileName,
        type: 'video/mp4',
      });

      const response = await axios.post(`${API_URL}/upload-cloud`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        videoUrl = response.data.videoPath;
        console.log('Upload qua server thành công:', videoUrl);
      } else {
        throw new Error(response.data.error || 'Upload server thất bại');
      }
    }

    await processVideoWithAI(
      setIsLoading,
      navigation,
      videoUrl,
      userId,
      sportId,
      img,
      time,
      name,
      maxScore,
      score,
      urlVideo,
    );
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
