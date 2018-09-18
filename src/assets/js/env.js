// 配置编译环境和线上环境之间的切换
// baseUrl: 域名地址
// routerMode: 路由模式


// if (process.env.NODE_ENV == 'development') {
//   baseUrl = 'http://10.25.8.171:8088';
// } else if (process.env.NODE_ENV == 'production') {
//   baseUrl = 'http://edu0370.com';
// }
let baseUrl = '';
//test & prod
if (process.env.NODE_ENV === 'production') {
  if (location.hostname === 'qt.edu0370.com')
    baseUrl = 'http://' + location.hostname.replace('m.', '') + '/';
  else
    baseUrl = 'https://' + location.hostname.replace('m.', '') + '/';
  if (location.hostname === '10.25.8.171')
    baseUrl = 'http://' + location.hostname + ':8088/';
}
//local
else {
  baseUrl = 'http://edu0370.com/';
}
export {
  baseUrl
}