import glob from "glob"
import fs from "fs"
import rimraf from "rimraf"
import {
  transformFileSync
} from '@babel/core'

const textArr = [];

function i18nPick(path = '.') {
  glob(`${process.cwd()}/src/**/*.{ts,tsx,js,jsx}`, {
    // ignore: exclude.map(pattern => `${path}/${pattern}`)
  }, (error, files) => {
    files.forEach(filename => {
      if (filename.includes('node_modules')) {
        return;
      }
      // 如果文件目录带了_，我认为他是测试用例
      if (filename.indexOf('_') !== -1) {
        return;
      }

      transformFileSync(filename, {
        presets: [
          ["@babel/preset-typescript", {
            allExtensions: true,
            isTSX: true
          }],
          [
            "@babel/env",
            {
              "targets": "chrome > 58",
              "modules": false,
              "useBuiltIns": "usage",
              corejs: {
                version: "3.24.1",
                proposals: true
              },
              loose: false,
            }
          ],
          "@babel/preset-react"
        ],
        plugins: [
          "@babel/plugin-transform-typescript",
          "@babel/plugin-syntax-typescript",
          ["@babel/plugin-proposal-decorators", {
            "legacy": true
          }],
          "@babel/plugin-proposal-class-properties",
          "@babel/plugin-proposal-object-rest-spread",
          "@babel/plugin-syntax-dynamic-import",
          // scan,
        ]
      });

    });

    const targetDir = 'i18n-messages'
    // 这里写到text中，为了避免重复
    // 创建文件夹
    rimraf.sync(targetDir);
    fs.mkdirSync(targetDir);
    fs.appendFile(`${targetDir}/sourcemap.txt`, textArr.map((item, i) => `${item}#${i}\n`).join(''), function (err) {
      if (err) {
        return console.error(err);
      }
      console.log(`----共扫描中文文案 ${textArr.length} 条----`);
    });
    // fs.appendFile(`${targetDir}/zh-CH.json`, `${JSON.stringify([...zhCH.values()], null, '\t')}`, function (err) {
    //   if (err) {
    //     return console.error(err);
    //   }
    //   console.log(`----去重后中文文案为 ${zhCH.size} 条----`);
    // });
  })
}

export {
  i18nPick
}