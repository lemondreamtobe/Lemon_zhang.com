$(function () {
    $('#scroll-table').scroll(function (e) {
        var pagination = {
            page: 0,
            pageSize: 20
        };
        //滚动条位置  
        var scrollTop = $('#scroll-table').scrollTop();

        //可视窗口的高度  
        var viewportHeight = $('#scroll-table').height();

        //整个页面可以滚动的高度  
        var scrollHeight = $('#scroll-table')[0].scrollHeight;

        //“如果滚动条的位置”+“可视窗口的高度”=“整个页面可以滚动的高度”，那么就调用相应的函数加载数据  
        if (Math.round(scrollTop + viewportHeight) == scrollHeight) {
            var tr = $('<tr><td> good </td> <td> nice </td> /tr>');
            $('#scroll-tbody').append(tr);

            /*
             * pagination.page += 1;
             * dataAjax(pagination); //这里做第二页的数据请求并添加进表格 
             */
        }
    });
})