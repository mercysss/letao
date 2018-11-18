$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();

    function render(){
        $.ajax({
            type: "get",
            url: "/category/queryTopCategoryPaging",
            data: {
                page: currentPage,
                pageSize: pageSize
            },
            dataType: "json",
            success: function( info ){
                console.log(info);

                var htmlStr = template("firstTpl", info);
                $("tbody").html( htmlStr );

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil(info.total / info.size),
                    currentPage: info.page,
                    onPageClicked: function(a, b, c, page){
                        currentPage = page;
                        render();
                    }
                })
            }
        })
    };

    // 点击按钮,显示添加模态框
    $('#addBtn').click(function(){

        $('#addModal').modal("show");
    });


    // 表单校验

    $('#form').bootstrapValidator({
        //校验图标
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  
        },

        // 字段列表

        fields:{
            categoryName:{
                validators:{
                    notEmpty:{
                        message:"请输入一级分类"
                    }
                }
            }
        }
    });


    $('#form').on("success.form.bv", function(e){
        e.preventDefault();

        $.ajax({
            type:"post",
            url: "/category/addTopCategory",
            data: $('#form').serialize(),

            dataType:"json",
            success: function(info){
                console.log( info );
                if( info.success ){
                    $('#addModal').modal("hide");
                    console.log("添加成功");
                    currentPage = 1;
                    render();

                    $('#form').data("bootstrapValidator").resetForm( true);
                }
            }
        })
    })
})