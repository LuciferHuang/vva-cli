#!/usr/bin/env node
const { readdirSync, lstatSync, existsSync, mkdirSync, writeFileSync, readFileSync } = require('fs');
const { join } = require('path');
const { prompt } = require('inquirer');
const { renderFile } = require('ejs');
const { white, green, red } = require("chalk");
const boxen = require("boxen");

// utils

function successBox(message, title) {
  return box(message, green(title), green('✔ Success'), {
    borderColor: "green",
  });
}

function errorBox(message, title) {
  return box(message, red(title), red('✖ Error'), {
    borderColor: "red",
  });
}

function box(message, title, boxTitle, options) {
  return (
    boxen(
      [
        boxTitle,
        title,
        "",
        white(message),
      ].join("\n"),
      Object.assign(
        {
          borderColor: "white",
          borderStyle: "round",
          padding: 1,
          margin: 1,
        },
        options
      )
    ) + "\n"
  );
}

const questions = [{
  type: 'input',
  name: 'name',
  message: 'Project name ?',
  default: "my_vva",
},
{
  type: 'input',
  name: 'version',
  message: 'Project version ?',
  default: "0.0.0",
}]

// main

prompt([
  {
    type: 'list',
    name: 'template',
    message: 'Please select a template ?',
    choices: ['csr', 'ssr'],
    default: "csr",
  },
]).then(async (templateAnwsers) => {
  const { template } = templateAnwsers;
  if (template === 'csr') {
    questions.push({
      type: 'list',
      name: 'language',
      message: 'Select language ?',
      choices: ['Chinese', 'English'],
      default: "cn",
      filter: (v) => {
        const map = { Chinese: 'cn', English: 'en' };
        return map[v] || 'cn';
      }
    })
  }

  const anwsers = await prompt(questions);
  let isSuccess = true;
  // 创建项目目录
  const { name = 'myVva' } = { ...anwsers };
  const projectDir = join(process.cwd(), name);
  mkdir(projectDir);
  
  // 开始读取模板目录文件
  readTempl(join(__dirname, 'templates', template), projectDir);
  
  if (isSuccess) {
    process.stdout.write(successBox(`您可以通过以下命令运行项目：\n\n$ cd ${name} \n$ npm install \n$ npm run dev`, `${name} 创建完成 🎉`))
  }
  
  function readTempl(templDir, distDir) {
    try {
      const files = readdirSync(templDir);
      files.forEach(async (file) => {
        const filePath = join(templDir, file);
        const isDir = lstatSync(filePath).isDirectory();
        const clientDir = join(distDir, file);
        if (isDir) {
          mkdir(clientDir);
          readTempl(filePath, clientDir);
        } else {
          await transTempl(clientDir, filePath);
        }
      })
    } catch (error) {
      isSuccess = false;
      process.stdout.write(errorBox(error, '创建失败'));
    }
  }
  // 创建目录
  function mkdir(clientDir) {
    if (!existsSync(clientDir)) {
      mkdirSync(clientDir);
    }
  }
  // 替换模板
  function transTempl(clientDir, filePath) {
    return new Promise((rs) => {
      try {
        if (['.jpg','.jpeg','.png', '.gif'].filter((formate) => filePath.includes(formate)).length) {
          writeFileSync(clientDir, readFileSync(filePath));
          rs(true);
        } else  {
          renderFile(filePath, anwsers, (err, result) => {
            if(err) throw err;
            writeFileSync(clientDir, result);
            rs(true);
          })
        }
      } catch (err) {
        isSuccess = false;
        process.stdout.write(errorBox(err, '模板替换出错'));
        rs(false);
      }
    })
  }
})
