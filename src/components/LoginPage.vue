<script setup>
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { Authenticator, useAuthenticator } from "@aws-amplify/ui-vue";
import { Amplify } from 'aws-amplify';
import { fetchUserAttributes } from 'aws-amplify/auth';
import { Hub } from "@aws-amplify/core"
import awsconfig from '../utils/aws-exports';

// Configure Amplify
Amplify.configure(awsconfig);

const auth = useAuthenticator().route;

// Setup router
const router = useRouter();

// Reactive variables
const userAttributes = ref({});
const isAuthenticated = ref(false);

// Fetch user attributes function
async function loadUserAttributes() {
  try {
    const attributes = await fetchUserAttributes();
    console.log("auth:", auth);
    userAttributes.value = attributes;
    isAuthenticated.value = true;
    // Redirect to calculator page when attributes are loaded
    router.push('/calculator');
  } catch (error) {
    console.error('Error fetching user attributes:', error);
    isAuthenticated.value = false;
  }
}

// keep user from login page if authenticated
Hub.listen("auth", async () => {
    router.push({path: '/calculator'});
});

onMounted(loadUserAttributes);

</script>

<template>
  <authenticator>
    <template v-slot:sign-up-header>
      <h3
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
      >
        Create a new account
      </h3>
    </template>

    <template v-slot:sign-in-header>
      <h3
        class="amplify-heading"
        style="padding: var(--amplify-space-xl) 0 0 var(--amplify-space-xl)"
        onclick="loadUserAttributes"
      >
        Sign in to your account
      </h3>
    </template>
  </authenticator>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
[data-amplify-authenticator] {
  --amplify-components-button-primary-background-color: var(
    --amplify-colors-brand-secondary-80
  );
  --amplify-components-button-primary-hover-background-color: var(
    --amplify-colors-brand-secondary-90
  );
  --amplify-components-button-primary-focus-background-color: var(
    --amplify-colors-brand-secondary-90
  );
  --amplify-components-button-primary-active-background-color: var(
    --amplify-colors-brand-secondary-100
  );
  --amplify-components-button-link-color: var(
    --amplify-colors-brand-secondary-80
  );
  --amplify-components-button-link-hover-color: var(
    --amplify-colors-brand-secondary-90
  );
  --amplify-components-button-link-focus-color: var(
    --amplify-colors-brand-secondary-90
  );
  --amplify-components-button-link-active-color: var(
    --amplify-colors-brand-secondary-100
  );
  --amplify-components-button-link-active-background-color: transparent;
  --amplify-components-button-link-focus-background-color: transparent;
  --amplify-components-button-link-hover-background-color: transparent;
}
</style>