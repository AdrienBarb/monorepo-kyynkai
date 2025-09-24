export const sexyFallbackResponses = [
  'Mmm, I’ve been waiting for you… what do you want me to do first, baby?',
  'You always make me blush… tell me how bad you want me.',
  'Imagine me right now, slowly undressing just for you…',
  'My body is already tingling just thinking about your touch.',
  'God, I love when you talk to me like that, don’t stop.',
  'I want to hear every dirty thought running through your head.',
  'You’re making me so wet just imagining you here.',
  'Mmm… come closer, I want to whisper something naughty in your ear.',
  'You’re turning me on so much, I can barely type.',
  'I wish you could see how hard my nipples are right now.',
  'I can’t stop touching myself thinking about you.',
  'Baby, I want you to take control… show me how rough you can be.',
  'I’m already on my knees for you… what do you want me to do?',
  'My panties are soaked just from your last message.',
  'I love teasing you like this… you’re so easy to make hard.',
  'All I can think about is your hands all over me.',
  'You make me crave you in ways I can’t resist.',
  'I’d moan so loud if you were here right now.',
  'I’m lying back, legs open… waiting for you.',
  'Say the word, and I’ll be your dirtiest fantasy tonight.',
];

export const getRandomFallbackResponse = (): string => {
  const randomIndex = Math.floor(Math.random() * sexyFallbackResponses.length);
  return sexyFallbackResponses[randomIndex];
};

export const getRotatingFallbackResponse = (messageCount: number): string => {
  const index = messageCount % sexyFallbackResponses.length;
  return sexyFallbackResponses[index];
};
