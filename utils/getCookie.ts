import { IncomingMessage } from "http";

const getCookie = (key: string, request: IncomingMessage) => {
  const cookieData = request.headers.cookie !== undefined ? request.headers.cookie : '';
  const datas = cookieData.split(';').map(data => data.trim());
  const msgKeyValue = datas.find(data => data.startsWith(`${key}=`));
  if (msgKeyValue === undefined) return '';
  const msgValue = msgKeyValue.replace(`${key}=`, '');
  return unescape(msgValue);
}

export default getCookie