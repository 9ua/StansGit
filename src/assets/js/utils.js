//设置cookie
export const setCookie = (cname, cvalue, exdays) => {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 1000);
  var expires = "expires=" + d.toUTCString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};
//获取cookie
export const getCookie = (cname) => {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") c = c.substring(1);
    if (c.indexOf(name) != -1) return c.substring(name.length, c.length);
  }
  return "";
};
//清除cookie
export const clearCookie = () => {
  this.setCookie("username", "", -1);
};

export const checkCookie = () => {
  var user = this.getCookie("username");
  if (!user) {
    user = prompt("Please enter your name:", "");
    if (user != "" && user != null) {
      this.setCookie("username", user, 5);
    }
  }
};
