#!/bin/bash
cd /home/kavia/workspace/code-generation/react-windows-gui-demo-209878-209887/windows_gui_frontend
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

