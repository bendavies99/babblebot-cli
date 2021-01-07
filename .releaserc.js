module.exports = {
    branches: ['main', { name: "next", channel: "channel-next", prerelease: "alpha" }],
    plugins: [
        '@semantic-release/commit-analyzer',
        '@semantic-release/release-notes-generator',
        '@semantic-release/changelog',
        ['@semantic-release/git', { assets: ["CHANGELOG.md"] }],
        '@semantic-release/github',
        '@semantic-release/npm',
    ],
};