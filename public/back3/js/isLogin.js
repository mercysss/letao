$.ajax({
    type:"get",
    url :"/employee/checkRootLogin",
    dataType:"json",
    success: function(info){
        if(info.success){
            console.log("用户已登录,继续访问");
        }

        if(info.error === 400){
            location.herf = "login.html";
        }
    }
})