(function(a){if(!a.fn.reverse){a.fn.reverse=function(){return this.pushStack(this.get().reverse(),arguments)}}a.fn.liveTwitter=function(d,b,e){var c=this;a(this).each(function(){var f={};if(this.twitter){f=a.extend(this.twitter.settings,b);this.twitter.settings=f;if(d){this.twitter.query=d}if(this.twitter.interval){this.twitter.refresh()}if(e){this.twitter.callback=e}}else{f=a.extend({mode:"search",rate:15000,limit:10,imageSize:24,refresh:true,timeLinks:true,retweets:false,service:false},b);if(typeof f.showAuthor==="undefined"){f.showAuthor=(f.mode==="user_timeline")?false:true}if(!window.twitter_callback){window.twitter_callback=function(){return true}}this.twitter={settings:f,query:d,interval:false,container:this,lastTimeStamp:0,callback:e,relativeTime:function(i){var h=Date.parse(i);var k=(Date.parse(Date())-h)/1000;var j="";if(k<60){j=k+" seconds ago"}else{if(k<120){j="a minute ago"}else{if(k<(45*60)){j=(parseInt(k/60,10)).toString()+" minutes ago"}else{if(k<(90*60)){j="an hour ago"}else{if(k<(24*60*60)){j=""+(parseInt(k/3600,10)).toString()+" hours ago"}else{if(k<(48*60*60)){j="a day ago"}else{j=(parseInt(k/86400,10)).toString()+" days ago"}}}}}}return j},updateTimestamps:function(){var h=this;a(h.container).find("span.time").each(function(){var i=h.settings.timeLinks?a(this).find("a"):a(this);i.html(h.relativeTime(this.timeStamp))})},apiURL:function(){var l={};var k=(window.location.protocol==="https:")?"https:":"http:";var h="api.twitter.com/1/";var j="";if(this.settings.service){h=this.settings.service+"/api/"}if(this.settings.mode==="search"){h=(this.settings.service)?this.settings.service+"/api/":"search.twitter.com/";j="search";l={q:(this.query&&this.query!=="")?this.query:null,geocode:this.settings.geocode,lang:this.settings.lang,rpp:(this.settings.rpp)?this.settings.rpp:this.settings.limit}}else{if(this.settings.mode==="user_timeline"||this.settings.mode==="home_timeline"){j="statuses/"+this.settings.mode+"/"+encodeURIComponent(this.query);l={count:this.settings.limit,include_rts:(this.settings.mode==="user_timeline"&&this.settings.retweets)?"1":null}}else{if(this.settings.mode==="list"){j=encodeURIComponent(this.query.user)+"/lists/"+encodeURIComponent(this.query.list)+"/statuses";l={per_page:this.settings.limit}}}}var m=[];for(var i in l){if(l.hasOwnProperty(i)&&typeof l[i]!=="undefined"&&l[i]!==null){m[m.length]=i+"="+encodeURIComponent(l[i])}}m=m.join("&");return k+"//"+h+j+".json?"+m+"&callback=?"},parseTweet:function(h){var j={id:(h.id_str)?h.id_str:h.id,text:h.text,created_at:h.created_at};if(this.settings.mode==="search"){j=a.extend(j,{screen_name:h.from_user,profile_image_url:h.profile_image_url})}else{j=a.extend(j,{screen_name:h.user.screen_name,profile_image_url:h.user.profile_image_url,created_at:h.created_at.replace(/^(\w+)\s(\w+)\s(\d+)(.*)(\s\d+)$/,"$1, $3 $2$5$4")})}if(this.settings.service){j=a.extend(j,{url:"http://"+this.settings.service+"/notice/"+j.id,profile_url:"http://"+f.service+"/"+j.screen_name});if(window.location.protocol==="https:"){j.profile_image_url=j.profile_image_url.replace("http:","https:")}}else{j=a.extend(j,{url:"http://twitter.com/#!/"+j.screen_name+"/status/"+j.id,profile_url:"http://twitter.com/#!/"+j.screen_name});if(window.location.protocol==="https:"){var i=j.profile_image_url.match(/http[s]?:\/\/a[0-9]\.twimg\.com\/(\w+)\/(\w+)\/(.*?)\.(\w+)/i);if(i){j.profile_image_url="https://s3.amazonaws.com/twitter_production/"+i[1]+"/"+i[2]+"/"+i[3]+"."+i[4]}else{j.profile_image_url=j.profile_image_url.replace("http:","https:")}}}return j},parseText:function(h){h=h.replace(/[A-Za-z]+:\/\/[A-Za-z0-9-_]+\.[A-Za-z0-9-_:%&\?\/.=]+/,function(i){return i.link(i)});if(!this.settings.service){h=h.replace(/@[A-Za-z0-9_]+/g,function(i){return i.link("http://twitter.com/#!/"+i.replace(/^@/,""))});h=h.replace(/#[A-Za-z0-9_\-]+/g,function(i){return i.link("http://twitter.com/#!/search/"+i.replace(/^#/,"%23"))})}else{h=h.replace(/@[A-Za-z0-9_]+/g,function(i){return i.link("http://"+f.service+"/"+i.replace(/^@/,""))});h=h.replace(/#[A-Za-z0-9_\-]+/g,function(i){return i.link("http://"+f.service+"/search/notice?q="+i.replace(/^#/,"%23"))})}return h},renderTweet:function(i){var h='<div class="tweet tweet-'+i.id+'">';if(this.settings.showAuthor){h+='<img width="'+this.settings.imageSize+'" height="'+this.settings.imageSize+'" src="'+i.profile_image_url+'" />';h+='<p class="text"><span class="username"><a href="'+i.profile_url+'">'+i.screen_name+"</a>:</span> "}else{h+='<p class="text"> '}h+=this.parseText(i.text);if(this.settings.timeLinks){h+=' <span class="time">';h+='<a href="'+i.url+'">';h+=this.relativeTime(i.created_at);h+="</a></span>"}else{h+=' <span class="time">'+this.relativeTime(i.created_at)+"</span>"}h+="</p></div>";return h},refresh:function(h){var i=this;if(i.settings.refresh||h){a.getJSON(i.apiURL(),function(k){var l=0;var j=(i.settings.mode==="search")?k.results:k;a(j).reverse().each(function(){var m=i.parseTweet(this);if(!i.settings.filter||i.settings.filter(this)){if(Date.parse(m.created_at)>i.lastTimeStamp){a(i.container).prepend(i.renderTweet(m));a(i.container).find("span.time:first").each(function(){this.timeStamp=m.created_at});if(!h){a(i.container).find(".tweet-"+m.id).hide().fadeIn()}i.lastTimeStamp=Date.parse(m.created_at);l+=1}}});if(l>0){a(i.container).find("div.tweet:gt("+(i.settings.limit-1)+")").remove();if(i.callback){i.callback(c,l)}a(c).trigger("tweets")}})}},start:function(){var h=this;if(!this.interval){this.interval=setInterval(function(){h.refresh()},h.settings.rate);this.refresh(true)}},stop:function(){if(this.interval){clearInterval(this.interval);this.interval=false}},clear:function(){a(this.container).find("div.tweet").remove();this.lastTimeStamp=null}};var g=this.twitter;this.timeInterval=setInterval(function(){g.updateTimestamps()},5000);this.twitter.start()}});return this}})(jQuery);