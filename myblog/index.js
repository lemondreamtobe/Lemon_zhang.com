$('.zlf-menu li').each(function () {
    $(this).click(function () {
        $('.zlf-menu').find('.active').removeClass('active');
        $(this).addClass('active');
    })
});

//文章信息
let articleInfo = (function () {

    //边框颜色集
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

    //文章
    let siteArr = [
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
    return {
        add: function (aim, name) {
            aim.push(name);
        },
        modify: function (aim, value, index) {
            aim[index] = value;
        },
        delete: function (val) {
           var index = siteArr.indexOf(val);

           if (index !== -1) {
               [siteArr, title, small].forEach(function(value, key, arr) {
                   
                    if (Array.isArray(value.delete)) {
                        value.delete.push({
                            index: index,
                            content: value[index]
                        });
                    } else {
                        value.delete = [];
                        value.delete.push({
                            index: index,
                            content: value[index]
                        });
                    }
               });
               siteArr.splice(index, 1);
               title.splice(index, 1);
               small.splice(index, 1);
           } else {
               throw error('文章不存在');
           }
        },
        reback: function(article) {
            var exist = true;
            var key = 0;

            siteArr.delete.forEach(function (value, index, arr) {

                if (value.content == article) {
                    key = value.index;
                    exist = true;
                    siteArr.splice(value.index, 0, value.content);
                    return;
                }
            });    
            
            if (exist) {
                [title, small].forEach(function(value, index, arr) {
                    value.delete.forEach(function(value_inner, index_inner, arr_inner) {

                        if (value_inner.index == key) {
                            value.splice(value_inner.index, 0, value_inner.content);
                        }
                    });
                });
            } else {
                throw error('文章不存在');
            }
        },
        check: function (aim, index) {
            return aim[index];
        },
        length: function(aim) {
            return aim.length;
        },
        handle: function (aim, type, value, index) {
            var which = '';
            var _self = this;
            switch (aim) {
                case 'site':
                    which = siteArr;
                    break;

                case 'title':
                    which = title;
                    break

                case 'small':
                    which = small;
                    break;

                case 'color':
                    which = colorArr;
                    break;
            };
            if (type == 'check') {
                return _self[type](which, index) 
            } else if (type == 'add' || type == 'modify') {
                return _self[type](which, value, index);
            } else {
                return _self[type](which);
            }
        },
        getColor: function () {
            return colorArr;
        },
        getSite: function () {
            return siteArr;
        },
        getTitle: function () {
            return title;
        },
        getSmall: function () {
            return small;
        }
    }
})();

/*常规操作文章*/
//2017-12-14 9:14 因发现弹窗插件有问题，先删除, 后续修复
articleInfo.delete('dialogchajian');



//文章类
function Articles(name, color, title, small) {
    this.name = name;
    this.bg_color = color;
    this.title = title;
    this.small = small;
    this.site = 'http://www.lemon-zhang.cn/blogyuan/' +this.name + '/demo.html';
    this.src = '../images/' + this.name + '.png';
};

//常用函数工具
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

//vm body
let body_content = avalon.define({
    $id: 'zlf_body',
    article: [],
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
        total: articleInfo.handle('site', 'length'),
        pageSize: 12
    },
    $computed: {
        pageTotal: function () {
            return Math.ceil(this.pagination.total / this.pagination.pageSize);
        }
    },
    previous: function (e) {

        if (this.pagination.current == 0) {
            alert('当前已是首页');
        } else {
            this.pagination.current = this.pagination.current -this.pagination.pageSize;
            this.fetch(this.pagination);
        }
    },
    next: function (e) {
        if (this.pagination.current >=  this.pageTotal) {
            alert('当前已是最后一页');
        } else {
            this.pagination.current = this.pagination.current + this.pagination.pageSize;
            this.fetch(this.pagination);
        }
    },
    fetch: function(pagi) {
        var title = articleInfo.getTitle().slice(pagi.current, pagi.current + pagi.pageSize);
        var small = articleInfo.getSmall().slice(pagi.current, pagi.current + pagi.pageSize);
        body_content.article = articleInfo.getSite().slice(pagi.current, pagi.current + pagi.pageSize).map(function (value, index, arr) {
            return new Articles(value, articleInfo.getColor()[blogTool.getNumFromRange(0, 15)], title[index], small[index]);
        });
    },
    init: function() {
        this.pagination = {
            current: 0,
            total: articleInfo.handle('site', 'length'),
            pageSize: 12
        };
        this.fetch(this.pagination);
    }
});
body_pagination.init();
console.log(articleInfo.handle('site', 'length'));
console.log(body_pagination.pageTotal);

// })
