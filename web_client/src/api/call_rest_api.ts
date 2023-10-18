import { defaultApiHost } from '../global/default-api-url';
import axios from 'axios';
import {
    CallGetApiParameterType,
    CallPostApiParameterType,
} from './parameter_type/parameter_common_type';

// GET 방식
export const callGetApi = async ({
    path,
    queryParameter = '',
    token,
}: CallGetApiParameterType) => {
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
        const { status, message } = e.response.data;

        if (status >= 403) {
            alert(message);
        }
    }
};

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
