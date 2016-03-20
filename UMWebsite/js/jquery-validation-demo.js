$(document).ready(function () {
    $("#submitForm").validate({
        //ajax提交方式
        //submitHandler: function (form) {
        //    //debugger;
        //    //$(form).ajaxSubmit();
        //},
        //debug，只验证不提交表单
        debug: true,
        //更改错误信息显示的位置,要放前面
        errorPlacement: function (error, element) {
            // debugger;
            if (element.attr("name") == "agreeRegister") {
                error.appendTo($(element).parents(".agree-group"));
            }
            else {
                error.appendTo(element.parent());
            }
        },
        rules: {
            email: {
                required: true,
                email: true
            },
            mobilePhone: {
                required: true
            },
            password: {
                required: true,
                minlength: 6,
                maxlength: 16
            },
            confirmPassword: {
                required: true,
                equalTo: "#password",
            },
            agreeRegister: {
                required: true
            }
        }
    });
});