'use strict'
const request = require("request");
const queryString = require('query-string')
const crypto = require('crypto')

function SF(opts) {
  this.checkHeader = opts.checkHeader
  this.checkBody = opts.checkBody
  this.url = opts.url
  this.port = opts.port
  this.path = opts.path
}

SF.prototype.OrderService = function(data) {
  let xml = '<?xml version=\"1.0\" encoding=\"utf-8\" ?>';
  xml += '<Request service=\"OrderService\" lang=\"zh-CN\">';
  xml += '<Head>' + this.checkHeader + '</Head>';
  xml += '<Body>';
  xml += '<Order orderid=\"' + data["orderid"] + '\" express_type=\"' + data["express_type"] + '\" j_company=\"' + data["j_company"] + '\" j_contact=\"' + data["j_contact"] + '\" j_tel=\"' + data["j_tel"] + '\" j_address=\"' + data["j_address"] + '\" d_company=\"' + data["d_company"] + '\" d_contact=\"' + data["d_contact"] + '\" d_tel=\"' + data["d_tel"] + '\" d_address=\"' + data["d_address"] + '\" pay_method=\"' + data["pay_method"] + '\" j_province=\"' + data["j_province"] + '\" j_city=\"' + data["j_city"] + '\" j_county=\"' + data["j_qu"] + '\" d_province=\"' + data["d_province"] + '\" d_city=\"' + data["d_city"] + '\" d_county=\"' + data["d_qu"] + '\" custid=\"' + data["custid"] + '\" remark=\"' + data["remark"] + '\" parcel_quantity="1">';
  if(data["things_num"] != 0 && data["things_num"] != ""){
    xml += '<Cargo name=\"' + data["things"] + '\" count=\"' + data["things_num"] + '\"></Cargo>';
  }
  if(data["daishou"] != "" && data["daishou"] != 0){
    xml += '<AddedService name="COD" value=\"'+data["daishou"]+'\" value1=\"'+data["custid"]+'\" />';
  }
  xml += '</Order>';
  xml += '</Body>';
  xml += '</Request>';
  return xml
}

SF.prototype.Send = function(xml, path) {
  const hash = crypto.createHash('md5', 'utf8')
  // const verifyCode = hash.update(xml + this.checkBody).digest('base64');
  
  const verifyCode = hash.update('<?xml version="1.0" encoding="utf-8" ?><Request service="OrderService" lang="zh-CN"><Head>BSPdevelop</Head><Body><Order orderid="123123" express_type="1"').digest('base64');
  console.log(xml + this.checkBody)
  console.log(verifyCode)
  const self = this;

  request.post({
    url: "http://bsp-ois.sit.sf-express.com:9080/bsp-ois/sfexpressService", 
    form:{ 
      xml: xml, 
      verifyCode: verifyCode
    }
  }, function(err, response, body) {
    console.log(body)
  })
}

module.exports = SF