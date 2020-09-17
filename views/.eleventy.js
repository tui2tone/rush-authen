module.exports = function (config) {
    config.setUseGitIgnore(false);

    config.addWatchTarget("./_tmp/style.css");

    config.addPassthroughCopy({ "./_tmp/style.css": "./style.css" });
    config.addPassthroughCopy("assets");

    config.addShortcode("version", function () {
        return String(Date.now());
    })
};