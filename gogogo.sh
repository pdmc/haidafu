#!/usr/bin/env bash

pn=`ps aux | grep "PORT=3001 && node ./bin/www"  | grep -v "grep" | awk 'NR==1{print $2}'`
if [ $pn ];then
	kill -9 $pn
fi
set PORT=3001 && nohup npm start > nohup.out 2>&1 &
tailf nohup.out

