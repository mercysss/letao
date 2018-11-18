$(function(){
    var currentPage = 1;

    var pageSize = 5;
    render();

    function render(){
        $.ajax({
            type:"get",
            url: "/category/querySecondCategoryPaging",
            data:{
                page:currentPage,
                pageSize: pageSize
            },
            dataType:"json",
            success:function(info){
                console.log(info);

                var htmlStr = template("secondTpl", info);
                $('tbody').html(htmlStr);


                // 分页初始化

                $('#paginator').bootstrapPaginator({
                    bootstrapMajorVersion: 3,
                    totalPages: Math.ceil( info.total / info.size),
                    currentPage: info.page,
                    onPageClicked: function(a,b,c,page){
                        currentPage =page;
                         render();
                    }
                })
            }
        })
    }

    // 点击按钮,显示模态框
    $('#addBtn').click(function(){
        $('#addModal').modal("show");

        $.ajax({
            type:"get",
            url: "/category/queryTopCategoryPaging",
            data:{
                page : 1,
                pageSize: 100
            },
            dataType:"json",
            success:function(info){
                console.log(info);
                var htmlStr = template("dropdownTpl", info);
                $('.dropdown-menu').html(htmlStr);
            }
        })
    });


    $('.dropdown-menu').on("click", "a", function(){
        var txt = $(this).text();
        $('#dropdownText').text(txt);

        var id = $(this).data("id");
        $('[name="categoryId"]').val( id );

        $('#form').data("bootstrapValidator").updateStatus("categoryId", "VALID")
    });

    // 进行文件上传初始化

    $('#fileupload').fileupload({
        dataType:"json",
        done: function(e,data){
            console.log( data );

            var result = data.result;

            var picUrl = result.picAddr;

            $('#imgBox img').attr("src", picUrl );

            $('[name="brandLogo"]').val( picUrl );

            $('#form').data("bootstrapValidator").updateStatus("brandLogo","VALID");
        }
    });


    $('#form').bootstrapValidator({
        excluded: [],
        feedbackIcons:{
            valid: 'glyphicon glyphicon-ok',    // 校验成功
            invalid: 'glyphicon glyphicon-remove',  // 校验失败
            validating: 'glyphicon glyphicon-refresh'  
        },

        fields:{
            categoryId:{
                validators:{
                    notEmpty:{
                        message: "请选择一级分类"
                    }
                }
            },

            brandName:{
                validators:{
                    notEmpty:{
                        message:"请输入二级分类"
                    }
                }
            },

            brandLogo:{
                validators:{
                    notEmpty:{
                        message:"请选择照片"
                    }
                }
            }
        }
    })
})