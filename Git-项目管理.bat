@echo off
:MENU
cls
echo ==============================
echo Git ��Ŀ����ű�
echo ==============================
echo 1. ���Git�ֿ�״̬
echo 2. �ύ�����͸���
echo 3. ��ȡԶ�̸���
echo 6. �˳�
echo ==============================
set /p choice=������ѡ�1/2/3/6���� 

if "%choice%"=="1" goto CHECK_STATUS
if "%choice%"=="2" goto COMMIT_PUSH
if "%choice%"=="3" goto PULL_UPDATE
if "%choice%"=="6" goto EXIT_SCRIPT

echo ��Чѡ�������ѡ��...
pause
goto MENU

:CHECK_STATUS
echo ���ڼ��Git�ֿ�״̬...
git status
pause
goto MENU

:COMMIT_PUSH
echo �ύ�����͸��ģ�
set /p commit_msg=�������ύ��Ϣ��ֱ�ӻس�Ĭ��Ϊ "update"���� 
if "%commit_msg%"=="" set commit_msg=update

echo ����������и��ĵ��ݴ���...
git add .
echo �����ύ���ģ��ύ��ϢΪ��%commit_msg%
git commit -m "%commit_msg%"
echo �������͸��ĵ�Զ�ֿ̲�...
git push
pause
goto MENU

:PULL_UPDATE
echo ���ڴ�Զ�ֿ̲���ȡ����...
git pull
pause
goto MENU

:EXIT_SCRIPT
echo �ű����˳���
exit