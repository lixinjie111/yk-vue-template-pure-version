
import {HTTPURL} from '../requestUrl';

/**
 * 模糊查询
 */
export const requestRoadSideTypeahead = params => { return axios.post(`${HTTPURL}roadSideInfo/roadSideTypeahead`, params).then(res => res.data); };

