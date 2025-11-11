import { GenerationStatus } from '@prisma/client';
import useApi from '../requests/useApi';

export const usePollGeneratedMedia = (generatedMediaId: string | undefined) => {
  return useApi().useGet(
    `/api/generated-media/${generatedMediaId}`,
    undefined,
    {
      enabled: !!generatedMediaId,
      refetchInterval: (data: any) => {
        if (!data.state.data || !data.state.data.status) return 6000;

        const status = data.state.data.status as GenerationStatus;

        if (
          status === GenerationStatus.COMPLETED ||
          status === GenerationStatus.FAILED
        ) {
          return false;
        }

        return 6000;
      },
      staleTime: 0,
    },
  );
};
