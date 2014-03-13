/* ===========================================================
 * jquery-endpage_next.js v1.0
 * ===========================================================
 * Copyright 2013 Pete Rojwongsuriya.
 * http://www.thepetedesign.com
 *
 * Add a scroll-to-next-page/pull-refresh behavior on
 * to your website with End Page Next plugin
 *
 * https://github.com/peachananr/endpage_next
 * 
 * License: GPL v3
 *
 * ========================================================== */

!function($){
  
  var defaults = {
    speed: 8,
    waitTime: 3000,
    position: "bottom",
    type: "overlay",
    topHTML: "Pull to Refresh",
    topUrl: "#",
    bottomHTML: "Hold to Next Page",
    bottomUrl: "#"
  };

  $.fn.endpage_next = function(options){
    var settings = $.extend({}, defaults, options),
        container = $(this),
        posWas = 0,
        status = "off",
        loading = false,
        interval;
        
    
    container.addClass("epn-container");
    
    $(".epn-container").wrapInner("<div class='epn-wrapper'></div>")
    
    $("<div class='epn-nextpage'>" + settings.bottomHTML +"</div>").appendTo(container.find(".epn-wrapper"));

    if (settings.position == "both") $("<div class='epn-nextpage epn-top'>" + settings.topHTML +"</div>").appendTo(container.find(".epn-wrapper"))
    var elH = $(".epn-nextpage").outerHeight(true);
    
    if (settings.position == "top") {
      $(".epn-nextpage").addClass("epn-top")
      $(".epn-nextpage").html(settings.topHTML);
    }
    
    $(document).scroll(function(event){
      var pos = container.scrollTop(),
          diff_bottom = (container.scrollTop() + $(window).height()) - container.height(),
          bottom = (elH * -1) + (diff_bottom * (settings.speed)),
          diff_top = (container.scrollTop() * -1),
          top = (elH * -1) + (diff_top * (settings.speed));
          
      if (bottom >= 0) bottom = 0;
      if (top >= 0) top = 0;
      
        //if the user is scrolling down...
        if(pos > posWas){
          
          // When at the bottom
          if((container.scrollTop() + $(window).height() >= container.height())) {

            if (settings.type == "push") {
              if (settings.position == "bottom" || settings.position == "both") {
                var body_push = (diff_bottom * settings.speed) * -1;
                if (body_push <= (elH * -1)) body_push = elH * -1;
                
                
                
                $(".epn-nextpage:not(.epn-top)").css({
                  "bottom": (elH * -1)
                });
                container.find(".epn-wrapper").css({
                  "-webkit-transform": "translate3d(0, " + body_push  + "px, 0)", 
                  "-moz-transform": "translate3d(0, " + body_push * -1 + "px, 0)", 
                  "-o-transform": "translate3d(0, " + body_push * -1 + "px, 0)", 
                  "transform": "translate3d(0, " + body_push * -1 + "px, 0)"
                });
              }
            } else {
              $(".epn-nextpage:not(.epn-top)").css({
                "bottom": bottom
              });
            }
          } else {
            
            if (loading == false) {

              if (settings.type == "push") {
                if (settings.position == "top" || settings.position == "both") {
                  var body_push2 = (diff_top * settings.speed);
                   if (body_push2 >= elH) body_push2 = elH;
                  if (body_push2 <= 0) body_push2 = 0;
                  $(".epn-nextpage.epn-top").css({
                    "top": (elH * -1)
                  })
                  container.find(".epn-wrapper").css({
                    "-webkit-transform": "translate3d(0, " + body_push2  + "px, 0)", 
                    "-moz-transform": "translate3d(0, " + body_push2  + "px, 0)", 
                    "-o-transform": "translate3d(0, " + body_push2 + "px, 0)", 
                    "transform": "translate3d(0, " + body_push2 + "px, 0)"
                  });
                }

              } else {
                $(".epn-nextpage.epn-top").css({
                  "top": top
                })
              }
            }
          }
          
          
          
          
          
        } else { // When Scrolling Up
          
         // When at the top
         
         if((container.scrollTop() + $(window).height() < container.height())) {
           
           if(container.scrollTop() <= 0) {
             
             if (settings.type == "push") {
               if (settings.position == "top" || settings.position == "both") {
                 var body_push = (diff_top * settings.speed);
                  if (body_push >= elH) body_push = elH;



                  $(".epn-nextpage.epn-top").addClass("epn-top").css({
                    "top": (elH * -1)
                  });


                  container.find(".epn-wrapper").css({
                    "-webkit-transform": "translate3d(0, " + body_push  + "px, 0)", 
                    "-moz-transform": "translate3d(0, " + body_push + "px, 0)", 
                    "-o-transform": "translate3d(0, " + body_push + "px, 0)", 
                    "transform": "translate3d(0, " + body_push + "px, 0)"
                  });
               }
               
             } else {
               $(".epn-nextpage.epn-top").addClass("epn-top").css({
                 "top": top
               });
             }
         
           }
         } else {
           if (loading == false) {

             if (settings.type == "push") {
               if (settings.position == "bottom" || settings.position == "both") {
                 var body_push2 = (diff_bottom * settings.speed) * -1;
                 if (body_push2 <= (elH * -1)) body_push2 = elH * -1;
                 
                $(".epn-nextpage:not(.epn-top)").css({
                  "bottom": (elH * -1)
                });
                container.find(".epn-wrapper").css({
                  "-webkit-transform": "translate3d(0, " + body_push2  + "px, 0)", 
                  "-moz-transform": "translate3d(0, " + body_push2  + "px, 0)", 
                  "-o-transform": "translate3d(0, " + body_push2 + "px, 0)", 
                  "transform": "translate3d(0, " + body_push2 + "px, 0)"
                });
              }
                

             } else {
               $(".epn-nextpage:not(.epn-top)").css({
                 "bottom": bottom
               });
             }
           }
         }
          
          
          
       }
       
       posWas = pos; 
       
       
       
       if (bottom == 0 || top == 0) {
         if (loading == false) {
           if (bottom == 0) loadingNewPage("bottom");
           if (top == 0) loadingNewPage("top");
           loading = true;
         }
       } else {
         if (loading == true) {
           if (bottom != 0) clearLoading("bottom");
           if (top != 0) clearLoading("top");
           loading = false;
         }
       }
         
       
       
    });
    
    function loadingNewPage(position) {
      var selector = ".epn-nextpage.epn-top",
          url = settings.bottomUrl;
      if (position == "bottom") {
        url = settings.bottomUrl;
        selector = ".epn-nextpage:not(.epn-top)";
      } else {
        url = settings.topUrl;
      }
      
      
      $("<div class='epn-progresswrapper'><div id='epn-progressbar'></div></div>").appendTo(selector)
      
      var progressBar = $(selector).find('#epn-progressbar'),
          width = 0;

      progressBar.width(width);
      
      interval = setInterval(function() {

          width += 100 / (settings.waitTime/1000);
          progressBar.css('width', width + '%');
          
          if (width >= 100) {
              clearInterval(interval);
              window.location.href = url;
          }
      }, 1000);
    }
    
    function clearLoading(position) {
      var selector = ".epn-nextpage.epn-top";
      if (position == "bottom") selector = ".epn-nextpage:not(.epn-top)";
      $(selector + " .epn-progresswrapper").remove();
      clearInterval(interval);
    }
  
  }
  
  
}(window.jQuery);
