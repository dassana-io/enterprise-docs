// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
    title: 'Dassana Enterprise',
    tagline: 'Security Data Lake',
    url: 'https://docs.dassana.cloud',
    baseUrl: '/',
    onBrokenLinks: 'throw',
    onBrokenMarkdownLinks: 'warn',
    favicon: 'img/favicon.ico',
    organizationName: 'dassana-io', // Usually your GitHub org/user name.
    projectName: 'enterprise-docs', // Usually your repo name.
    scripts: [
        {
            src: 'https://plausible.io/js/plausible.outbound-links.js',
            async: true,
            defer: true,
            'data-domain': 'docs.dassana.cloud',
        },
    ],
    presets: [
        [
            'classic',
            /** @type {import('@docusaurus/preset-classic').Options} */
            ({
                docs: {
                    routeBasePath: '/',
                    sidebarPath: require.resolve('./sidebars.js'),
                    // Please change this to your repo.
                    editUrl:
                        'https://github.com/dassana-io/enterprise-docs/edit/main/',
                },
                blog: false,
                theme: {
                    customCss: require.resolve('./src/css/custom.css'),
                },
            }),
        ],
    ],

    themeConfig:
        /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
        ({
            prism: {
                theme: require('prism-react-renderer/themes/nightOwl'),
            },
            colorMode: {
                defaultMode: 'dark',
                disableSwitch: true,
            },
            hideableSidebar: true,
            algolia: {
                apiKey: '16f52954ae407661dcd6059176bdd586',
                appId: 'ZD52C0K7ZY',
                indexName: 'enterprise_docs',
            },
            navbar: {
                title: 'Docs',
                logo: {
                    alt: 'Dassana Logo',
                    src: 'img/logo.svg',
                },
                items: [
                    {
                        className: 'header-github-link',
                        href: 'https://github.com/dassana-io/enterprise-docs',
                        position: 'right',
                    },
                ],
            },
            footer: {
                style: 'dark',
                links: [
                    {
                        title: 'Community',
                        items: [
                            {
                                label: 'Slack',
                                href: 'https://join.slack.com/t/dassanacommunity/shared_invite/zt-teo6d5ed-xkWDNSaH4m6pC8PAJnrD8g',
                            },
                            {
                                label: 'Careers',
                                href: 'https://dassanaio.notion.site/Job-Board-0a01b48e2ef8462bb3d12e50b8b21c9b',
                            },
                        ],
                    },
                    {
                        title: 'Resources',
                        items: [
                            {
                                label: 'Homepage',
                                href: 'https://dassana.io',
                            },
                            {
                                label: 'Terms of Service',
                                href: 'https://www.notion.so/dassanaio/Terms-of-Service-97889d43cf1a44e38554314621fc3ac7',
                            },
                            {
                                label: 'Privacy Policy',
                                href: 'https://www.notion.so/dassanaio/Privacy-Policy-ed4f1a5d498846c0b7a3edb02119a384',
                            },
                        ],
                    },
                    {
                        title: 'Social',
                        items: [
                            {
                                label: 'LinkedIn',
                                href: 'https://www.linkedin.com/company/dassana-inc',
                            },
                            {
                                label: 'Twitter',
                                href: 'https://twitter.com/DassanaSecurity',
                            },
                        ],
                    },
                ],
                copyright: `Copyright © ${new Date().getFullYear()} Dassana Inc.`,
            },
        }),
}

module.exports = config
