# Kibana 6.x 설치가이드 

## 설치환경 
- CentOS 7 


## 1. openjdk8 설치
```
yum install java-1.8.0-openjdk-devel
```


## 2. YUM 설치방법

https://www.elastic.co/guide/en/kibana/current/rpm.html

```
vi /etc/yum.repos.d/kibana.repo
```

### kibana.repo
```
[kibana-6.x]
name=Kibana repository for 6.x packages
baseurl=https://artifacts.elastic.co/packages/6.x/yum
gpgcheck=1
gpgkey=https://artifacts.elastic.co/GPG-KEY-elasticsearch
enabled=1
autorefresh=1
type=rpm-md
```

### 설치 
```
yum install kibana -y
```

## 3. RPM 설치방법 (ROOT)
```
wget https://artifacts.elastic.co/downloads/kibana/kibana-6.4.2-x86_64.rpm

rpm --install kibana-6.4.2-x86_64.rpm
```

## 4. 설정 및 서비스등록

### /etc/kibana/kibana.yml

```
server.host: "0.0.0.0" (외부접속허용)
i18n.defaultLocale: "ko"
```

### 서비스 등록 
```
sudo systemctl daemon-reload
systemctl enable kibana.service
```

### 방화벽 설정 
```
firewall-cmd --permanent --zone=public --add-port=5601/tcp
firewall-cmd --reload
```

### 서비스 시작
```
systemctl start kibana.service