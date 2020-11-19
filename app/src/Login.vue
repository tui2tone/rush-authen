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
            <div class="my-6 text-xs font-bold text-center text-gray-500">OR</div>

            <form action="/auth/{{uid}}/login" method="POST">
              <div class="mb-3">
                <input class="input" name="username" type="text" placeholder="Username" />
              </div>
              <div class="mb-4">
                <input class="input" name="password" type="password" placeholder="Password" />
              </div>
              <div class="flex items-center justify-between w-full">
                <div class="btn-submit" type="submit">Sign In</div>
              </div>
            </form>
            <div class="my-6 text-xs font-bold text-center text-gray-500">OR</div>
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
export default defineComponent({});
</script>

<style lang="scss" scoped>
.app-login {
  min-width: 480px;
  .logo {
    max-width: 150px;
    margin: 0 auto;
  }

  .btn-submit {
    @apply bg-green-500 appearance-none shadow w-full text-center cursor-pointer hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none;
  }

  .btn-login {
    @apply w-full mb-2 shadow p-2 rounded appearance-none;

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
