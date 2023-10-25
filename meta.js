const path = require('path')

const {
  sortDependencies,
  installDependencies,
  runLintFix,
  printMessage,
} = require('./utils')
const pkg = require('./package.json')

const templateVersion = pkg.version

module.exports = {
  helpers: {
    if_or(v1, v2, options) {

      if (v1 || v2) {
        return options.fn(this)
      }

      return options.inverse(this)
    },
    template_version() {
      return templateVersion
    },
  },
  prompts: {
    name: {
      type: 'string',
      required: true,
      message: '请输入项目名称',
    },
    description: {
      type: 'string',
      required: false,
      message: '请输入项目描述',
      default: '一个使用rollup构建的项目',
    },
    author: {
      type: 'string',
      message: '请输入作者',
    },
    ts: {
      type: 'confirm',
      message: '是否使用typescript?',
    },
    autoInstall: {
      type: 'list',
      message:
        '项目创建后是否需要执行 `install`?（推荐）',
      choices: [
        {
          name: '是, 使用 Pnpm',
          value: 'pnpm',
          short: 'pnpm',
        },
        {
          name: '是, 使用 NPM',
          value: 'npm',
          short: 'npm',
        },
        {
          name: '是, 使用 Yarn',
          value: 'yarn',
          short: 'yarn',
        },
        {
          name: '否, 手动安装',
          value: false,
          short: 'no',
        },
      ],
    },
  },
  filters: {
    '+(build|config|src)/**/*.ts{,x}': 'ts',
    '+(build|config|src)/**/*.js{,x}': '!ts',
    'tsconfig.json': 'ts',
  },
  complete: function(data, { chalk }) {
    const green = chalk.green

    sortDependencies(data, green)

    const cwd = path.join(process.cwd(), data.inPlace ? '' : data.destDirName)

    if (data.autoInstall) {
      installDependencies(cwd, data.autoInstall, green)
        .then(() => {
          return runLintFix(cwd, data, green)
        })
        .then(() => {
          printMessage(data, green)
        })
        .catch(e => {
          console.log(chalk.red('Error:'), e)
        })
    } else {
      printMessage(data, chalk)
    }
  },
}
