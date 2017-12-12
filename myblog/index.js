// $(function() {
    $('.zlf-menu li').each(function() {
        $(this).click(function() {
            $('.zlf-menu').find('.active').removeClass('active');
            $(this).addClass('active');
        })
    });
    let colorArr = [
        '#ef7040',
        '#f95422',
        '#303030',
        '#f73656',
        '#003b6a',
        '#e45c5c',
        '#26a69a',
        '#a43024',
        '#f97348',
        '#0078de',
        '#14c3e7',
        '#1552b7',
        '#ff4f11',
        '#db3e3c',
        '#242424',
        '#ffc539'
    ];
    let siteArr = [
        'accordion',
        'addClass',
        'appendElement',
        'array',
        'autofix',
        'base64',
        'clickforBigger',
        'date',
        'dialogchajian',
        'formdateString',
        'function',
        'getandset',
        'googlebtn',
        'hoverforbigger',
        'hoverpictoshow',
        'htmlandbody',
        'margin',
        'objseeprop',
        'pic&wordLineInMiddle',
        'picchange',
        'reflection',
        'regexp',
        'replaceImg',
        'scroll',
        'selectLineWithWord',
        'weibonumber',
        'wordOverFlow',
        'zifuwork'
    ];
    let body_content = avalon.define({
        $id: 'zlf_body',
        article: [{}, {}],
        pagination: {
            current: 0,
            total: 0,
            pageSize: 12
        }
    });
    body_content.article = siteArr.slice(0, body_content.pagination.pageSize).map(function(value, index, arr) {
        return {
            name: value,
            bg_color: colorArr[index]
        }
    });
    console.log(body_content.article);
// })