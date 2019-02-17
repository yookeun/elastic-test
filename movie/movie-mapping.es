PUT movies 
{
    "mappings": {
        "_doc": {
            "properties": {
                "year": {
                    "type": "date"
                }
            }
        }
    }
}


GET movies/_mapping