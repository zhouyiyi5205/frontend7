/**
 * 省市县联动
 * @param  {[type]} $ [description]
 * @return {[type]}   [description]
 */

(function (factory) {
    
    if (typeof define === 'function' && define.amd) {
        // AMD
        define(['jquery'], factory);
    } else if (typeof exports === 'object') {
        // CommonJS
        factory(require('jquery'));
    } else {
        // Browser globals
        factory(jQuery);
    }

}(function ($) {

    $.fn.region = function (options) {
        
        if(!options) return;

        //数组 找到当前元素下的所有的select
        //遍历select 将select 的id 还有他的data-id 拼接成
        // p|1
        // c|2
        // d|d
        var parmas = [];

        $(this).find('select').each(function (key, val) {
            parmas.push($(this).attr('id') + '|' + $(this).attr('data-id'));
        });

        // 初始化参数
        var url = options.url || location.pathname,
            type = options.type || 'get',

            //用来保存所有的地区数据的
            region = null,
            // map中的值要和region.json中的省/市/区县key保持一致
            map = ['p', 'c', 'd'];

        // 获取全部数据
        (function () {
            $.ajax({
                url: url,
                type: type,
                dataType: 'json',
                success: function (data) {
                    // var data = $.parseJSON(data);
                    if(!data) return;

                    // 将请求来的地区数据缓存到本地变量中
                    region = data;
                },
                error: function () {
                    console.log('Region error!');
                }
            });
        })();

        // 定时监听地区数据返回
        var t = setInterval(function () {
            // 数据未请求至本地
            if(!region) return;

            // 清除定时器
            clearInterval(t);

            var options = [];

            // 有默认值的状态
            //p|1  c|2  d|2
            for(var i=0; i < parmas.length; i++) {
                var tmp = parmas[i].split('|');
                
                //这是一个对象
                var o = {};

                //把数组中的元素的id值  p拿出来赋值给了 o对象 el属性
                o['el'] = tmp[0];
                //把数组中存的1  data-id 的值 拿出来赋值给 o对象 id属性
                o['id'] = tmp[1];

                //父级行政区的id
                o['pid'] = '000000'; // 省级
                
                o['map'] = map[i];
                
                if(i > 0) {
                    // 查找市/区县的父级ID
                    o['pid'] = parmas[i - 1].split('|')[1];
                }

                options.push(o);
            }

            // 遍历创建
            for(var k=0; k<options.length; k++) {
                var curr = options[k],
                    next = options[k + 1];

                // 创建option选项
                if(region[curr['map']] && region[curr['map']][curr['pid']]) {
                    fill(curr['el'], region[curr['map']][curr['pid']], curr['id']);
                }

                // 切换选项 [缓存next]
                (function (next, k) {
                    $('#' + curr['el']).on('change', function () {
                        var _this = $(this),
                            id = _this.val();

                        if(!next) return;

                        if(region[next['map']]) {
                            fill(next['el'], region[next['map']][id] || [], '');
                        }

                        $.each(options, function (key, val) {
                            if(key > k + 1) {
                                fill(val['el'], [], '');
                            }
                        });

                    });
                })(next, k);
            }

            // 填充选项
            function fill(el, arr, id) {
                var opt = '';

                $.each(arr, function (key, val) {
                    if(key == id) {
                        opt += '<option value="' + key + '" selected>';
                    } else {
                        opt += '<option value="' + key + '">';
                    }

                    opt += val + '</option>'
                });

                $('#' + el + ' option:gt(0)').remove();
                $('#' + el).append(opt);
            }

        }, 200);  
    }
}));