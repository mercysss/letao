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
})