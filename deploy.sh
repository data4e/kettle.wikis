#!/bin/bash

if [[ -n "$1" ]]; then

	git pull
	vuepress build wiki/

	git add .
	git commit -m "$1"
	git push

	git checkout web-site
	rm -rf -y docs
	git checkout master docs/
	cp -r docs/* ./
	rm -rf docs

	git add .
	git commit -m "$1"
	git push origin web-site

	git checkout master
	git push
else
	echo "请填写提交信息... 例如 ./deploy.sh commmit mesage"
fi
