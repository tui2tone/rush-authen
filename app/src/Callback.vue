<template>
  <div class="w-full py-8 h-auto md:h-screen bg-gray-200 flex justify-center items-center overflow-auto">
    <div class="flex justify-center items-center mx-auto h-full">
      <div class="flex flex-col justify-center items-center h-full app-login">
        <div class="w-full text-center mb-8">
          <img src="/assets/images/rush-authen-full-logo.png" class="logo" />
        </div>
        <div class="flex justify-center items-center w-full">Callback</div>
        <div class="footer text-center w-full">
          <div class="text-gray-600 text-sm">power by <i class="font-bold">rushlab.dev</i></div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive } from "vue";
import OdicClient from "oidc-client";
import axios from "axios";

export default defineComponent({
  data() {
    return {
      project: window.project,
      uid: window.uid,
      providers: [],
    };
  },
  computed: {
    formAction() {
      return `/auth/${this.uid}/login`;
    },
  },
  methods: {
    async getProviders() {
      return (await axios.get("/api/oauth-providers/available")).data;
    }
  },
  async mounted() {
    try {
      this.providers = await this.getProviders();
      const provider = this.providers.find((m) => m.method === "google");
      const mgr = new OdicClient.UserManager({
        authority: provider.authority,
        client_id: provider.clientId,
        redirect_uri: provider.redirectUri,
        response_type: provider.responseType,
        scope: provider.scope,
        login_hint: this.uid
      });

      const response = await mgr.signinRedirectCallback();
      console.log(response)
      const profile = response.profile
      console.log(profile)
      
    } catch (error) {
      console.error(error);
    }
  },
});
</script>
<style lang="scss" scoped>
.app-login {
  min-width: 480px;
  .logo {
    max-width: 150px;
    margin: 0 auto;
  }

  .btn-submit {
    @apply bg-green-500 appearance-none shadow w-full text-center cursor-pointer text-white font-bold py-3 px-4 rounded;

    &:hover {
      @apply bg-green-700;
    }
  }
}
</style>
