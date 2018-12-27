#!/usr/bin/env bash

pn=`ps aux | grep "node ./bin/www" | grep -v "grep" | awk 'NR==1{print $2}' | wc -l`
if [ $pn -eq 0 ];then
	cd /var/www/haidafu
	nohup npm start > nohup.out 2>&1 &
	cat "------ restart at `date` ------" >> nohup.out
fi

