@echo off
title Git 项目管理工具
color 0A

:main_menu
cls
echo.
echo ======================================
echo          Git 项目管理工具
echo ======================================
echo.
echo 1. 检查Git仓库状态
echo 2. 拉取远程更新
echo 3. 提交并推送更改
echo 4. 查看提交历史
echo 5. 切换分支
echo 6. 退出
echo.
set /p choice=请输入选项 (1-6): 

if "%choice%"=="1" goto check_status
if "%choice%"=="2" goto pull_changes
if "%choice%"=="3" goto commit_push
if "%choice%"=="4" goto view_history
if "%choice%"=="5" goto switch_branch
if "%choice%"=="6" goto exit_script
goto invalid_choice

:check_status
cls
echo 检查当前目录是否为Git仓库...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前目录不是Git仓库，请切换到正确的目录。
    pause
    goto main_menu
)

echo.
echo 当前Git仓库状态:
echo -----------------
git status
echo.
pause
goto main_menu

:pull_changes
cls
echo 检查当前目录是否为Git仓库...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前目录不是Git仓库，请切换到正确的目录。
    pause
    goto main_menu
)

echo.
echo 检查远程分支...
git remote show origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前仓库没有设置远程分支，请先设置远程分支。
    pause
    goto main_menu
)

echo.
echo 正在拉取远程更新...
git pull origin main
if %errorlevel% neq 0 (
    echo 拉取更新失败，请检查网络连接或解决冲突。
    pause
    goto main_menu
)

echo 拉取更新成功！
pause
goto main_menu

:commit_push
cls
echo 检查当前目录是否为Git仓库...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前目录不是Git仓库，请切换到正确的目录。
    pause
    goto main_menu
)

echo.
echo 检查是否有未提交的更改...
git diff --quiet --exit-code
if %errorlevel% neq 0 (
    echo 检测到未提交的更改，请先提交更改。
    pause
    goto main_menu
)

echo.
set /p commit_message=请输入提交信息 (直接回车使用默认信息 "update"): 
if "%commit_message%"=="" (
    set commit_message=update
)

echo.
echo 正在提交更改...
git add .
git commit -m "%commit_message%"
if %errorlevel% neq 0 (
    echo 提交失败，请检查是否已正确配置Git。
    pause
    goto main_menu
)

echo.
echo 检查远程分支...
git remote show origin >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前仓库没有设置远程分支，请先设置远程分支。
    pause
    goto main_menu
)

echo.
echo 正在推送更改到远程仓库...
git push origin main
if %errorlevel% neq 0 (
    echo 推送失败，请检查网络连接或解决冲突。
    pause
    goto main_menu
)

echo 提交并推送成功！
pause
goto main_menu

:view_history
cls
echo 检查当前目录是否为Git仓库...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前目录不是Git仓库，请切换到正确的目录。
    pause
    goto main_menu
)

echo.
echo 查看提交历史:
echo -----------------
git log --oneline --graph --all
echo.
pause
goto main_menu

:switch_branch
cls
echo 检查当前目录是否为Git仓库...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo 当前目录不是Git仓库，请切换到正确的目录。
    pause
    goto main_menu
)

echo.
echo 当前分支:
git branch
echo.

set /p branch_name=请输入要切换的分支名称: 
if "%branch_name%"=="" (
    echo 分支名称不能为空。
    pause
    goto switch_branch
)

echo.
echo 正在切换分支...
git checkout %branch_name%
if %errorlevel% neq 0 (
    echo 切换分支失败，请检查分支名称是否正确。
    pause
    goto main_menu
)

echo 切换分支成功！
pause
goto main_menu

:exit_script
cls
echo 感谢使用Git项目管理工具！
timeout /t 2 >nul
exit

:invalid_choice
cls
echo 无效的选项，请重新选择。
timeout /t 2 >nul
goto main_menu