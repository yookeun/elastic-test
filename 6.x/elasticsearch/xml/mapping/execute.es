

###
DELETE simple-xml 

###
PUT simple-xml 
{
    "mappings": {
        "simplexml": {
            "properties": {
                "simpleInfo": {                    
                    "properties": {
                        "userName": {
                            "type": "keyword"
                        },
                        "age": {
                            "type": "integer"
                        },
                        "gender": {
                            "type": "keyword"
                        },
                        "regDate": {
                            "type": "keyword"                            
                        }
                    }
                }
            }

        }
    }
}

###
PUT simple-xml 
{
    "mappings": {
        "simplexml": {
            "properties": {
                "simpleInfo": {                             
                    "properties": {
                        "userName": {
                            "type": "keyword"
                        },
                        "age": {
                            "type": "integer"
                        },
                        "gender": {
                            "type": "keyword"
                        },
                        "regDate": {
                            "type": "date",
                            "format": "yyyyMMddHHmmss"
                        }
                    }
                }
            }

        }
    }
}

###
GET simple-xml/_search

###
GET simple-xml/_mapping