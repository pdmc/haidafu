#!/usr/bin/env bash

pn=`ps aux | grep "node ./bin/www"  | grep -v "grep" | awk 'NR==1{print $2}'`
if [ $pn ];then
	kill -9 $pn
fi
nohup npm start > nohup.out 2>&1 &
tailf nohup.out

