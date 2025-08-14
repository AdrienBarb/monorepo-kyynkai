export const buildQwenPromptTGI = (system: string, history: any) => {
  return [
    `<|im_start|>system\n${system}\n<|im_end|>`,
    ...history.map((m) => `<|im_start|>${m.role}\n${m.content}\n<|im_end|>`),
    `<|im_start|>assistant\n`,
  ].join('\n');
};
