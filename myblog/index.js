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
    },
    addIcon: function (arr) {

        // 深拷贝原始数据
        var dataSource = JSON.parse(JSON.stringify(arr))
        var res = [];

        // 每一层的数据都 push 进 res
        res.push(...dataSource);

        // res 动态增加长度
        for (var i = 0; i < res.length; i++) {
            var curData = res[i];

            //对数据节点进行处理
            curData.icon = '';

            // 如果有 children 则 push 进 res 中待搜索
            if (curData.children) {
                res.push(...curData.children.map(d => {
                    return d;
                }));
            }
        }
        return dataSource;
    },
    findPathBFS: function (source, goal) {

        // 深拷贝原始数据
        var dataSource = JSON.parse(JSON.stringify(source));
        var res = [];

        // 每一层的数据都 push 进 res
        res.push(...dataSource);

        // res 动态增加长度
        for (var i = 0; i < res.length; i++) {
            var curData = res[i];

            // 匹配成功
            if (curData.orgName === goal) {
                var result = [];

                // 返回当前对象及其父节点所组成的结果
                // return (function findParent(data) {
                //     result.unshift(curData);
                //     return result;
                // })(curData);

                //返回匹配成功的节点
                return curData;
            }

            // 如果有 children 则 push 进 res 中待搜索
            if (curData.childs) {
                res.push(...curData.childs.map(d => {

                    // 在每一个数据中增加 parent，为了记录路径使用
                    d.parent = curData;
                    return d;
                }))
            }
        }

        // 没有搜索到结果，默认返回空数组
        return []
    },
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
        title, title,
        small: small,
        type: type,
        article: []
    };
    return {
        addArticle: function(value, title, small, type) {
            information.article.push(new Articles(value, articleInfo.get('color')[blogTool.getNumFromRange(0, articleInfo.length('color'))], title, small, type));
            body_pagination.init();
        },
        addColor: function(color) {
            information.color.push(color);
            return this;
        },
        initArticle: function() {
            information.site.forEach(function(value, index, arr) {
                information.article.push(new Articles(value, articleInfo.get('color')[blogTool.getNumFromRange(0, articleInfo.length('color'))], articleInfo.get('title')[index], articleInfo.get('small')[index], articleInfo.get('type')[index]));
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
    deleteborder: function(){
        var count_border =  $('#count').css('border');
        var input_border =  $('.input-group-btn').css('border');
        $('#count').css({
            'border': '1px solid yellow'
        });
        $('.input-group-btn').css({
            'border': '1px solid yellow',
            'border-left': '0px'
        });

        if (this.resetborder) {

        } else {
            this.resetborder = function(b1, b2) {
                $('#count').css({
                    'border': count_border
                });
                $('.input-group-btn').css({
                    'border': input_border
                });
            }
        }
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

body_pagination.init();

/*日志结束*/

