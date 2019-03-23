### 本地测试
```
***拉取项目***
git clone -b dev git@192.168.41.200:jamie/lss-cms.git
或
git clone -b dev http://113.108.203.147:1445/jamie/lss-cms.git

cd lss-cms

***下载项目依赖包***
npm i

***运行项目***
npm test

***浏览器访问***
localhost:3000

***登录***
admin@lss.com
Justekpwd
```

### 服务器部署
```
***拉取项目***
git clone -b dev git@192.168.41.200:jamie/lss-cms.git
或
git clone -b dev http://113.108.203.147:1445/jamie/lss-cms.git

***下载项目依赖包***
npm i

***移除container和image***
docker stop ads-cms-dev
docker rm -f ads-cms-dev
docker rmi ads-cms-dev

***Dockerfile构建image***
docker build -t ads-cms-dev .

***运行image***
docker run -itd --name ads-cms-dev -e "NODE_ENV=dev" --restart=on-failure:3 --network=docker_default --link ads-cms-api-dev -v /home/ubuntu/media/images:/ads-cms/public/images --log-opt max-size=50m -p 3000:3000 ads-cms-dev
```

