/** @type {import("snowpack").SnowpackUserConfig } */
module.exports = {
    mount: {
        public: '/',
        src: '/_dist_',
    },
    plugins: ['@snowpack/plugin-vue', '@snowpack/plugin-dotenv', '@snowpack/plugin-typescript', '@snowpack/plugin-postcss', '@snowpack/plugin-sass']
};
