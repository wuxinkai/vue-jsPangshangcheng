fs = require('fs')
fs.readFile('data_json/goods.json', 'utf8', function (err, data) {
  //转成对象格式
  let newData = JSON.parse(data)
  // 提取后的数组
  let i = 0 //看提纯后的数据有多少条
  let pushData = [] //存储到新的数组

  //map新数组
  newData.RECORDS.map(function (value, index) {
    //"IMAGE1" 不等于 null,时候才是有用的数据  
    if (value.IMAGE1 != null) {
      i++
      console.log(value.NAME) //打印名字
      pushData.push(value)
    }
  })

  // 写到新的文件中
  fs.writeFile('./data_json/newGoods.json', JSON.stringify(pushData), function (err) {
    if (err) console.log('写文件操作失败');
    else console.log('写文件操作成功');
  });

})




//在下面路径执行 node fxjson.js
// vue-jsPangshangcheng\service> node fsJson.js
