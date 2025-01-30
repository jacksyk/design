module.exports = {
  extends: require.resolve('@umijs/max/eslint'),
  // plugins: ['react-hooks'],
  rules: {
    // 检查 Hooks 的使用规则
    'react-hooks/rules-of-hooks': 'error',
    // 检查依赖项的声明
    'react-hooks/exhaustive-deps': 'warn',
    'react/jsx-curly-brace-presence': [
      'error',
      { props: 'never', children: 'never' },
    ],
    // 没有引用的代码不想要自动格式化掉
    '@typescript-eslint/no-unused-vars': 'error',
  },
};
