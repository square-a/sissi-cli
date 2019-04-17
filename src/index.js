const exec = require('child_process').exec;
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
        exec('sissi-core start');
      } catch (error) {
        console.log('I have trouble running this command. Are you sure you\'re in a sissi project folder?');
      }
      return;

    case 'dev':
      try {
        exec('sissi-core dev');
      } catch (error) {
        console.log('I have trouble running this command. Are you sure you\'re in a sissi project folder?');
      }
      return;

    default:
      console.log('Sorry, I don\'t understand.');
  }
};
