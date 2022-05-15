import { nowHEX } from "../../lib/time";
import Secure from "../../lib/Secure";


const ACCESS_SECRET = '';
const REFRESH_SECRET = '';


// // token = time:session:user:access:key:refresh:ip:device
// const createAuthToken = (user, session) => {
//   const time = nowHEX();
//   const key = Secure.nanoidPass((Math.random() * 8 | 0) + 9);
//   const ip = session?.ip || '';
//   const device = session?.device || '';
//   const userId = user?.id || '';
//   const sessionId = session?.id || '';
// };