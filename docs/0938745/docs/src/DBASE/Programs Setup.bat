@echo off
color 2
echo ===================
echo   Programs Setup
echo ===================
:inputs
set /p input = ">>>"
echo %input%

if %input% == "help" (
    echo.
    echo install: install files
    echo exit: exit
    echo help: help
    goto inputs
)

else (
    echo WRONG COMMAND!
    goto inputs
)