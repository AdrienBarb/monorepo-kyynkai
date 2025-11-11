import axios from 'axios';

export const sendTrafficJunkyCreatorConversion = async ({
  userId,
  aclid,
  description = 'CreatorSignup',
}: {
  userId: string;
  aclid?: string;
  description?: string;
}) => {
  const randomNumber = Math.random();

  const postbackUrl = `https://ads.trafficjunky.net/ct?a=&member_id=1007082772&cb=${randomNumber}&cti=${userId}&ctv=undefined&ctd=${description}&aclid=${aclid}`;

  try {
    await axios.get(postbackUrl);
  } catch (error) {
    console.error(error);
  }
};
