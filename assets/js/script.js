function loadJQueryScript(index){
    $(function ($) {

        //console.log($("body").width());
        //console.log($(window).height());
        $("aside").css("height", $(window).height());

        $(window).resize(function () {
            $("aside").css("height", $(window).height());
        });


        $("aside > nav > ul > li > a").on("click", function () {
            if($(this).parent().index() === 0  || $(this).parent().index() === ($("aside > nav li a").length-1)) return;

            $("aside > nav li a").removeClass("aside_item_selected_next").removeClass("aside_item_selected_prev");

            $(this).addClass("aside_item_selected").parent().siblings().children().removeClass("aside_item_selected");
            $(this).parent().prev().children().first().addClass("aside_item_selected_prev");
            $(this).parent().next().children().first().addClass("aside_item_selected_next");
        }).mouseenter(function () {
            if($(this).parent().index() === 0  || $(this).parent().index() === ($("aside > nav li a").length-1)) return;
            if($(this).hasClass("aside_item_selected")) return;
            $(this).addClass("aside_nav_li_hover");
        }).mouseleave(function () {
            $(this).removeClass("aside_nav_li_hover");
        });

        $("aside > nav a img").on("click", function () {
            $("aside > nav li a").removeClass("aside_item_selected")
                .removeClass("aside_item_selected_prev")
                .removeClass("aside_item_selected_next");
        });

        if (index !== undefined){
            $("aside > nav > ul > li > a").eq(index).trigger("click");
        }
    });
}
