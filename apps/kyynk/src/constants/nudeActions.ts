export enum NudeActionType {
  MIRROR_SELFIE = 'MIRROR_SELFIE',
  SHOWER_STEAM = 'SHOWER_STEAM',
  BED_SOLO = 'BED_SOLO',
  ORAL_GIVING = 'ORAL_GIVING',
  MISSIONARY = 'MISSIONARY',
  COWGIRL = 'COWGIRL',
  DOGGY = 'DOGGY',
  ANAL_SPOON = 'ANAL_SPOON',
}

export interface NudeAction {
  id: NudeActionType;
  label: string;
  credits: number;
  prompt: string;
}

export const NUDE_ACTIONS: NudeAction[] = [
  {
    id: NudeActionType.MIRROR_SELFIE,
    label: '📱 Sexy Mirror Selfie',
    credits: 0,
    prompt:
      'fully nude woman taking a mirror selfie in a cozy bedroom, phone in one hand, subtle hip pop, relaxed natural smile, golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 85mm lens, erotic photo realism',
  },
  {
    id: NudeActionType.BED_SOLO,
    label: '🔥 Solo Pleasure',
    credits: 10,
    prompt:
      'fully nude woman, on a bed, legs spread, (fingering her pussy:1.3), five fingers, golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 85mm lens, erotic photo realism',
  },
  {
    id: NudeActionType.ORAL_GIVING,
    label: '👄 Sucking Dick',
    credits: 10,
    prompt:
      'fully nude woman kneeling in front of a standing man, side-profile view, his pelvis partially in frame, (oral sex:1.3), (penis inside mouth:1.2), golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 85mm lens, erotic photo realism',
  },
  {
    id: NudeActionType.MISSIONARY,
    label: '💦 Getting Fucked',
    credits: 10,
    prompt:
      'nude woman lying on her back in missionary position, seen from above, POV of the man, (vaginal penetration:1.3), golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 85mm lens, erotic photo realism',
  },
  {
    id: NudeActionType.COWGIRL,
    label: '🐎 Riding Cock',
    credits: 10,
    prompt:
      'nude woman straddling a man on a bed, three-quarter frontal angle, hands on his chest, (vaginal penetration:1.3), (cowgirl position:1.2), arched back, toned body, golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 50mm lens, erotic photo realism',
  },
  {
    id: NudeActionType.DOGGY,
    label: '🍑 Doggy Style',
    credits: 10,
    prompt:
      'nude woman on all fours on a bed, rear three-quarter angle from the side, man behind her with hands on her hips, (vaginal penetration:1.3), (doggy style:1.2), arched back, curved spine, golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 85mm lens, erotic photo realism',
  },
  {
    id: NudeActionType.ANAL_SPOON,
    label: '🍑💥 Anal Fucking',
    credits: 10,
    prompt:
      'nude woman seen from behind on all fours on a bed, (penis inside anus:1.4), (anal penetration:1.3), realistic anus, gaping, toned body, golden hour light, warm shadows, realistic skin texture, soft lighting, subtle film grain, shallow depth of field, 85mm lens, erotic photo realism',
  },
];

export const getNudeActionById = (
  id: NudeActionType,
): NudeAction | undefined => {
  return NUDE_ACTIONS.find((action) => action.id === id);
};
