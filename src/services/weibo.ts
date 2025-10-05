import axios from 'axios'
import { HotSearchItem } from '../types'

export class WeiboHotSearchService {
  private readonly apiUrl = 'https://weibo.com/ajax/side/hotSearch'

  async getHotSearchList(): Promise<HotSearchItem[]> {
    try {
      console.log('开始获取微博热搜数据...')
      
      const response = await axios.get(this.apiUrl, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36',
          'Accept': 'application/json, text/plain, */*',
          'Accept-Language': 'zh-CN,zh;q=0.9,en;q=0.8',
          'Accept-Encoding': 'gzip, deflate, br',
          'Referer': 'https://weibo.com/',
          'Origin': 'https://weibo.com',
          'Sec-Ch-Ua': '"Not_A Brand";v="8", "Chromium";v="120", "Google Chrome";v="120"',
          'Sec-Ch-Ua-Mobile': '?0',
          'Sec-Ch-Ua-Platform': '"macOS"',
          'Sec-Fetch-Dest': 'empty',
          'Sec-Fetch-Mode': 'cors',
          'Sec-Fetch-Site': 'same-origin',
        },
        timeout: 10000,
      })

      console.log('API响应状态:', response.status)
      console.log('API响应数据结构:', Object.keys(response.data))

      // 检查响应数据结构
      if (!response.data || !response.data.data) {
        throw new Error('API响应数据格式不正确')
      }

      const hotSearchData = response.data.data
      const hotSearchList: HotSearchItem[] = []

      // 解析实时热搜数据
      if (hotSearchData.realtime && Array.isArray(hotSearchData.realtime)) {
        hotSearchData.realtime.forEach((item: any, index: number) => {
          if (item.word) {
            // 构建微博搜索URL
            const searchUrl = `https://s.weibo.com/weibo?q=${encodeURIComponent(item.word)}`
            
            hotSearchList.push({
              rank: item.realpos || (index + 1),
              keyword: item.word,
              url: searchUrl,
              hotValue: item.num || undefined,
              tag: item.label_name || undefined,
            })
          }
        })
      }

      // 如果没有实时数据，尝试其他数据源
      if (hotSearchList.length === 0) {
        console.log('尝试解析其他数据源...')
        
        // 尝试解析其他可能的数据结构
        const dataKeys = Object.keys(hotSearchData)
        console.log('可用的数据键:', dataKeys)
        
        for (const key of dataKeys) {
          const dataArray = hotSearchData[key]
          if (Array.isArray(dataArray) && dataArray.length > 0) {
            console.log(`使用数据源: ${key}`)
            dataArray.forEach((item: any, index: number) => {
              if (item.word || item.title || item.name) {
                const keyword = item.word || item.title || item.name
                // 构建微博搜索URL
                const searchUrl = `https://s.weibo.com/weibo?q=${encodeURIComponent(keyword)}`
                
                hotSearchList.push({
                  rank: item.realpos || (index + 1),
                  keyword: keyword,
                  url: searchUrl,
                  hotValue: item.num || item.hot || undefined,
                  tag: item.label_name || item.tag || undefined,
                })
              }
            })
            break
          }
        }
      }

      console.log(`成功获取到 ${hotSearchList.length} 条热搜数据`)
      return hotSearchList
    } catch (error) {
      console.error('获取微博热搜失败:', error)
      throw new Error(`获取热搜数据失败: ${error instanceof Error ? error.message : '未知错误'}`)
    }
  }

}
