
GET /_all/_search


PUT  /_template/school_common_template
{
    "index_patterns": [
        "school_student*",
        "school_teacher*"
    ],
    "order": 0,
    "settings":{
        "number_of_shards": 5,
        "number_of_replicas": 0
    },
    "mappings": {
        "_doc": {
            "_source": {
                "enabled": false
            },
            "properties": {
                "school": {
                    "type": "keyword"
                },
                "name": {
                    "type": "keyword"
                },
                "gender": {
                    "type": "keyword"
                },
                "age": {
                    "type": "integer"
                },
                "regDate": {
                    "type": "date",
                    "format": "yyyy-MM-dd HH:mm:ss"
                }

            }
        }
    }
}

PUT /_template/school_student_template
{
    "index_patterns": [
        "school_student*"
    ],
    "order": 1,
    "mappings": {
        "_doc": {
            "_source": {
                "enabled": true
            },
            "properties": {
                "level": {
                    "type": "keyword"
                },
                "english": {
                    "type": "keyword"
                },
                "math": {
                    "type": "keyword"
                }
            }
        }
    }
}


PUT /_template/school_teacher_template
{
    "index_patterns": [
        "school_teacher*"
    ],
    "order": 1,
    "mappings": {
        "_doc": {
            "_source": {
                "enabled": true
            },
            "properties": {
                "subject": {
                    "type": "keyword"
                },
                "career": {
                    "type":"integer"
                }
            }
        }
    }
}