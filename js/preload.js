/**
 * Created by wufei on 2017/8/13.
 * ͼƬԤ����
 */

(function($){
    function Preload(imgs,options){
        this.imgs = (typeof imgs === 'string') ? [imgs] : imgs;
        this.opts = $.extend({},Preload.DEFAULTS,options);

        if(this.opts.order === 'ordered'){
            this._ordered();
        }else{
            this._unoredered();
        }
    }
    Preload.DEFAULTS = {
        order:'unordered',//Ĭ�����ʹ������Ԥ����
        each:null,  //ÿһ��ͼƬ������Ϻ�ִ��
        all:null   //����ͼƬ������Ϻ�ִ��
    };
    Preload.prototype._ordered = function(){ //�������
        var opts = this.opts,
            imgs = this.imgs,
            len = imgs.length,
            count = 0;
        load();
        //����Ԥ����
        function load(){
            var  imgObj = new Image();

            $(imgObj).on('load error', function () {
                opts.each && opts.each(count);
                if(count >= len){ //����ͼƬ�������
                    opts.all && opts.all();
                }else{
                    load();
                }
                count++;
            });

            imgObj.src = imgs[count];
        }
    },
    Preload.prototype._unoredered = function(){  //�������
        var imgs = this.imgs,
            opts = this.opts,
            count = 0,
            len = imgs.length;
        $.each(imgs,function(i,src){
            if(typeof  src != 'string') return;
            var imgObj = new Image();
            $(imgObj).on('load error',function(){
                opts.each && opts.each(count);
                if(count >= len -1){
                   opts.all && opts.all();
                }
                count ++;
            });
            imgObj.src = src;
        });
    };
    $.extend({
        preload: function(imgs,opts){
            new Preload(imgs,opts);
        }
    });
})(jQuery);