# 유료라이센스 & SSL 적용방법 




## 먼저 키바나에서 30-day trial로 라이센스 설정한다

> Management -> License Management -> Start a 30-day trial



## xpack 보안을 설정한다. 


### elasticsearch.yml 
```
xpack.secuirty.enabled: true
```

## 패스워드 설정

### /usr/share/elasticsearch
```
[root@centos7_elk elasticsearch]# ./bin/elasticsearch-setup-passwords interactive
Initiating the setup of passwords for reserved users elastic,kibana,logstash_system,beats_system.
You will be prompted to enter passwords as the process progresses.
Please confirm that you would like to continue [y/N]y


Enter password for [elastic]: 
Reenter password for [elastic]: 
Enter password for [kibana]: 
Reenter password for [kibana]: 
Passwords do not match.
Try again.
Enter password for [kibana]: 
Reenter password for [kibana]: 
Enter password for [logstash_system]: 
Reenter password for [logstash_system]: 
Enter password for [beats_system]: 
Reenter password for [beats_system]: 
Changed password for user [kibana]
Changed password for user [logstash_system]
Changed password for user [beats_system]
Changed password for user [elastic]
```

> systemctl restart elasticsearch.service

### kibana.yml

```
xpack.security.enabled: true
elasticsearch.username: "kibana"
elasticsearch.password: "kibana1234"
```

> systemctl restart kibana.service


## SSL 설정 

### SSL 설치 

유료로 받은 라이센스를 업데이트 하기전에 `PALTINUM` 라이센스라면 SSL를 세팅해야 된다. 

```
[root@centos7_elk elasticsearch]# ./bin/elasticsearch-certgen
중략...

Please enter the desired output file [certificate-bundle.zip]: 
Enter instance name: ykkim-vm
Enter name for directories and files [ykkim-vm]: 
Enter IP Addresses for instance (comma-separated if more than one) []: 192.168.59.5
Enter DNS names for instance (comma-separated if more than one) []: ykkim-elk 
Would you like to specify another instance? Press 'y' to continue entering instance information: n
Certificates written to /usr/share/elasticsearch/certificate-bundle.zip

중략...
```
- Enter instance name : 인스턴스명
- Enter IP Addresses for instance (comma-separated if more than one) []: 서버아이피, 여러대이면 콤머로 구분 
- Enter DNS names for instance (comma-separated if more than one)[] : 호스트명 (여러대 이면 콤머구분)
- Would you like to specify another instance? Press 'y' to continue entering instance information : n (인증키를 추가로 만들 것인지..)

해당경로 인증관련 파일인 `certificate-bundle.zip` 가 만들어진 것을 확인할 수 있다. 

/etc/elasticsearch 로 가서 mkdir cert 를 만들고 그쪽으로 옮기고 압축을 해제하자.

```
cd cert
mv /usr/share/elasticsearch/certificate-bundle.zip . 
unzip certificate-bundle.zip

```

### elasticsearch.yml 수정 

```
xpack.ssl.key: /etc/elasticsearch/cert/ykkim-vm/ykkim-vm.key
xpack.ssl.certificate: /etc/elasticsearch/cert/ykkim-vm/ykkim-vm.crt
xpack.ssl.certificate_authorities: [ "/etc/elasticsearch/cert/ca/ca.crt" ]
xpack.security.transport.ssl.enabled: true
```
> systemctl restart elasticsearch.service

이제 디시 키바나로 가서 라이센스를 업데이트해주면 된다. 그런 다음 elastic 접속정보를 수정해주자. 

### kibana.yml

```
xpack.security.enabled: true
elasticsearch.username: "kibana"
elasticsearch.password: "kibana1234"
elasticsearch.ssl.certificateAuthorities: /etc/kibana/cert/ca/ca.crt
```

키바나를 재시작한다. 


## Logstash 설정 

### logstash.yml 

모니터링 설정과 파이프라인 설정 

```
# 자동읽기 적용 
config.reload.automatic: true
config.reload.interval: 3s


xpack.monitoring.enabled: true
xpack.monitoring.elasticsearch.username: logstash_system
xpack.monitoring.elasticsearch.password: logstash1234
xpack.monitoring.elasticsearch.url: ["https://192.168.59.5:9200"]
xpack.monitoring.elasticsearch.ssl.ca: "/etc/logstash/cert/ca/ca.crt"
xpack.monitoring.elasticsearch.ssl.verification_mode: none
xpack.monitoring.elasticsearch.sniffing: false
xpack.monitoring.collection.interval: 10s
xpack.monitoring.collection.pipeline.details.enabled: true


xpack.management.enabled: true
xpack.management.pipeline.id: ["main"]
xpack.management.elasticsearch.username: elastic
xpack.management.elasticsearch.password: elastic1234
xpack.management.elasticsearch.url: ["https://192.168.59.5:9200"]
xpack.management.elasticsearch.ssl.ca: "/etc/logstash/cert/ca/ca.crt"
xpack.management.elasticsearch.ssl.verification_mode: none
xpack.management.elasticsearch.sniffing: false
xpack.management.logstash.poll_interval: 5s
```


### Test용 로그 

키바나에서 직접 파이프라인을 `main` 명으로 등록한다 

```
input {
    file {
        path => ["/home/data/*.log"]
        start_position => "beginning"
        sincedb_path => "/dev/null"
    }
}
filter {
}
output {
    stdout {
        codec => rubydebug
    }
    file {
        path => "/home/logstash/logs/testout.log"
        file_mode => -1
        write_behavior => "append"
    }
}
```

stdout으로는 출력이 되지 않아서 파일로 출력한다. 