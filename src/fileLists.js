export function getCopyList() {
  return [
    '_.gitignore',
    '_.sissi',
    'public/favicon.png',
    'public/images',
    'src/index.js',
    'src/components/Section.js',
  ];
}

export function getTemplateList(options) {
  return [
    {
      file: 'package.json',
      params: {
        PROJECT_NAME: options.projectName,
      },
    },
    {
      file: 'config.json',
      params: {
        PASSWORD: options.password,
        USER_NAME: options.userName,
      },
    },
    {
      file: 'content.json',
      params: {
        PROJECT_NAME: options.projectName,
        IS_SINGLE_PAGE: options.isSinglePage,
      },
    },
    {
      file: 'structure.json',
      params: {
        PROJECT_NAME: options.projectName,
        IS_SINGLE_PAGE: options.isSinglePage,
      },
    },
    {
      file: 'public/index.html',
      params: {
        PROJECT_NAME: options.projectName,
      },
    },
    {
      file: 'src/components/Page.js',
      params: {
        IS_SINGLE_PAGE: options.isSinglePage,
      },
    },
    {
      file: 'src/styles/sissi.scss',
      params: {
        IS_SINGLE_PAGE: options.isSinglePage,
      },
    },
  ];
}
