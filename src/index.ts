import express from 'express'
import cors from 'cors'
import hotSearchRouter from './routes/hotsearch'

const app = express()
const PORT = process.env.PORT || 3000

// 中间件
app.use(cors())
app.use(express.json())

// 路由
app.use('/api/hotsearch', hotSearchRouter)

// 健康检查
app.get('/health', (req, res) => {
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    service: 'Weibo HotSearch API',
  })
})

// 根路径
app.get('/', (req, res) => {
  res.json({
    message: '微博热搜API服务',
    endpoints: {
      '/api/hotsearch': '获取全部热搜',
      '/api/hotsearch/:count': '获取指定数量的热搜',
      '/health': '健康检查',
    },
  })
})

// 启动服务器
app.listen(PORT, () => {
  console.log(`🚀 微博热搜API服务运行在 http://localhost:${PORT}`)
  console.log(`📊 热搜接口: http://localhost:${PORT}/api/hotsearch`)
})

export default app
