<template>
  <div class="w-full py-8 h-auto md:h-screen bg-gray-200 flex justify-center items-center overflow-auto">
    <div class="flex justify-center items-center mx-auto h-full">
      <div class="flex flex-col justify-center items-center h-full app-login">
        <div class="w-full text-center mb-8">
          <img src="/assets/images/rush-authen-full-logo.png" class="logo" />
        </div>
        <div class="flex justify-center items-center w-full">
          <div class="max-w-sm w-full rounded-lg overflow-hidden p-10 mb-10 bg-white shadow">
            <div class="mb-8 text-center">
              <div class="text-gray-600 text-sm mb-1">Log in to continue to:</div>
              <div class="text-gray-700 font-bold">
                {{ project }}
              </div>
            </div>
            <form :action="formAction" method="POST">
              <div class="mb-3">
                <input class="input" name="username" type="text" placeholder="Email/Username" />
              </div>
              <div class="mb-4">
                <input class="input" name="password" type="password" placeholder="Password" />
              </div>
              <div class="flex items-center justify-between w-full">
                <button class="btn-submit" type="submit">Sign In</button>
              </div>
            </form>
            <form :action="formAction" method="POST">
              <div class="mb-3">
                <input class="input" name="email" type="text" placeholder="Email" />
              </div>
              <div class="flex items-center justify-between w-full">
                <button class="btn-submit" type="submit">Send me Magic Link via E-mail</button>
              </div>
            </form>
            <div class="my-6 text-xs font-bold text-center text-gray-500">OR</div>
            <div class="mb-6 pb-6 border-b border-gray-200">
              <a
                v-for="(provider, index) in providers"
                :key="index"
                class="btn-login"
                :href="signinLink(provider)"
                :class="{
                  'btn-login is-google': provider.method === 'google',
                  'btn-login is-line': provider.method === 'line',
                  'btn-login is-apple': provider.method === 'apple',
                  'btn-login is-microsoft': provider.method === 'microsoft',
                  'btn-login is-facebook': provider.method === 'facebook',
                }"
              >
                <div class="flex items-center">
                  <img src="/assets/images/logos/google.svg" class="btn-logo logo-google" />
                  <img src="/assets/images/logos/line.png" class="btn-logo logo-line" />
                  <img src="/assets/images/logos/microsoft.svg" class="btn-logo logo-microsoft" />
                  <div class="flex-grow text-sm text-gray-600">
                    Signin with <span>{{ provider.name }}</span>
                  </div>
                </div>
              </a>
            </div>
            <div class="text-center flex items-center justify-center">
              <a class="text-blue-700 text-sm" href="">Can't log in?</a>
              <div class="text-gray-300 mx-4">|</div>
              <a class="text-blue-700 text-sm" href="/register">Sign up for an account</a>
            </div>
          </div>
        </div>
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
    }
  },
  methods: {
    async getProviders() {
      return (await axios.get("/api/oauth-providers/available")).data;
    },
    signinLink(provider) {
      return `/auth/${this.uid}/${provider.method}`;
    }
  },
  async mounted() {
    this.providers = await this.getProviders();
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

  .btn-login {
    @apply w-full mb-2 shadow p-2 rounded appearance-none block;

    .btn-logo {
      @apply mr-2;
      height: 30px;
      width: auto;
      display: none;
    }

    &.is-google {
      .logo-google {
        display: block;
      }
    }

    &.is-line {
      .logo-line {
        display: block;
      }
    }

    &.is-microsoft {
      .logo-microsoft {
        display: block;
      }
    }

    &.is-apple {
      .logo-apple {
        display: block;
      }
    }

    &.is-facebook {
      .logo-facebook {
        display: block;
      }
    }
  }
}
</style>
