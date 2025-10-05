# readme

api服务 -- 获取微博热搜

## 本地运行

```sh
npm install
npm run build
npm start
```

API 接口
GET / - 服务信息

GET /health - 健康检查

GET /api/hotsearch - 获取全部热搜

GET /api/hotsear - 获取前20条热搜

访问

<http://localhost:3000/api/hotsearch>

响应格式

```json
{
  "success": true,
  "data": [
    {
      "rank": 1,
      "keyword": "晚华爆发后已没了爆火的约人潮",
      "url": "https://s.weibo.com/weibo?q=...",
      "hotValue": 849436
    }
  ],
  "timestamp": 1702540800000
}

```
