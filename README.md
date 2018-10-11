# Elastic 6.4.x 버전 설치 가이드(Basic 버전)

## 설치환경 
- CentOS 7 



## 1. openjdk8 설치
```
yum install java-1.8.0-openjdk-devel
```


## 2. YUM 설치방법

https://www.elastic.co/guide/en/elasticsearch/reference/current/rpm.html

```
cd /etc/yum.repos.d/
vi elasticsearch.repo
```

### elasticsearch.repo
```
[elasticsearch-6.x]
name=Elasticsearch repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```
### 설치 
```
yum install elasticsearch -y
```

## 3. RPM 설치방법 (ROOT)
```
wget https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-6.4.2.rpm

rpm --install elasticsearch-6.4.2.rpm
```

## 4. 설정 및 서비스등록

### /etc/elasticsearch/elasticsearch.yml

```
cluster.name: 클러스터명
node.name: 노드명
path.data: 데이터 저장
path.log: 로그 저장
Bootstrap.memory_lock: true
network.host: 0.0.0.0 (외부접속허용)
```

### Bootstrap 관련 설정

#### /etc/security/limits.conf 
```
* soft nofile 65536
* hard nofile 65536
* soft nproc 65536
* hard nproc 65536

elasticsearch soft memlock unlimited
elasticsearch hard memlock unlimited
```

#### /etc/sysconfig/elasticsearch

```
MAX_LOCKED_MEMORY=unlimited  (주석해제)
```
#### /usr/lib/systemd/system/elasticsearch.service
```
[Service]
...(중략)
LimitMEMLOCK=infinity  (추가)
```

### 서비스 등록 
```
sudo systemctl daemon-reload
systemctl enable elasticsearch.service
```

### 방화벽 설정 
```
firewall-cmd --permanent --zone=public --add-port=9200/tcp
firewall-cmd --permanent --zone=public --add-port=9300/tcp
firewall-cmd --reload
```

### 서비스 시작
```
systemctl start elasticsearch.service
```

