import axios from 'axios';
import { chatacterType } from '../../src/types/characterType';

export const fetchCharacter = async (url: string) => {
  try {
    const response = await axios({
      method: 'get',
      url,
    });
    const data = response.data;
    return data;
  } catch (err) {
    console.log(err);
  }
};
