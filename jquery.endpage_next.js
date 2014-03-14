/* ===========================================================
 * jquery-endpage_next.js v1.0.1
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
    nextUrl: "#",
    speed: 8,
    waitTime: 3000,
    position: "bottom",
    type: "overlay",
    topHTML: "Go to Previous Page",
    topUrl: "#",
    bottomHTML: "Go to Next Page",
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
    
    if (settings.position == "top") {
      $(".epn-nextpage").addClass("epn-top")
      $(".epn-nextpage").html(settings.topHTML);
    }
    
    var elHtop = $(".epn-nextpage.epn-top").outerHeight(true);
    var elHbottom = $(".epn-nextpage:not(.epn-top)").outerHeight(true);
    
    $(".epn-nextpage:not(.epn-top)").css({
      "bottom": "-1000%"
    });
    
    $(".epn-nextpage.epn-top").css({
      "position": "fixed",
      "top": (elHtop * -1)
    });
    
    $(".epn-nextpage.epn-top").click(function() {
      window.location.href = settings.topUrl;
    });
    
    $(".epn-nextpage:not(.epn-top)").click(function() {
      window.location.href = settings.bottomUrl;
    });
    
    
    
    $(window).on('scroll touchmove', function(event) {
      
      var pos = window.pageYOffset,
          diff_bottom = (pos + $(window).height()) - container.height(),
          bottom = (elHbottom * -1) + (diff_bottom * (settings.speed)),
          diff_top = (pos * -1),
          top = (elHtop * -1) + (diff_top * (settings.speed));
      if (bottom >= 0) bottom = 0;
      if (top >= 0) top = 0;
      
        //if the user is scrolling down...
        if(pos > posWas){
          
          // When at the bottom
          if((pos + $(window).height() >= container.height())) {

            if (settings.type == "push") {
              if (settings.position == "bottom" || settings.position == "both") {
                var body_push = (diff_bottom * settings.speed) * -1;
                if (body_push <= (elHbottom * -1)) body_push = elHbottom * -1;
                
                
                
                $(".epn-nextpage:not(.epn-top)").css({
                  "bottom": (elHbottom * -1)
                });
                container.find(".epn-wrapper").css({
                  "-webkit-transform": "translate3d(0, " + body_push  + "px, 0)", 
                  "-moz-transform": "translate3d(0, " + body_push  + "px, 0)", 
                  "-o-transform": "translate3d(0, " + body_push  + "px, 0)", 
                  "transform": "translate3d(0, " + body_push + "px, 0)"
                });
              }
            } else {
              if ((pos + $(window).height()) - (container.height() + 1) == 0) bottom = 0
              $(".epn-nextpage:not(.epn-top)").css({
                "bottom": bottom
              });
            }
          } else {

           
            if (loading == false) {

              if (settings.type == "push") {
                if (settings.position == "top" || settings.position == "both") {
                  var body_push2 = (diff_top * settings.speed);
                   if (body_push2 >= elHtop) body_push2 = elHtop;
                  if (body_push2 <= 0) body_push2 = 0;
                  
                  $(".epn-nextpage.epn-top").css({
                    "top": (elHtop * -1)
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
         
         if((pos + $(window).height() < container.height())) {
           
           if(pos <= 0) {
             
             if (settings.type == "push") {
               if (settings.position == "top" || settings.position == "both") {
                 var body_push = (diff_top * settings.speed);
                  if (body_push >= elHtop) body_push = elHtop;

                  if (pos == 0) body_push = elHtop

                  $(".epn-nextpage.epn-top").addClass("epn-top").css({
                    "top": (elHtop * -1)
                  });


                  container.find(".epn-wrapper").css({
                    "-webkit-transform": "translate3d(0, " + body_push  + "px, 0)", 
                    "-moz-transform": "translate3d(0, " + body_push + "px, 0)", 
                    "-o-transform": "translate3d(0, " + body_push + "px, 0)", 
                    "transform": "translate3d(0, " + body_push + "px, 0)"
                  });
               }
               
             } else {
              if (pos == 0) top = 0
              
               $(".epn-nextpage.epn-top").addClass("epn-top").css({
                 "top": top
               });
             }
         
           } else {
             if (pos + $(window).height() <= container.height()) {
               bottom = (elHbottom * -1)
               $(".epn-nextpage:not(.epn-top)").css({
                 "bottom": bottom
               });
             }
           }
         } else {
           
           if (loading == false) {

             if (settings.type == "push") {
               if (settings.position == "bottom" || settings.position == "both") {
                 var body_push2 = (diff_bottom * settings.speed) * -1;
                 if (body_push2 <= (elHbottom * -1)) body_push2 = elHbottom * -1;
                $(".epn-nextpage:not(.epn-top)").css({
                  "bottom": (elHbottom * -1)
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