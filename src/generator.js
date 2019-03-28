const path = require('path');
const Generator = require('yeoman-generator');
const { execSync } = require('child_process');

const {
  getCopyList,
  getTemplateList,
} = require('./fileLists');
const v = require('./validators');

module.exports = class SissiGenerator extends Generator {
  constructor(args, opts) {
    super(args, opts);

    this.isSinglePage = false;
    this.projectName = '';
    this.userName = '';
    this.password = '';
  }

  async prompting() {
    const answers = await this.prompt([{
      type: 'input',
      name: 'projectName',
      message: 'How should sissi call your project?',
      default: 'myNewWebsite',
      validate: v.validateEmptyDir,
    }, {
      type: 'input',
      name: 'userName',
      message: 'Please enter the user name for the cms',
      default: 'admin',
      validate: v.validateNotEmpty,
    }, {
      type: 'input',
      name: 'password',
      message: 'Please enter the password for the cms',
      default: 'abc123',
      validate: v.validateNotEmpty,
    }, {
      type: 'confirm',
      name: 'isSinglePage',
      message: 'Do you want it to be a single page website?',
      default: false,
    }]);

    this.projectName = answers.projectName;
    this.userName = answers.userName;
    this.password = answers.password;
    this.isSinglePage = answers.isSinglePage;
  }

  writing() {
    this.log('Setting up project...');

    this.sourceRoot(path.join(__dirname, 'templates'));
    this.destinationRoot(path.join(process.cwd(), this.projectName));
    const copyList = getCopyList();
    const templateList = getTemplateList({
      projectName: this.projectName,
      userName: this.userName,
      password: this.password,
      isSinglePage: this.isSinglePage,
    });

    copyList.forEach(fileName => {
      let destName = fileName;

      if (fileName.substring(0, 2) === '_.') {
        destName = fileName.substring(1);
      }

      this.fs.copy(
        this.templatePath(fileName),
        this.destinationPath(destName),
      );
    });

    templateList.forEach(template => {
      this.fs.copyTpl(
        this.templatePath(`${template.file}.ejs`),
        this.destinationPath(template.file),
        template.params,
      );
    });
  }

  install() {
    console.log('Installing dependencies');

    this.npmInstall('sissi-core', { silent: true, save: true });
  }

  // eslint-disable-next-line class-methods-use-this
  end() {
    try {
      execSync('git init', { stdio: 'ignore' });
      execSync('git add -A', { stdio: 'ignore' });
      execSync('git commit -m "Initial commit"', { stdio: 'ignore' });

    // eslint-disable-next-line no-empty
    } catch (e) {}
  }
};
