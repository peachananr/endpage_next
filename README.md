#End Page Next by Pete R.
A jQuery plugin that will let you add pull-to-go-back and scroll-to-go-next navigation to your website without any hassle.
Created by [Pete R.](http://www.thepetedesign.com), Founder of [BucketListly](http://www.bucketlistly.com)

License: [Attribution-ShareAlike 4.0 International](http://creativecommons.org/licenses/by-sa/4.0/deed.en_US)



## Demo
[View demo](http://peachananr.github.io/endpage_next/demo/endpage_next_demo.html)

## Compatibility
Browsers with elastic scrolling such as Mac's Chrome, and Mac's Safari are fully supported. All other modern browsers have partial supports but main functionalities still work nontheless. I have not tested this on IE.

## Basic Usage

With this plugin, you can create a "pull to refresh" and "scroll & hold to go next" functionalities for your website without only minimal code required.

To do this, first you have to include the latest jQuery library together with `jquery.endpage_next.js` and `endpage_next.css` into your document's `<head>`. Now call the function below, and BAM! All done.


````javascript
  $("body").endpage_next({
     speed: 10,                         // Control how fast the bar reacts to your scroll when pulling. Reduce this number to make it slower. The default value is 10.
     waitTime: 2500,                    // The time it takes for the next page to load while you are holding the scroll. This option accepts milliseconds. The default value is 2500.
     position: "bottom",                // You can set the position of the pull-to-load bar here. Available options are "top", "bottom", and "both". "Top" will perform like pull to refresh. "Bottom" will perform like "scroll & hold to go next", and "Both" will let you have both "top" and "bottom" functions. The default value is "bottom".
     type: "overlay",                   // You can either choose to have the bar overlay on top of your content when being pulled or have your content pushed as well. Available options are "overlay", and "push". The default value is "overlay".
     topHTML: "Pull to Refresh",        // You can set the HTML content of the top bar here. Default content is "Pull to Refresh".
     topUrl: "#",                       // You can set where the top bar will take the user to here. This options accepts URL. The default value is "#".
     bottomHTML: "Hold to Next Page",   // You can set the HTML content of the bottom bar here. Default content is "Hold to Next Page".
     bottomUrl: "#"                     // You can set where the bottom bar will take the user to here. This options accepts URL. The default value is "#".
  });
````

Now the plugin will do its magic and add either the top bar or the bottom bar or both to your page without you having to change any existing code. It's a piece of cake isn't it? Your website will now have a navigation that doesn't require any mouse movement. Only scroll and hold. 


If you want to see more of my plugins, visit [The Pete Design](http://www.thepetedesign.com/#design), or follow me on [Twitter](http://www.twitter.com/peachananr) and [Github](http://www.github.com/peachananr).

## Other Resources
- Tutorial (Coming Soon)
