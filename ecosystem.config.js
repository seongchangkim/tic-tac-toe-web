module.exports = {
    apps: [
        // development 환경
        {
            name: 'tic_tac_toe_dev',
            script: './dist/src/main.js',
            exec_mode: 'fork',
            instances: 1,
            watch: true,
        },
        // production 환경
        {
            name: 'tic_tac_toe_prod',
            script: './dist/src/main.js',
            exec_mode: 'cluster',
            instances: 'max',
        },
    ],
};
