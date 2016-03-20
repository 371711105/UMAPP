$(document).ready(function () {
    //加载header
    $.ajax({
        url: "../part/header.html",
        type: "GET",
        data: null,
        async: false,//false同步请求
        cache: false,//false不缓存
        success: function (data) {
            $("#header").html(data);
        },
        error: function (xhr, error) {
            layer.msg(error);
        }
    });
    //加载左侧菜单栏
    $.ajax({
        url: "../part/side_bar.html",
        type: "GET",
        data: null,
        async: false,//false同步请求
        cache: false,//false不缓存
        success: function (data) {
            $("#sideBar").html(data);
        },
        error: function (xhr, error) {
            layer.msg(error);
        }
    });
    //加载footer
    $.ajax({
        url: "../part/footer.html",
        type: "GET",
        data: null,
        async: false,//false同步请求
        cache: false,//false不缓存
        success: function (data) {
            $("#footer").html(data);
        },
        error: function (xhr, error) {
            layer.msg(error);
        }
    });
    //根据当前URL，给菜单加active
    //debugger;
    var currentPathName = window.location.pathname;
    var $sideBar = $("ul.page-sidebar-menu");
    var $menuLinks = $sideBar.find("li>a");
    $menuLinks.each(function (index, element) {
        var $self = $(this);
        var selfUrl = $self.attr("href");
        if (currentPathName == "/" + selfUrl) {
            $self.parents("ul>li").addClass("active");
        }
    });
});