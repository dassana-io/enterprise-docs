// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Dassana Enterprise',
  tagline: 'Cloud Log Lake',
  url: 'https://dassana.io',
  baseUrl: '/',
  onBrokenLinks: 'throw',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.ico',
  organizationName: 'dassana-io', // Usually your GitHub org/user name.
  projectName: 'enterprise-docs', // Usually your repo name.

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          editUrl: 'https://github.com/dassana-io/enterprise-docs/edit/main/docs-root/',
        },
        blog: {
          showReadingTime: true,
          // Please change this to your repo.
          editUrl:
            'https://github.com/dassana-io/enterprise-docs/edit/main/docs-root/blog/',
        },
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
        theme: require('prism-react-renderer/themes/nightOwl')
      },
      colorMode: {
        defaultMode: 'dark',
        disableSwitch: true
      },
      hideableSidebar: true,
      // TODO
      // algolia: {
      //   apiKey: '55a0aff7668a72fee6d0c38474863f60',
      //   indexName: 'dassana'
      // },
      navbar: {
        logo: {
          alt: 'Dassana Logo',
          src: 'img/logo.svg'
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Docs'
          },
          { to: '/blog', label: 'Blog', position: 'left' },
          {
            className: 'header-github-link',
            href: 'https://github.com/dassana-io/enterprise-docs',
            position: 'right'
          }
        ]
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Resources',
            items: [
              {
                label: 'Dassana',
                to: 'https://oss.dassana.io/'
              },
              {
                label: 'Context Hub',
                href: 'https://contexthub.dassana.io/'
              },
              {
                label: 'GitHub',
                href: 'https://github.com/dassana-io/dassana'
              }
            ]
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://join.slack.com/t/dassanacommunity/shared_invite/zt-teo6d5ed-xkWDNSaH4m6pC8PAJnrD8g'
              },
              {
                label: 'GitHub Issues',
                href: 'https://github.com/dassana-io/dassana/issues/'
              },
              {
                label: 'GitHub Discussions',
                href: 'https://github.com/dassana-io/dassana/discussions'
              }
            ]
          },
          {
            title: 'Other',
            items: [
              {
                label: 'Careers',
                href: 'https://dassanaio.notion.site/Job-Board-0a01b48e2ef8462bb3d12e50b8b21c9b'
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/dassana-inc'
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/DassanaSecurity'
              }
            ]
          }
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Dassana Inc.`
      }
    }),
};

module.exports = config;
