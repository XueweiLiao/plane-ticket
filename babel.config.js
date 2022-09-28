module.exports = {
  presets: [
    '@vue/cli-plugin-babel/preset',
    // 修改此处
    ["@babel/preset-env", { "modules": false }]
  ],

}
