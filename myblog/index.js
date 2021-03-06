//博客工具
function Tools() {

};
Tools.prototype = {
    constructor: Tools,
    getNumFromRange: function (Min, Max) {
        var Range = Max - Min;
        var Rand = Math.random();
        var num = Min + Math.round(Rand * Range); //四舍五入
        return num;
    }
};
let blogTool = new Tools();

//博客首页顶部导航栏
$('.zlf-menu li').each(function () {
    $(this).click(function () {
        $('.zlf-menu').find('.active').removeClass('active');
        $(this).addClass('active');
    })
});

//侧边导航栏
var zlf_tree = null;
var setting = {
    data: {
        key: {
            children: 'children',
            name: 'name',
            title: 'title',
            checked: 'checked'
        }
    },
    view: {
        showLine: false,
        showIcon: false
    },
    callback: {
        onClick: changeArticles
    }
};

//切换文章类型
function changeArticles(e, aim, obj) {
    var type = obj.type;
    if (type == 'data-construct' || type == 'design-model') {
        body_content.total = 0;
        Noticer.notice('primary', '暂无该类文章，敬请期待');
        return;
    }
    articleInfo.changeArticle(type);
    body_pagination.clearGo();
};
var zNodes =[
    {name:"文章全部分类",title: '文章全部分类', type:"all", children: [
        {name:"日常工作的总结",title: '日常工作的总结', type:"work_sum", children:[]},
        {name:"CSS学习探秘",title: 'CSS学习探秘', type:"css", children:[]},
        {name:"框架:实验室助手",title: '实验室助手: 框架', type:"frame", children:[]},
        {name:"数据结构JS描述",title: '数据结构JS描述', type:"data-construct", children:[]},
        {name:"设计模式:大护法",title: '设计模式:大护法', type:"design-model", children:[]},
        {name:"进步的阶梯:书籍",title: '进步的阶梯:书籍', type:"book-plan", children:[]},
    ]},
];
$.fn.zTree.init($("#zlf-tree"), setting, zNodes);
zlf_tree = $.fn.zTree.getZTreeObj("zlf-tree");

//获取所有节点并展开首节点
var nodes = zlf_tree.getNodes();

if (nodes.length>0) {
    zlf_tree.expandNode(nodes[0], true, true, true);
};
zlf_tree.selectNode(nodes[0]); //选中首节点

//对指定的父节点插入节点 zlf_tree.addNodes(zlf_tree.getNodeByParam("type", 'css', null), {name:"CSS学习探秘",title: 'CSS学习探秘1.1', type:"css", children:[]});
//文章类
function Articles(name, color, title, small, type) {
    this.name = name;
    this.bg_color = color;
    this.title = title;
    this.small = small;
    this.site = '../blogyuan/' +this.name + '/demo.html';
    this.src = '../images/' + this.name + '.png';
    this.type = type;
};

//文章信息
let articleInfo = (function () {

    //边框颜色集
    let color = [
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

    //文章
    let site = [
        'accordion',
        'addClass',
        'appendElement',
        'autofix',
        'base64',
        'clickforBigger',
        'dialogchajian',
        'formdateString',
        'googlebtn',
        'hoverforbigger',
        'hoverpictoshow',
        'htmlandbody',
        'margin',
        'pic&wordLineInMiddle',
        'picchange',
        'reflection',
        'replaceImg',
        'scroll',
        'selectLineWithWord',
        'weibonumber',
        'wordOverFlow',
        'zifuwork'
    ];

    let title = [
        '手风琴效果的图片展示方式',
        'jquery VS mvvm之addClass',
        'jquery VS mvvm之appendElement',
        '自适应布局方式',
        'base64的图片处理技术',
        '点击放大图片和文字',
        'Jquery弹出插件',
        '日期操作和转换格式的常用方式总结',
        '谷歌按钮背后的故事，以及一些常用按钮',
        '滑动显示大图，大图跟随鼠标移动',
        '滑动显示大图,静态版本',
        'html == body?一探究竟',
        'margin学习探索',
        '长度大小未知的文字和图片垂直居中展示',
        '图片轮播',
        '倒影',
        '大小图切换',
        '数据表格滚动分页',
        '单选复选框和文字的对齐',
        '跳动的数字',
        '文字溢出的省略号处理',
        '强大的字符'
    ];
    let type = [
        'work_sum',
        'frame',
        'frame',
        'css',
        'work_sum',
        'work_sum',
        'frame ',
        'work_sum',
        'css',
        'work_sum',
        'work_sum',
        'css',
        'css',
        'css',
        'work_sum',
        'css',
        'css',
        'work_sum',,
        'css',
        'css',
        'css',
        'css'
    ]
    let small = [
        '通过jquery animate让不同长度大小图片动态拉长',
        '两种不同的框架下操作dom元素的类名方式对比',
        '两种不同的框架下操作dom元素的方式对比',
        '内含自适应布局常见三种方式',
        'CSS sprite图片处理技术的另外一种图片显示方式',
        '单击文字或图片内容放大显示且含圆角投影效果',
        '之前做过一个弹窗插件，相较之下，这个更优秀',
        '主要是项目里经常用的转换格式，一般拿来显示字段',
        '按钮也不一定要用图片显示，找了些精致的按钮收集起来',
        '可以说是另外一个滑动显示大图的升级版',
        '自己做的一个滑动显示大图，相形见绌版本',
        '页面元素中html 并不等于body, 影响相关样式操作',
        'margin作为常用的页面元素样式也有些要注意的地方',
        '垂直居中展示作为项目中常用的CSS有必要记录下来',
        '通过Css和jquery来操控图片的位置来达到轮播',
        '这只是一个倒影',
        '字符串replace方法应用于图片的src',
        '通过判断是否滚动到底部来发送请求分页',
        '单选复选框对齐文字的方法收集',
        '让数字改变的同时附有动画效果',
        '用省略号避免文字溢出导致的页面错乱不美观',
        '字符很多时候有出人意外的作用'
    ];
    let information = {
        color: color,
        site: site,
        title: title,
        small: small,
        type: type,
        article: []
    };
    return {
        addArticle: function(value, title, small, type) {
            var color = articleInfo.get('color')[blogTool.getNumFromRange(0, articleInfo.length('color'))];
            information.article.push(new Articles(value, color, title, small, type));
            // console.log(color);
            // body_pagination.init();
        },
        addColor: function(color) {
            information.color.push(color);
            return this;
        },
        initArticle: function() {
            information.site.forEach(function(value, index, arr) {
                information.article.push(new Articles(value, articleInfo.get('color')[blogTool.getNumFromRange(0, articleInfo.length('color'))] || '#e45c5c', articleInfo.get('title')[index], articleInfo.get('small')[index], articleInfo.get('type')[index]));
            });
            // body_pagination.init();
        },
        changeArticle: function(type) {

            if (Array.isArray(information.all)) {

            } else {
                information.all = information.article.concat();
            }

            if (type == 'all') {
                information.article = information.all
            } else {
                information.article = information.all.filter(function(value, index, arr) {
                    return value.type == type;
                });
            }
            body_pagination.init();
        },
        modify: function(type, index, value) {
            information[type][index] = value;
            this.initArticle();
            // body_pagination.init();
        },
        get: function(type) {
            return information[type]
        },
        length: function(type) {
            return information[type].length;
        },
        check: function(type, index) {
            return information[type][index];
        },
        deleteArticle: function(val) {
            var exist = false;
            information.article.forEach(function(value, index, arr) {

                if (value.name == val) {
                    var index = index;
                    exist = true;
                    var articleAfterDelete = information.article.splice(index, 1);

                    if (Array.isArray(information.article.delete)) {
                        information.article.delete.push({
                            article: articleAfterDelete[0],
                            index: index
                        });
                    } else {
                        information.article.delete = [];
                        information.article.delete.push({
                            article: articleAfterDelete[0],
                            index: index
                        });
                    };
                    return;
                } 
            });

            if (exist) {
                body_pagination.init();
            } else {
                return -1
            }
        },
        rebackArticle: function(val) {
            var exist = false;
            information.article.delete.forEach(function(value, index, arr) {

                if (value.article.name == val) {
                    exist = true;
                    information.article.splice(value.index, 0, value.article);
                    return;
                }
            });

            if (exist) {
                body_pagination.init();
            } else {
                return -1;
            }
        }
    }
})();

//vm body
let body_content = avalon.define({
    $id: 'zlf_body',
    article: [],
    total: 0,
    pagination: {
        current: 0,
        total: 0,
        pageSize: 12
    }
});
let body_pagination = avalon.define({
    $id: 'zlf_pagination',
    pagination: {
        current: 0,
        total: articleInfo.length('article'),
        pageSize: 12
    },
    $computed: {
        pageTotal: function () {
            return Math.ceil(this.pagination.total / this.pagination.pageSize);
        }
    },
    previous: function (e) {

        if (this.pagination.current == 0) {
            Noticer.notice('warn', '当前已是首页');
        } else {
            this.pagination.current -= 1;
            this.fetch(this.pagination);
            this.clearGo();
        }
    },
    next: function (e) {
        if (this.pagination.current + 1 >=  this.pageTotal) {
            Noticer.notice('warn', '当前已是最后一页');
        } else {
            this.pagination.current += 1;
            this.fetch(this.pagination);
            this.clearGo();
        }
    },
    first: function(e) {
        this.pagination.current = 0;
        this.fetch(this.pagination);
        this.clearGo();
    },
    last: function(e) {
        this.pagination.current = this.pageTotal - 1;
        this.fetch(this.pagination);
        this.clearGo();
    },
    go: function(e) {

        var num = $('#count').val();
        if (/^[1-9]\d*$/g.test(num) && Number(num) <= this.pageTotal) {
            this.pagination.current = Number(num) - 1;
            this.fetch(this.pagination);
        } else {
            Noticer.notice('fail', '请输入在页码范围内合理的整数');
        }
    },
    clearGo: function(){
        $('#count').val('');
    },
    fetch: function(pagi) {
        body_content.article = articleInfo.get('article').slice(pagi.current * pagi.pageSize, pagi.current * pagi.pageSize + pagi.pageSize);
    },
    init: function() {
        this.pagination = {
            current: 0,
            total: articleInfo.length('article'),
            pageSize: 12
        };
        this.fetch(this.pagination);
        body_content.total = this.pagination.total;
    }
});
articleInfo.initArticle();
/*常规操作文章日志*/
var start = new Date();
//2017-12-14 9:14 因发现弹窗插件有问题，先删除, 后续修复
articleInfo.deleteArticle('dialogchajian');

//2017-12-14 16:49 修复完毕重新恢复提示插件这篇文章
articleInfo.rebackArticle('dialogchajian');

/*
 *2017-12-15 12:00 学习探索lineheight，初步完成这篇文章
 *编辑过程中发现avalon的cdn影响多行垂直居中样式呈现，特此注明
 *因为模板文件都引入该CDN，以后可能会有同样的问题
 */
articleInfo.addArticle('lineheight','CSS lineheight',  '个人对lineheight的学习','css');

//2017-12-15 14:26 增加两种颜色
articleInfo.addColor('#4cc5f4').addColor('#48a76e');

//2017-12-18 10:32 增加一篇学习像素概念的文章
articleInfo.addArticle('px','理解像素的世界',  '我在像素的世界里做像素的东西','css');

//2017-12-19 10:41 增加一种颜色
articleInfo.addColor('#00ccff');

//2017-12-19 11：51增加读书计划一览
articleInfo.addArticle('bookplan', '每月读书计划一览', '多读书多动手多思考', 'book-plan');

//2017-12-19 16:30 总结了之前做的拖动
articleInfo.addArticle('drag', '拖动插件', '让我们拖动起来', 'work_sum');

//2017-12-20 17:31 学习使用prop
articleInfo.addArticle('prop', 'Jquery.prop()', '理解属性和特性概念', 'frame');

//2017-12-21 10:53 用mvvm下的属性指令操作进行对比
articleInfo.addArticle('vmprop', 'avalon:attr={xx:@xx}', '跟jquery.prop()做对比', 'frame');

//2017-12-21 14:52 自己总结了三种获取select选中元素的方法
articleInfo.addArticle('getindex', '获取下拉框选中元素', '日常会用到东西当然要记起来', 'frame');

//2017-12-25 14:12 增加操作样式的方式：改变CSS文件路径
articleInfo.addArticle('changehref', '改变CSS文件路径', '一种常用操作样式的方法', 'work_sum');

//2017-12-25 17:16 增加表单操作技巧
articleInfo.addArticle('formmethod', '表单常用技巧集', '时常操作的表单', 'work_sum');

//2017-12-26 15:04 因为摇号而感慨
articleInfo.addArticle('yaohao', '摇号虐我千百遍', '模拟一下摇号的操作', 'frame');

//2017-12-28 10:57 学习下hack
articleInfo.addArticle('csshack', '几种常用的CSS Hack技巧', '记录一些hack技巧以备后用', 'css');

//2017-12-28 12:00 学习使用一种fade插件
articleInfo.addArticle('fade', '一种方便的淡入淡出插件', '学习一些工具的使用', 'frame');

//2017-12-28 16:20用模拟下拉框解决项目中原生下拉的高度难处理
articleInfo.addArticle('slidetoggle', '模拟下拉框', '用模拟下拉框解决项目中原生下拉的高度难处理', 'work_sum');

//2017-12-29 16:01对于项目中的表单验证功能进行总结
articleInfo.addArticle('vmcheck', 'mvvm框架和jquery对表单字段转换的对比', '对比对比，一起vm', 'work_sum');

//2018-1-1 9:53对于avalon中的$watch方法进行预研究
articleInfo.addArticle('watch', '对VM属性进行watch(偷窥)', '非礼勿视非礼勿听', 'frame');

//2018-1-3 17:53对于avalon中的$watch方法进行预研究
articleInfo.addArticle('checkbox', '复选框不可告人的秘密', '复选框真是个多变的家伙', 'css');

//2018-1-4 10:00看到滑动放大的方式又学习了一种
articleInfo.addArticle('hoverforbig3.0', '滑动放大再次升级版', '滑起来', 'frame');

//2018-1-4 11:37看到一个照片墙觉得很有意思
articleInfo.addArticle('transition', '旋转照片', '蛮有意思', 'css');

//2018-1-4 14:37看到一个照片墙觉得很有意思
articleInfo.addArticle('a', 'a标签的图片显示', 'a标签不仅仅只有文字哦衣服', 'css');

//2018-1-5 11:37对border-image的自我理解
articleInfo.addArticle('borderimg', '边框图片非常炫酷', '效果炫酷，但是属性也比较复杂', 'css');

//2018-1-10 10:57学习了placeholder
articleInfo.addArticle('placeholder', '输入框备注效果', '今天的项目偶然用到一时百度而来', 'css');

//2018-1-12 9:35之前写的一些动画属于做个总结
articleInfo.addArticle('imganimate', 'CSS3动画:神奇的家伙', '本来看着rotateX的，就把感兴趣的动画一起粗略的罗列了', 'css');

//2018-1-15 12:00认识了一种title换行方法
articleInfo.addArticle('titlebr', 'title里的换行', '在项目中用到但是当时一脸蒙蔽', 'work_sum');

//2018-1-16 10:09以前写的现在才提交
articleInfo.addArticle('float', 'float浮动清除', '浮动就是个魔鬼，利大于弊', 'css');

//2018-1-16 15:09绝对定位的一些秘密
articleInfo.addArticle('absolute', 'position:absolute', '绝对定位的一些秘密', 'css');

//2018-1-17 10:04理解包裹的概念
articleInfo.addArticle('baoguo', '包裹', '包裹存在于浮动的领域', 'css');

//2018-2-7 14:41幽灵空白节点
articleInfo.addArticle('strut', '幽灵空白节点', '犹如幽灵一般存在', 'css');

//2018-2-12 11:40品读CSS WORLD第一章
articleInfo.addArticle('csw1', '浅析CSS世界第一章节', 'CSS world first chapter', 'css');

//2018-2-12 11:40品读CSS WORLD第二章
articleInfo.addArticle('csw2', '浅析CSS世界第二章节', 'CSS world second chapter', 'css');

//2018-2-22 8:37品读CSS WORLD第三章
articleInfo.addArticle('csw3', '浅析CSS世界第三章节', 'CSS world third chapter', 'css');

//2018-2-22 16:13品读CSS WORLD第四章
articleInfo.addArticle('csw4', '浅析CSS世界第四章节', 'CSS world fourth chapter', 'css');

//2018-2-26 10:59add a demo from css world
articleInfo.addArticle('wordmid', '包裹性的尺寸用例', '文字少居中，文字多居左', 'css');

//2018-2-26 11:20add a demo from css world
articleInfo.addArticle('height100', 'height100%生效之绝对定位', '绝对定位下高度自适应外部尺寸', 'css');

//2018-2-26 11:40add a demo from css world
articleInfo.addArticle('toggleheight', 'max-height实现过渡的折叠效果', 'max-height的应用', 'css');

//2018-2-26 14:40add a demo from css world
articleInfo.addArticle('imginfo', '利用替换元素向非替换元素转换的特性', '利用特性做的天然的图片信息提示', 'css');

//2018-2-26 14:40基于content的内容生成技术
articleInfo.addArticle('loading', '基于content的内容生成技术', '也叫做::before, ::after伪元素技术', 'css');

//2018-2-26 21:21自适应的大图展示
articleInfo.addArticle('autobg', '自适应横屏展示大图', '常用于大张的宣传图片', 'css');

//2018-2-26 21:21
articleInfo.addArticle('autobuju', '利用margin特性实现的自适应布局', '常用于布局', 'css');

//2018-2-26 21:21
articleInfo.addArticle('labelforbtn', '用label标签模拟原生button', '用以解决button跨浏览兼容性不良', 'css');

//2018-3-2 17:20
articleInfo.addArticle('borderpic', '基于border的图形绘制', 'border的另类用法', 'css');

//2018-3-4 21:15 
articleInfo.addArticle('inlinecm', '再见垂直居中对齐', '常见的垂直对齐方法', 'css');

//2018-3-5 22:10
articleInfo.addArticle('focushref', '基于focus来滚动实现的tab', '一种便利的选项卡', 'css');

//2018-3-7 10:58
articleInfo.addArticle('flyword', '文字飞入效果', 'letter-spcing', 'css');

//2018-3-12 11:01
articleInfo.addArticle('bgsize', '背景图片定位', 'background-position', 'css');

//2018-3-12 14:28
articleInfo.addArticle('dialogmodal', '永恒居中的模态对话框', '弹窗插件', 'css');

console.log('新增时间: '  + (Number(new Date()) - Number(start)));
body_pagination.init();

/*日志结束*/
console.log('初始化时间: '  + (Number(new Date()) - Number(start)));

