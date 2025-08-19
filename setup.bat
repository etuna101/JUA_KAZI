@echo off
cd frontend
call npm init -y
call npm install react react-dom @types/react @types/react-dom typescript @types/node
call npm install @mui/material @emotion/react @emotion/styled @mui/icons-material
call npm install react-router-dom @types/react-router-dom
call npm install --save-dev @typescript-eslint/parser @typescript-eslint/eslint-plugin
call npx create-react-app . --template typescript 