const yeoman = require('yeoman-environment');
const packageJson = require('../package.json');

module.exports = function run(args, flags) {
  if (flags.version || flags.v) {
    console.log(packageJson.version);
    return;
  }

  const [command] = args;
  const env = yeoman.createEnv();

  switch (command) {
    case 'new':
      env.register(require.resolve('./generator'), 'sissi:new');
      env.run('sissi:new');
      return;

    default:
      console.log('Sorry, I don\'t understand.');
  }
};
