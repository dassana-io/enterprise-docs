/**
 * Creating a sidebar enables you to:
 - create an ordered group of docs
 - render a sidebar for each doc of that group
 - provide next/previous navigation

 The sidebars can be generated from the filesystem, or explicitly defined here.

 Create as many sidebars as you want.
 */

// @ts-check

/** @type {import('@docusaurus/plugin-content-docs').SidebarsConfig} */
const sidebars = {
    // By default, Docusaurus generates a sidebar from the docs folder structure
    // tutorialSidebar: [{type: 'autogenerated', dirName: '.'}],

    // But you can create a sidebar manually

    sidebar: [
        'intro',
        {
            type: 'category',
            label: '📱 App Store',
            link: {
                type: 'doc',
                id: 'app-store/intro',
            },
            items: [
                {
                    type: 'category',
                    label: 'Apps',
                    link: {
                        type: 'doc',
                        id: 'app-store/apps/apps',
                    },
                    items: [
                        'app-store/apps/cloud-logs/aws/aws',
                        'app-store/apps/custom',
                        'app-store/apps/saas-logs/github',
                    ],
                },
                'app-store/tokens',
                'app-store/limits',
            ],
        },
        {
            type: 'category',
            label: '🔎 Query',
            link: {
                type: 'doc',
                id: 'query/intro',
            },
            items: [
                'query/sample-queries',
                'query/functions',
                'query/grammar',
                'query/limits',
            ],
        },
        {
            type: 'category',
            label: '📊 Visualize',
            link: {
                type: 'doc',
                id: 'visualize/intro',
            },
            items: ['visualize/setup', 'visualize/charting'],
        },
        {
            type: 'category',
            label: '🔔 Notification Rules',
            link: {
                type: 'doc',
                id: 'notification-rules/intro',
            },
            items: ['notification-rules/rules'],
        },
        {
            type: 'category',
            label: '🔌 Integrations',
            link: {
                type: 'doc',
                id: 'integrations/intro',
            },
            items: ['integrations/slack'],
        },
        {
            type: 'category',
            label: '🌎 Org Manager',
            link: {
                type: 'doc',
                id: 'org-manager/intro',
            },
            items: ['org-manager/limits'],
        },
        'billing/intro',
        'support',
    ],
}

module.exports = sidebars
