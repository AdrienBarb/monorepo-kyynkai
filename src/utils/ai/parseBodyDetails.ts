interface BodyAttributes {
  bodyBuild?: string | null;
  bustSize?: string | null;
  hipSize?: string | null;
  hairColor?: string | null;
  hairStyle?: string | null;
  skinTone?: string | null;
}

export function buildBodyDescription(bodyAttributes: BodyAttributes): string {
  const bodyDescriptions: string[] = [];

  if (bodyAttributes.bodyBuild) {
    bodyDescriptions.push(`${bodyAttributes.bodyBuild} build`);
  }

  if (bodyAttributes.bustSize) {
    bodyDescriptions.push(`${bodyAttributes.bustSize} breasts`);
  }

  if (bodyAttributes.hipSize) {
    bodyDescriptions.push(`${bodyAttributes.hipSize} hips`);
  }

  if (bodyAttributes.hairColor && bodyAttributes.hairStyle) {
    bodyDescriptions.push(
      `${bodyAttributes.hairColor} ${bodyAttributes.hairStyle} hair`,
    );
  } else if (bodyAttributes.hairColor) {
    bodyDescriptions.push(`${bodyAttributes.hairColor} hair`);
  }

  if (bodyAttributes.skinTone) {
    bodyDescriptions.push(`${bodyAttributes.skinTone} skin tone`);
  }

  return bodyDescriptions.join(', ');
}
