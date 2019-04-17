const spawn = require('child_process').spawn;
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

    case 'start':
      try {
        spawn('node_modules/.bin/sissi-core', ['start'], { stdio: 'inherit' });
      } catch (error) {
        console.log('I have trouble running this command. Are you sure you\'re in a sissi project folder?');
      }
      break;

    case 'dev':
      try {
        spawn('node_modules/.bin/sissi-core', ['dev'], { stdio: 'inherit' });
      } catch (error) {
        console.log('I have trouble running this command. Are you sure you\'re in a sissi project folder?');
      }
      break;

    default:
      console.log('Sorry, I don\'t understand.');
  }
};
