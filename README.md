# big-future-server

# `/sign`
## GET
### request
```
request headers
    Authorization: {access_token}
```

### response
```json
{
    "status": {
        "success": true,
        "message": "졸업날짜를 입력해주세요."
    },
    "user": {
        "_id": "5a7f00aa3a201b44187...",
        "userID": "144179473925...",
        "userName": "각각각",
        "schoolID": "13607308310...",
        "schoolName": "호우대학교(Hou University)"
    },
    "exist": false
}
```

`exist`의 활용(?)
- true: 이미 가입함 혹은 이미 graduationDate가 존재함
- false: 첫 로그인이여서 새로 생성함. graduationDate 추가 필요

# `/users`
## GET
### request
```
request headers
    Authorization: {access_token}
```

### response
```json
{
    "status": {
        "success": true,
        "message": "성공!"
    },
    "users": [
        {
            "name": "홍길동",
            "id": "11168584298...",
            "picture": "https://scontent.xx.fbcdn.net/v/t1.0..."
        }
    ]
}
```

## PUT
### request
```
request headers
    Authorization: {access_token}
request body
    graduationDate: {yyyy-MM-dd}
```

### response
```json
{
    "status": {
        "success": true,
        "message": "성공!"
    },
    "user": {
        "_id": "5a7f00aa3a201b441874d722",
        "userID": "1441794739250828",
        "userName": "배현빈",
        "schoolID": "136073083107959",
        "schoolName": "숭실대학교(Soongsil University)",
        "graduationDate": "2018-02-15T00:00:00.000Z"
    }
}
```

# `/capsules`
## POST
### request
```
request headers
    Authorization: {access_token}
request body
    receiverID: 75819081738...
    senderID: 538234345...
    content: 오늘 좀 고마웠다 하하
    tag: 좋아요
```

### response
```json
{
    "status": {
        "success": true,
        "message": "성공!"
    }
}
```

## GET
### request
```
request headers
    Authorization: {accesss_token}
request query
    tag: 좋아요 (필수아님!)
```

### response
```json
{
    "status": {
        "success": true,
        "message": "성공!"
    },
    "capsules": [
        {
            "createdDate": "2018-02-10T15:46:54.808Z",
            "_id": "5a7f13eeecc69548f6474a88",
            "receiverID": "144179473925...",
            "senderID": "144179473925...",
            "content": "오늘 좀 고마웠다 하하",
            "tag": "좋아요",
            "senderName": "홍길동",
            "receiverName": "홍길동"
        }
    ]
}
```