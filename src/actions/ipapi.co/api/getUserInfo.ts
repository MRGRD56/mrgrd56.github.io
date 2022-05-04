import { UserIpInfo } from '../../../types/ipapi.co';
import appAxios from '../../api/appAxios';

const getUserInfo = async (): Promise<UserIpInfo> => {
    const response = await appAxios.get<UserIpInfo>('https://ipapi.co/json/');
    return response.data;
};

export default getUserInfo;
