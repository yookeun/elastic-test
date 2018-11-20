# Logstash 6.4.x 설치가이드 

## 설치환경 
- CentOS 7 

> VM에서 Elasticserch, kibnana, Logstash가 같이 설치되려면 최소 메모리는 4G 이상이어야 한다. 


## 1. openjdk8 설치
```
yum install java-1.8.0-openjdk-devel
```

## 2. YUM 설치방법

https://www.elastic.co/guide/en/logstash/current/installing-logstash.html

```
vi /etc/yum.repos.d/logstash.repo
```


### logstash.repo

```
[logstash-6.x]
name=Elastic repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```


### File descriptor 설정
(/etc/security/limits.conf)

```
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536

logstash soft memlock unlimited
logstash hard memlock unlimited
```


### 서비스 등록 
```
sudo systemctl daemon-reload
systemctl enable logstash.service
```

### 서비스 시작
```
systemctl start logstash.service




