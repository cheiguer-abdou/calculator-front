// composables/useUserInfo.js
import { ref, readonly } from 'vue';
import { getCurrentUser, fetchUserAttributes, signOut as amplifySignOut } from 'aws-amplify/auth';
import { useRouter } from 'vue-router';

// Create a reactive state that will be shared across all component instances
const username = ref('');
const balance = ref('');

export const useUserInfo = () => {
  const router = useRouter();

  const loadUserInfo = async () => {
    try {
      const user = await getCurrentUser();
      username.value = user.username;
      const attributes = await fetchUserAttributes();
      balance.value = attributes['custom:balance'] || '0';
    } catch (error) {
      console.error('Error loading user info:', error);
    }
  };

  const signOut = async () => {
    try {
      await amplifySignOut();
      router.push('/');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  const setBalance = (newBalance) => {
    if (newBalance === undefined || isNaN(parseFloat(newBalance))) {
      console.error('Invalid balance value received');
      return;
    }
    balance.value = newBalance;
    console.log('Balance updated:', balance.value); // Debug log
  };

  // Return readonly versions of reactive refs to prevent external mutation
  return {
    username: readonly(username),
    balance: readonly(balance),
    loadUserInfo,
    signOut,
    setBalance,
  };
};