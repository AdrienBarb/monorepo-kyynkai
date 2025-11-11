export const MIN_CREDITS_AMOUNT_FOR_WITHDRAWAL = 10000;

export const IMGIX_URL = 'https://kyynk-296765883.imgix.net/';

export const HELP_EMAIL = 'help@kyynk.com';
export const CONTACT_EMAIL = 'contact@kyynk.com';

export type TagsType = {
  value: string;
  label: string;
};

export const tagList = [
  'anal',
  'asian',
  'bbw',
  'bigDick',
  'bigTits',
  'bikini',
  'blondes',
  'blowjobs',
  'bondage',
  'booty',
  'creampie',
  'cunnilingus',
  'deepThroat',
  'doublePenetration',
  'extremeHardcore',
  'facials',
  'feet',
  'femaleDomina',
  'fetish',
  'footjob',
  'gangBang',
  'gay',
  'goldenShower',
  'gothic',
  'hairy',
  'handjob',
  'highHeels',
  'latexLeather',
  'latinas',
  'lesbian',
  'masturbation',
  'milfMature',
  'objectsInsert',
  'orgy',
  'outdoor',
  'piercings',
  'pov',
  'pussy',
  'redhead',
  'rimjobs',
  'rolePlay',
  'roughSex',
  'sexToys',
  'shower',
  'sm',
  'solo',
  'spanking',
  'squirting',
  'stockings',
  'stripping',
  'submissive',
  'tattos',
  'threesome',
  'tinyTitties',
  'topless',
];

export const TAGS: TagsType[] = tagList.map((currentTag) => {
  return { value: currentTag, label: currentTag };
});

export const PRICE_OPTIONS = [
  { label: 'Free', value: '0' },
  { label: '0.25 €', value: '25' },
  { label: '0.5 €', value: '50' },
  { label: '0.75 €', value: '75' },
  { label: '1 €', value: '100' },
  { label: '1.25 €', value: '125' },
  { label: '1.5 €', value: '150' },
  { label: '1.75 €', value: '175' },
  { label: '2 €', value: '200' },
  { label: '2.25 €', value: '225' },
  { label: '2.5 €', value: '250' },
  { label: '2.75 €', value: '275' },
  { label: '3 €', value: '300' },
  { label: '3.25 €', value: '325' },
  { label: '3.5 €', value: '350' },
  { label: '3.75 €', value: '375' },
  { label: '4 €', value: '400' },
  { label: '4.25 €', value: '425' },
  { label: '4.5 €', value: '450' },
  { label: '4.75 €', value: '475' },
  { label: '5 €', value: '500' },
];
