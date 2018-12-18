#!/usr/bin/env bash

pn=`ps aux | grep "node ./bin/www" | awk 'NR==1{print $2}'`
kill -9 $pn
nohup npm start > nohup.out 2>&1 &
tailf nohup.out

