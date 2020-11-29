<template>
  <div class="w-full py-8 h-auto md:h-screen bg-gray-200 flex justify-center items-center overflow-auto">
    <div class="flex justify-center items-center mx-auto h-full">
      <div class="flex flex-col justify-center items-center h-full app-login">
        <div class="w-full text-center mb-8">
          <img src="/assets/images/rush-authen-full-logo.png" class="logo" />
        </div>
        <div class="flex justify-center items-center w-full" v-if="!isFinished">
          <div class="max-w-sm w-full rounded-lg overflow-hidden p-10 mb-10 bg-white shadow">
            <div class="mb-8">
              <div class="text-gray-700 text-3xl font-bold mb-1">Setup</div>
              <div class="text-gray-600 text-sm mb-1">Your admin username & password</div>
            </div>
            <Form v-slot="{ errors }" @submit="onSubmit">
              <div class="mb-3">
                <label class="text-gray-500 mb-1 text-sm">Site Url</label>
                <input class="input" name="siteUrl" v-model="data.siteUrl" type="text" placeholder="Site Url" />
              </div>
              <div class="mb-3">
                <label class="text-gray-500 mb-1 text-sm">Site Name</label>
                <input class="input" name="siteName" v-model="data.siteName" type="text" placeholder="Site Name" />
              </div>
              <div class="mb-3">
                <label class="text-gray-500 mb-1 text-sm">Username</label>
                <input class="input" name="username" v-model="data.username" type="text" placeholder="Username" />
              </div>
              <div class="mb-4">
                <label class="text-gray-500 mb-1 text-sm">Password</label>
                <input class="input" name="password" v-model="data.password" type="password" placeholder="Password" />
              </div>
              <div class="flex items-center justify-between w-full">
                <button class="btn-submit" type="submit">Setup</button>
              </div>
            </Form>
          </div>
        </div>
        <div class="flex justify-center items-center w-full" v-if="isFinished">
          <div class="max-w-sm w-full rounded overflow-hidden bg-white shadow-lg p-10 mb-10">
            <div class="mb-8">
              <div class="text-gray-700 text-3xl font-bold mb-1">Setup Successfully</div>
            </div>

            <a class="flex items-center justify-between w-full" href="/admin/">
              <button class="bg-green-500 appearance-none shadow w-full hover:bg-green-700 text-white font-bold py-3 px-4 rounded focus:outline-none focus:shadow-outline" type="submit">Go Dashboard</button>
            </a>
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
import { Field, Form } from "vee-validate";
import OdicClient from "oidc-client";
import axios from "axios";

enum SetupStatus {
  Nop = 1,
  Loading = 2,
  Finish = 3,
  Error = 4,
}

export default defineComponent({
  components: {
    Field,
    Form,
  },
  methods: {
    async getSetup() {
      return (await axios.get("/setup/initialize")).data;
    },
    async onSubmit() {
      try {
        this.status = SetupStatus.Loading;
        const result = (await axios.post("/setup", this.data)).data;
        this.status = SetupStatus.Finish;
      } catch (error) {
        this.status = SetupStatus.Error;
        console.error(error);
      }
    },
  },
  computed: {
    isFinished() {
      return this.status == 3;
    },
  },
  data() {
    return {
      status: SetupStatus.Nop,
      data: {
        siteUrl: "",
        siteName: "",
        username: "",
        password: "",
      },
    };
  },
  async mounted() {
    const data = await this.getSetup();
    const keys = Object.keys(data);
    keys.map((key) => {
      this.data[key] = data[key];
    });
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
