@echo off
title Git ��Ŀ������
color 0A

:main_menu
cls
echo.
echo ======================================
echo          Git ��Ŀ������
echo ======================================
echo.
echo 1. ���Git�ֿ�״̬
echo 2. ��ȡԶ�̸���
echo 3. �ύ�����͸���
echo 4. �鿴�ύ��ʷ
echo 5. �л���֧
echo 6. �˳�
echo.
set /p choice=������ѡ�� (1-6): 

if "%choice%"=="1" goto check_status
if "%choice%"=="2" goto pull_changes
if "%choice%"=="3" goto commit_push
if "%choice%"=="4" goto view_history
if "%choice%"=="5" goto switch_branch
if "%choice%"=="6" goto exit_script
goto invalid_choice

:check_status
cls
echo ��鵱ǰĿ¼�Ƿ�ΪGit�ֿ�...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰĿ¼����Git�ֿ⣬���л�����ȷ��Ŀ¼��
    pause
    goto main_menu
)

echo.
echo ��ǰGit�ֿ�״̬:
echo -----------------
git status
echo.
pause
goto main_menu

:pull_changes
cls
echo ��鵱ǰĿ¼�Ƿ�ΪGit�ֿ�...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰĿ¼����Git�ֿ⣬���л�����ȷ��Ŀ¼��
    pause
    goto main_menu
)

echo.
echo ���Զ�̷�֧...
git remote show origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰ�ֿ�û������Զ�̷�֧����������Զ�̷�֧��
    pause
    goto main_menu
)

echo.
echo ������ȡԶ�̸���...
git pull origin main
if %errorlevel% neq 0 (
    echo ��ȡ����ʧ�ܣ������������ӻ�����ͻ��
    pause
    goto main_menu
)

echo ��ȡ���³ɹ���
pause
goto main_menu

:commit_push
cls
echo ��鵱ǰĿ¼�Ƿ�ΪGit�ֿ�...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰĿ¼����Git�ֿ⣬���л�����ȷ��Ŀ¼��
    pause
    goto main_menu
)

echo.
echo ����Ƿ���δ�ύ�ĸ���...
git diff --quiet --exit-code
if %errorlevel% neq 0 (
    echo ��⵽δ�ύ�ĸ��ģ������ύ���ġ�
    pause
    goto main_menu
)

echo.
set /p commit_message=�������ύ��Ϣ (ֱ�ӻس�ʹ��Ĭ����Ϣ "update"): 
if "%commit_message%"=="" (
    set commit_message=update
)

echo.
echo �����ύ����...
git add .
git commit -m "%commit_message%"
if %errorlevel% neq 0 (
    echo �ύʧ�ܣ������Ƿ�����ȷ����Git��
    pause
    goto main_menu
)

echo.
echo ���Զ�̷�֧...
git remote show origin >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰ�ֿ�û������Զ�̷�֧����������Զ�̷�֧��
    pause
    goto main_menu
)

echo.
echo �������͸��ĵ�Զ�ֿ̲�...
git push origin main
if %errorlevel% neq 0 (
    echo ����ʧ�ܣ������������ӻ�����ͻ��
    pause
    goto main_menu
)

echo �ύ�����ͳɹ���
pause
goto main_menu

:view_history
cls
echo ��鵱ǰĿ¼�Ƿ�ΪGit�ֿ�...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰĿ¼����Git�ֿ⣬���л�����ȷ��Ŀ¼��
    pause
    goto main_menu
)

echo.
echo �鿴�ύ��ʷ:
echo -----------------
git log --oneline --graph --all
echo.
pause
goto main_menu

:switch_branch
cls
echo ��鵱ǰĿ¼�Ƿ�ΪGit�ֿ�...
git rev-parse --is-inside-work-tree >nul 2>&1
if %errorlevel% neq 0 (
    echo ��ǰĿ¼����Git�ֿ⣬���л�����ȷ��Ŀ¼��
    pause
    goto main_menu
)

echo.
echo ��ǰ��֧:
git branch
echo.

set /p branch_name=������Ҫ�л��ķ�֧����: 
if "%branch_name%"=="" (
    echo ��֧���Ʋ���Ϊ�ա�
    pause
    goto switch_branch
)

echo.
echo �����л���֧...
git checkout %branch_name%
if %errorlevel% neq 0 (
    echo �л���֧ʧ�ܣ������֧�����Ƿ���ȷ��
    pause
    goto main_menu
)

echo �л���֧�ɹ���
pause
goto main_menu

:exit_script
cls
echo ��лʹ��Git��Ŀ�����ߣ�
timeout /t 2 >nul
exit

:invalid_choice
cls
echo ��Ч��ѡ�������ѡ��
timeout /t 2 >nul
goto main_menu