const config = [
    {
      method: 'get',
      url: '/api/mock-0',
      data: {
        'list': [
          { time: "8:00", cost: 38 },
          { time: "19:52", cost: 52 },
          { time: "19:56", cost: 61 }
        ]
      }
    },
    {
      method: 'post',
      url: '/api/mock-1',
      data: () => {
        return {
          'list|1-3': [
            { name: "android", 服务端发出: 18.39, APP收到: 28.8, APP展示: 39.3 },
            { name: "iOS", 服务端发出: 12.4, APP收到: 23.2, APP展示: 34.5 }
          ]
        }
      }
    },
    {
      method: 'jsonp',
      url: '/api/mock-2',
      data: params => params
    }
  ]
  
  module.exports = config
  