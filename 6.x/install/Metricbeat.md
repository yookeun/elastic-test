# Metricbeat 6.x 설치가이드 

## RPM 설치 

```
sudo rpm -vi metricbeat-6.5.0-x86_64.rpm
```

## /etc/metricbeat/metribeat.yml 수정 

기존꺼를 카피해서 새로 만들도록 한다. 
```
cd /etc/metricbeat
cp metribeat.yml metribeat.yml.original
vi metricbeat.yml 
```

