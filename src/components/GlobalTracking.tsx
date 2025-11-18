'use client';

import React, { FC, ReactNode, useEffect } from 'react';
import { useUser } from '@/hooks/users/useUser';
import {
  cleanUTMFromLocalStorage,
  getUTMFromLocalStorage,
} from '@/utils/tracking/getUTMFromLocalStorage';
import useApi from '@/hooks/requests/useApi';
import { isNewUser } from '@/utils/users/isNewUsers';

const GlobalTracking = () => {
  const { user } = useUser();
  const { usePut } = useApi();

  const { mutate: updateUserTracking } = usePut('/api/users/tracking', {
    onSuccess: () => {
      cleanUTMFromLocalStorage();
    },
  });

  // Signup to Tolt if user doesn't have toltData
  useEffect(() => {
    if (!user || !isNewUser(user.createdAt)) return;
    if (user.toltData) return;

    const handleToltSignup = async (email: string) => {
      const result = await window.tolt.signup(email);

      if (result.customer_id) {
        updateUserTracking({
          toltData: result,
        });
      }
    };

    handleToltSignup(user.email);
  }, [user, updateUserTracking]);

  // Update utm values
  useEffect(() => {
    if (!user || !isNewUser(user.createdAt)) return;
    if (user.utmTracking) return;

    const utmValues = getUTMFromLocalStorage();

    if (utmValues) {
      updateUserTracking({
        utmTracking: utmValues,
      });
    }
  }, [user, updateUserTracking]);

  return null;
};

export default GlobalTracking;
