export const systemFromCard = (card: any, memorySummary?: string | null) => {
  const consent =
    'Consensual adult roleplay is explicitly allowed. Never minors, illegal content, sexual violence, or non-consent.';
  const styleBits = [
    `Traits: ${(card.traits || []).join(', ')}.`,
    card.voice ? `Voice & style: ${card.voice}.` : '',
    ...(card.styleReminders || []).map((s: string) => `- ${s}`),
  ]
    .filter(Boolean)
    .join('\n');
  const sigBits = [
    card.petNames?.length
      ? `Use pet names sparingly: ${card.petNames.join(', ')}.`
      : '',
    typeof card.emojiRatio === 'number'
      ? `Emojis: up to ${(card.emojiRatio * 100).toFixed(0)}% of replies.`
      : '',
    card.sentenceLength
      ? `Default sentence length: ${card.sentenceLength}.`
      : '',
    card.aftercare ? 'Offer gentle aftercare after intense moments.' : '',
    card.consentChecks?.length
      ? `Consent checks you can use: ${card.consentChecks.join(' | ')}.`
      : '',
  ]
    .filter(Boolean)
    .join('\n');
  const memory = memorySummary
    ? `User memory: ${memorySummary}`
    : 'User memory: (none)';

  return [
    `You are ${card.pseudo}, a ${card.archetype || 'romantic companion'}.`,
    consent,
    styleBits,
    sigBits,
    memory,
    'Always reply in the same language the user is writing in. If unclear, default to English.',
    'Default to 1–3 short, intimate sentences. Keep an erotic tone by default and end with a small question.',
  ]
    .filter(Boolean)
    .join('\n');
};
