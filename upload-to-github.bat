@echo off
echo 正在初始化Git仓库...

REM 设置Node.js路径
set PATH=%PATH%;C:\Program Files\nodejs

REM 初始化Git仓库
git init

REM 添加所有文件
git add .

REM 提交代码
git commit -m "Initial commit: Helinguoji logistics website"

REM 添加远程仓库（请替换为您的GitHub仓库地址）
echo 请将下面的地址替换为您的GitHub仓库地址：
echo git remote add origin https://github.com/loobayn/helinguoji-website.git

REM 推送到GitHub
echo 请执行以下命令推送代码：
echo git branch -M main
echo git push -u origin main

pause 