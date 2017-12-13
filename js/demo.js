function Tools() {

};
Tools.prototype = {
    constructor: Tools,
    updateTime: function (time) {
        $('#updateTime').text('最后更新时间: ' + time);
    },
    updateTitle: function (title) {
        $('#blogTitle').text(title);
    }
}
