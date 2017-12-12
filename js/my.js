$(function() {
  // 当文档加载完成才会执行
  /**
   * 根据屏幕宽度的变化决定轮播图片应该展示什么
   * @return {[type]} [description]
   */
  function resize() {
    // 获取屏幕宽度
    showDao();
    var windowWidth = $(window).width();
    // 判断屏幕属于大还是小
    var isSmallScreen = windowWidth < 768;
    // 根据大小为界面上的每一张轮播图设置背景
    // $('#main_ad > .carousel-inner > .item') // 获取到的是一个DOM数组（多个元素）
    $('#main_ad > .carousel-inner > .item').each(function(i, item) {
      // 因为拿到是DOM对象 需要转换
      var $item = $(item);
      var imgSrc = $item.data(isSmallScreen ? 'image-xs' : 'image-lg');
      // var imgSrc =
      //   isSmallScreen ? $item.data('image-xs') : $item.data('image-lg');

      // jQuery方式
      // $element.data()
      // 是一个函数 ，专门用于取元素上的自定义属性（data-abc）
      // 函数的参数是我们要取得属性名称（abc）
      //
      // $element.attr('data-abc')
      //
      // JS中的写法
      // element.dataset['abc']
      //
      // element.getAttribute('data-abc')
      // element.setAttribute('data-abc','')

      // 设置背景图片
      // console.log($item);
      $item.css('backgroundImage', 'url("' + imgSrc + '")');
      //
      // 因为我们需要小图时 尺寸等比例变化，所以小图时我们使用img方式
      if (isSmallScreen) {
        $item.html('<img src="' + imgSrc + '" alt="" />');
      } else {
        $item.empty();
      }
    });
  }
  // $(window).on('resize', resize);
  // // 让window对象立即触发一下resize
  // $(window).trigger('resize');


  $(window).on('resize', resize).trigger('resize');
  $('[data-toggle="tooltip"]').tooltip();



  // 用js控制在手机显示下导航条

  function showDao(){
    var ulWidth=$(".nav-tabs");
    var width=30;
    ulWidth.children().each(function(index,ele){
        width+=ele.clientWidth
    })
    if(width>$(window).width()){
      ulWidth.css("width",width).parent().css("overflow-x","scroll");
    }
  }  

  //显示导航条上的字
  var tits=$(".nav-pills li a").each(function(index,ele){
    var s=$(ele).data("title");
    // console.log(s);
    $(this).click(function(){
      $(".news-title").text(s);
    })
  });

  //在手机中用手势控制轮播图的切换
  var carousel=$(".carousel");
  var startX;
  var endX;
  var offset=60;
  carousel.on("touchstart",function(e){
    startX=e.originalEvent.changedTouches[0].clientX;
  });
  carousel.on("touchmove",function(e){
     endX=e.originalEvent.changedTouches[0].clientX;
  });
   carousel.on("touchend",function(e){
    // endX=e.originalEvent.changedTouches[0].clientX;
    var distance=Math.abs(startX-endX);
    if(distance>offset){
      $('.carousel').carousel(startX>endX? 'next':'prev');
    }
  });
});
