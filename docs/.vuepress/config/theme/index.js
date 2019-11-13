const fs = require('fs');
const path = require('path');

const SIDEBAR_KEYS = [ '/guide/' ];

module.exports = {
    // 假定是 GitHub. 同时也可以是一个完整的 GitLab URL
    repo: "MicroAppJS/MicroApp-Core",
    // 自定义仓库链接文字。默认从 `themeConfig.repo` 中自动推断为
    // "GitHub"/"GitLab"/"Bitbucket" 其中之一，或是 "Source"。
    // repoLabel: '查看源码',
    // 假如你的文档仓库和项目本身不在一个仓库：
    // docsRepo: 'MicroAppJS/MicroApp-Core',
    // 假如文档不是放在仓库的根目录下：
    docsDir: 'docs',
    // 假如文档放在一个特定的分支下：
    docsBranch: 'master',
    // 默认是 false, 设置为 true 来启用
    editLinks: true,
    // 默认为 "Edit this page"
    // editLinkText: '帮助我们改善此页面！',
    sidebarDepth: 3,
    // algolia: {
    //     indexName: "cli_vuejs",
    //     apiKey: "f6df220f7d246aff64a56300b7f19f21"
    // },
    // search: false,
    // searchMaxSuggestions: 10,
    // displayAllHeaders: true // 默认值：false
    locales: {
        "/": {
            ...require('./zh'),
            sidebar: SIDEBAR_KEYS.map(key => {
                return localesLink('', key);
            }).reduce((obj, key) => {
                return Object.assign(obj, loadSidebar(key));
            }, {}),
        },
        "/en/": {
            ...require('./en'),
            sidebar: SIDEBAR_KEYS.map(key => {
                return localesLink('en', key);
            }).reduce((obj, key) => {
                return Object.assign(obj, loadSidebar(key));
            }, {}),
        },
    }
};

function loadSidebar(filepath) {
    const root = path.resolve(process.cwd(), 'docs');
    const p = path.join(root, filepath);
    if (fs.existsSync(p) && fs.statSync(p).isDirectory()) {
        const files = fs.readdirSync(p);
        return {
            [filepath]: files.filter(file => {
                return /\.md$/i.test(file);
            }).map(file => {
                return file.replace(root).replace(/\.md$/i, '').replace(/^README$/i, '');
            }),
        };
    }
    return {
        [filepath]: filepath,
    };
}

function localesLink(locales, link) {
    if (locales) {
        locales = `/${locales}`;
    }
    return `${locales}${link}`;
}
