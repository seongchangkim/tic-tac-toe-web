import { defaultApiHost } from '../global/default-api-url';
import axios from 'axios';
import { CallGetApiParameterType } from './parameter_type/parameter_common_type';
import router from '../router';

// GET 방식
export async function callGetApi(
    this: any,
    { path, queryParameter = '', token }: CallGetApiParameterType,
) {
    try {
        const res = await axios.get(
            `${defaultApiHost}${path}?${queryParameter}`,
            {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            },
        );

        return res.data;
    } catch (e: any) {
        const { message, statusCode } = e.response.data;

        if (statusCode >= 400) {
            alert(`${message} : 관리자 계정으로 로그인하세요.`);
            router.push('/auth/login');
        }
    }
}

// POST 방식
// 추후에 구현할 예정임.
// export const callPostApi = async ({
//     path,
//     body,
//     token,
// }: CallPostApiParameterType) => {
//     try {
//         const res = await axios.post(
//             `${defaultApiHost}${path}`,
//             body,
//             token !== undefined
//                 ? {
//                       headers: {
//                           Authorization: `Bearer ${token}`,
//                       },
//                   }
//                 : {},
//         );

//         return res.data;
//     } catch (e: any) {
//         const { status, message } = e.response.data;

//         if (status >= 403) {
//             alert(message);
//         }
//     }
// };
