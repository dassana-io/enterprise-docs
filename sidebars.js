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
                id: 'app-store/intro'
            },
            items: [
                {
                    type: 'category',
                    label: 'Apps',
                    link: {
                        type: 'doc',
                        id: 'app-store/apps/apps'
                    },
                    items: [
                        'app-store/apps/cloud-logs/aws/aws',
                        'app-store/apps/custom',
                        'app-store/apps/saas-logs/github'
                    ]
                },
                'app-store/tokens',
                'app-store/default-select-fields',
                'app-store/normalized-fields',
                'app-store/limits'
            ]
        },
        {
            type: 'category',
            label: '🔎 Query',
            link: {
                type: 'doc',
                id: 'query/intro'
            },
            items: [
                'query/SLQ',
                'query/sample-queries',
                'query/functions',
                'query/limits'
            ]
        },
        {
            type: 'category',
            label: '📊 Visualize',
            link: {
                type: 'doc',
                id: 'visualize/intro'
            },
            items: ['visualize/setup', 'visualize/charting']
        },
        {
            type: 'category',
            label: '🕵️‍♀️ Detections',
            link: {
                type: 'doc',
                id: 'detections/intro'
            },
            items: [
                'detections/fields',
                'detections/tagging',
                'detections/limits'
            ]
        },
        {
            type: 'category',
            label: '🔔 Notification Rules',
            link: {
                type: 'doc',
                id: 'notification-rules/intro'
            },
            items: ['notification-rules/create']
        },
        {
            type: 'category',
            label: '🔌 Integrations',
            link: {
                type: 'doc',
                id: 'integrations/intro'
            },
            items: [
                'integrations/slack',
                {
                    type: 'category',
                    label: 'Webhook',
                    link: {
                        type: 'doc',
                        id: 'integrations/webhook/webhook'
                    },
                    items: [
                        'integrations/webhook/reserved-keywords',
                        'integrations/webhook/url-validation',
                        'integrations/webhook/last-events-info'
                    ]
                }
            ]
        },
        {
            type: 'category',
            label: '🌎 Org Manager',
            link: {
                type: 'doc',
                id: 'org-manager/intro'
            },
            items: ['org-manager/limits']
        },
        'billing/intro',
        'support'
    ]
}

module.exports = sidebars
