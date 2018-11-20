# Metricbeat 6.x 설치가이드 

## RPM 설치 

```
sudo rpm -vi metricbeat-6.5.0-x86_64.rpm
```

## /etc/metricbeat/metribeat.yml 수정 

```


#키바나 대시보드 활용 
setup.kibana:
    host: "localhost:5601

#out를 logstash로 하기 때문에 elasticsearch는 주석처리 
#output.elasticsearch

output.logstash:
    hosts: ["192.168.159.5:5044]


#키바나에서 모니터링 사용
xpack.monitoring.enabled: true
xpack.monitoring.elasticsearch:
```

