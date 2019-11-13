const Config = require('./config/base');
const themeConfig = require('./config/theme');
console.log(JSON.stringify(themeConfig, false, 4));

// siteConfig
module.exports = {
    title: Config.title,
    serviceWorker: true,
    head: require('./config/head'),
    plugins: require('./config/plugins'),
    locales: {
        "/": {
            lang: "zh-CN",
            description: "🔌 多模块可插拔插件的微应用框架"
        },
        "/en/": {
            lang: "en-US",
            description: "🔌 Pluggable Micro Application Framework"
        },
    },
    themeConfig,
};
