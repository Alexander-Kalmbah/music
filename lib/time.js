import { Buffer } from "buffer";


const now = Date.now;
const nowJSON = () => (new Date()).toJSON(); // YYYY-MM-DDThh:mm:ss.SSSZ

const TYPE_CASE = {
  LOWER: 0,
  UPPER: 1
};

const nowHEX = (typeCase = TYPE_CASE.UPPER) => {
  const now = Date.now();
  const buf = Buffer.allocUnsafe(6);
  buf.writeUInt16BE(now & 0xFFFF, 4);
  buf.writeUInt16BE(now / 0x10000 & 0xFFFF, 2);
  buf.writeUInt16BE(now / 0x100000000 & 0xFFFF, 0);

  const hex = buf.toString('hex');

  if(typeCase === TYPE_CASE.UPPER) return hex.toUpperCase();
  if(typeCase === TYPE_CASE.LOWER) return hex.toLowerCase();
  return hex;
};
nowHEX.case = TYPE_CASE;


export { now, nowJSON, nowHEX };