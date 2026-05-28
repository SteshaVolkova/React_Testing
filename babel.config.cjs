module.exports = {
    presets: [
        ['@bable/preset-env', {targets: {esmodules: true, node: 'current'}}],
        ['@bable/preset-react', {runtime: 'automatic' }]
    ],
};