// module.exports = require('./lib')
const SF = require('./lib')
const sf = new SF({
  checkHeader: 'BSPdevelop',
  checkBody: 'j8DzkIFgmlomPt0aLuwU',
  url: 'http://bsp-ois.sit.sf-express.com:9080',
  port: 9080,
})
const createOrderOpts = {
  "action":"OrderService","orderid":"123123","express_type":"1","j_company":"西瓜の公司","j_contact":"大西瓜","j_tel":"15842345665","j_province":"山东省","j_city":"青岛市","j_qu":"崂山区","j_address":"丽达广场对面","d_company":"菠萝の公司","d_contact":"大菠萝","d_tel":"15544456578","d_province":"山东省","d_city":"临沂市","d_qu":"兰山区","d_address":"金雀山路齐鲁大厦","pay_method":"1","custid":"5322059827","daishou":"0","things":"小笼包","things_num":"1","remark":"精密仪器，小心轻拿轻放~","OrderService_Mode":"JSON"
}
const xml = sf.OrderService(createOrderOpts)
sf.Send(xml, '/bsp-oisp/sfexpressService')

