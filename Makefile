clone:
	git clone -b dev http://113.108.203.147:1445/jamie/lss-cms.git
pull:	
	git pull http://113.108.203.147:1445/jamie/lss-cms.git dev
# git pull http://113.108.203.147:1445/jamie/lss-cms.git release/0.0.2	
install:
	npm i
remove-container:
	docker stop lss-cms
	docker rm -f lss-cms
remove-image:
	docker rmi lss-cms
build-image:
	docker build -t lss-cms .
run-image-dev:
	docker run -itd --name lss-cms -e "NODE_ENV=dev" --restart=on-failure:3 --network=docker_default --link p1000 --log-opt max-size=50m -p 3000:3000 lss-cms
run-image-staging:
	docker run -itd --name lss-cms -e "NODE_ENV=staging" --restart=on-failure:3 --network=docker_default --link p1000 --log-opt max-size=50m -p 3000:3000 lss-cms
run-image-prod:
	docker run -itd --name lss-cms -e "NODE_ENV=prod" --restart=on-failure:3 --network=docker_default --link p1000 --log-opt max-size=50m -p 3000:3000 lss-cms

one-dev:
	make install
	make remove-container
	make remove-image
	make build-image
	make run-image-dev

one-staging:
	make install
	make remove-container
	make remove-image
	make build-image
	make run-image-staging

one-prod:
	make install
	make remove-container
	make remove-image
	make build-image
	make run-image-prod	