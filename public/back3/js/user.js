$(function(){
    var currentPage = 1;
    var pageSize = 5;

    var currentId;
    var isDelete;

    render();

    function render(){
        $.ajax({
            type:"get",
            url:"/user/queryUser",
            data:{
                page: currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success: function(info){
                console.log(info);

                var htmlStr = template("tmp", info);
                
                $('tbody').html(htmlStr);

                $('#paginator').bootstrapPaginator({

                    bootstrapMajorVersion: 3,

                    totalPages: Math.ceil( info.total / info.size ),

                    currentPage: info.page,

                    onPageClicked: function(a, b, c, page){
                        currentPage = page;

                        render();
                    }
                })
            }
        });
    }


    // 给启用禁用按钮添加点击事件
    //事件委托
    $('.lt_content tbody').on("click",".btn",function(){
        $('#userModal').modal("show");
        currentId = $(this).parent().data("id");
        console.log(currentId);
        isDelete = $(this).hasClass("btn-danger") ? 0 : 1;

    });

    //确认按钮被点击,发送请求,改变用户状态
    $('#confirmBtn').click(function() {
        $.ajax({
          type: "post",
          url: "/user/updateUser",
          data: {
            id: currentId,
            isDelete: isDelete
          },
          dataType: "json",
          success: function( info ) {
            console.log( info );
            if ( info.success ) {
              // 修改成功
              // 关闭模态框
              $('#userModal').modal("hide");
              // 页面重新渲染
              render();
            }
          }
        })
      })
})