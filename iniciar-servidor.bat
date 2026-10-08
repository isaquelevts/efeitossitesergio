@echo off
cd /d "%~dp0"
echo Galeria rodando em http://localhost:5530  (feche esta janela para parar)
start "" http://localhost:5530
python -m http.server 5530
