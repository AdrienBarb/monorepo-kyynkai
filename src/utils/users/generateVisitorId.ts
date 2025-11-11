import { v4 as uuidv4 } from 'uuid';

const generateVisitorId = (): string => {
  const uuid = uuidv4();
  const base36 = BigInt('0x' + uuid.replace(/-/g, '')).toString(36);
  return base36.substring(0, 24).padStart(24, '0');
};

export default generateVisitorId;
