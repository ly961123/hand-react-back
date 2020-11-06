module.exports = {
  // ESLint 允许你指定你想要支持的 JavaScript 语言选项
  parserOptions: {
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  // 你可以在配置文件中指定一个不同的解析器
  parser: '@typescript-eslint/parser',
  env: {
    node: true,
    browser: true,
    jest: true,
    es6: true,
  },
  globals: {
    __GLOBAL__: true,
  },
  settings: {
    react: {
      version: 'detect', // 告诉eslint-plugin-react自动检测要使用的React版本
    },
  },
  // 第三方插件
  plugins: [
    '@typescript-eslint',
    'react-hooks',
  ],
  extends: [
    'plugin:react/recommended',
    'plugin:@typescript-eslint/recommended',
  ],
  rules: {
    // 限制圈复杂度，也就是类似if else能连续接多少个
    complexity: ['error', 10],
    // 箭头函数参数周围加上括号
    'arrow-parens': ['error', 'as-needed'],
    'max-len': ['error', {
      code: 100,
      ignoreStrings: true,
      ignoreUrls: true,
      ignoreTemplateLiterals: true,
      ignoreComments: true
    }],
    // 连续多个不用于缩进的空格
    'no-multi-spaces': 'error',
    // 嵌套三元表达式会使代码更难理解, 默认可行
    'no-nested-ternary': 'off',
    // 允许用require引入
    '@typescript-eslint/no-var-requires': 0,
    // 允许ts用any
    '@typescript-eslint/no-explicit-any': 0,
    // 屏蔽组件定义缺少displayName（反应/显示名称）
    'react/display-name': 0,
    '@typescript-eslint/explicit-module-boundary-types': 0,
    // 字符串只允许单引号或模板字符串
    'quotes': ['error', 'single', { 'allowTemplateLiterals': true }],
    // 此规则强制在 JSX 属性中一致使用双引号或单引号
    'jsx-quotes': ['error', 'prefer-single'],
    indent: [
      'warn',
      2,
      {
        SwitchCase: 1,
        VariableDeclarator: 1,
        outerIIFEBody: 1,
        FunctionDeclaration: {
          parameters: 1,
          body: 1,
        },
        FunctionExpression: {
          parameters: 1,
          body: 1,
        },
        CallExpression: {
          arguments: 1,
        },
        ArrayExpression: 1,
        ObjectExpression: 1,
        ImportDeclaration: 1,
      },
    ],
  },
};
