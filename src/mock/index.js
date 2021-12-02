import Mock from "mockjs"
Mock.mock("/api/user", (req, res) => {
  return Mock.mock({
    "user|1-10": [
      {
        'name': '@cname',
        'id|+1': 1,
        'age|10-60': 0,
        'birthday': '@date("yyyy-MM-dd")',
        'city': '@city(true)'
      }
    ]
  })
})