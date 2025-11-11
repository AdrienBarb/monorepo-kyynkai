'use client';

import { useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import {
  KYYNK_UTM_KEY,
  UTM_PARAMS,
  UTMValues,
} from '@/utils/tracking/getUTMFromLocalStorage';

const UTMTracking = () => {
  const searchParams = useSearchParams();

  useEffect(() => {
    if (!searchParams) return;

    const utmValues: UTMValues = {};
    let hasAny = false;
    UTM_PARAMS.forEach((param) => {
      const value = searchParams.get(param);
      if (value) {
        utmValues[param] = value;
        hasAny = true;
      }
    });

    if (hasAny) {
      localStorage.setItem(KYYNK_UTM_KEY, JSON.stringify(utmValues));
    }
  }, [searchParams]);

  return null;
};

export default UTMTracking;
