import axios from 'axios';
import {API_URL} from '@env';
import RNFS from 'react-native-fs';

interface Video {
  path: string;
}

interface Navigation {
  navigate: (route: string, params?: any) => void;
}

const CHUNK_SIZE = 5 * 1024 * 1024; // 5MB per chunk

export const handleRecordingFinished = async (
  video: Video,
  setIsRecording: (value: boolean) => void,
  setIsLoading: (value: boolean) => void,
  navigation: Navigation,
): Promise<void> => {
  console.log('Video file saved at:', video.path);

  setIsRecording(false);

  try {
    setIsLoading(true);

    const filePath = 'file://' + video.path;
    const fileStat = await RNFS.stat(filePath);
    const fileSize = fileStat.size;
    const totalChunks = Math.ceil(fileSize / CHUNK_SIZE);

    for (let chunkIndex = 0; chunkIndex < totalChunks; chunkIndex++) {
      const start = chunkIndex * CHUNK_SIZE;
      const end = Math.min(start + CHUNK_SIZE, fileSize);

      const chunk = await RNFS.read(filePath, end - start, start, 'base64');

      const formData = new FormData();
      formData.append('chunk', chunk);
      formData.append('chunkIndex', chunkIndex.toString());
      formData.append('totalChunks', totalChunks.toString());

      const response = await axios.post(`${API_URL}/upload-chunk`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status !== 200) {
        console.error('Chunk upload error:', response.data.error);
        setIsLoading(false);
        return;
      }
    }

    // Notify server to merge chunks
    const mergeResponse = await axios.post(
      `${API_URL}/merge-chunks`,
      {fileName: 'recording.mov'},
      {headers: {'Content-Type': 'application/json'}},
    );

    if (mergeResponse.status === 200) {
      setIsLoading(false);

      // @ts-ignore
      navigation.navigate('MainTab', {
        screen: 'Home',
        params: {
          screen: 'RecordResult',
          params: {
            videoResult: JSON.parse(mergeResponse.data.result),
          },
        },
      });
    } else {
      console.error('Merge error:', mergeResponse.data.error);
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
