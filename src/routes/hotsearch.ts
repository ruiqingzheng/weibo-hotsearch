import { Router, Request, Response } from 'express'
import { WeiboHotSearchService } from '../services/weibo'
import { HotSearchResponse } from '../types'

const router = Router()
const weiboService = new WeiboHotSearchService()

router.get('/', async (req: Request, res: Response) => {
  try {
    console.log('开始获取微博热搜数据...')
    const hotSearchList = await weiboService.getHotSearchList()

    const response: HotSearchResponse = {
      success: true,
      data: hotSearchList,
      timestamp: Date.now(),
    }

    res.json(response)
  } catch (error) {
    console.error('API错误:', error)

    const errorResponse: HotSearchResponse = {
      success: false,
      data: [],
      timestamp: Date.now(),
      message: error instanceof Error ? error.message : '未知错误',
    }

    res.status(500).json(errorResponse)
  }
})

// 获取特定数量的热搜
router.get('/:count', async (req: Request, res: Response) => {
  try {
    const count = parseInt(req.params.count) || 50
    const hotSearchList = await weiboService.getHotSearchList()

    const limitedList = hotSearchList.slice(0, count)

    const response: HotSearchResponse = {
      success: true,
      data: limitedList,
      timestamp: Date.now(),
    }

    res.json(response)
  } catch (error) {
    console.error('API错误:', error)

    const errorResponse: HotSearchResponse = {
      success: false,
      data: [],
      timestamp: Date.now(),
      message: error instanceof Error ? error.message : '未知错误',
    }

    res.status(500).json(errorResponse)
  }
})

export default router
