const imgixLoader = ({
  src,
  width,
  quality,
  transformations = {},
}: {
  src: string;
  width: number;
  quality: number;
  transformations?: { [key: string]: any };
}) => {
  const url = new URL(`https://kyynk-296765883.imgix.net/${src}`);
  const params = url.searchParams;

  params.set('auto', 'format,compress');
  params.set('fit', 'fill');
  params.set('w', width?.toString());
  params.set('q', quality?.toString() || '75');

  Object.entries(transformations).forEach(([key, value]) => {
    params.set(key, value.toString());
  });

  return url.href;
};

export default imgixLoader;
