var http = require('http');
var cheerio = require('cheerio');
var url = 'http://www.imooc.com/learn/348'; 

http.get(url, function(res){
     var _html = '';

     res.on('data',function(data){
        _html += data;
     });

     res.on('end',function(){
     	  printCourseInfo(filerChapters(_html));
     	  //console.log(_html);
     })
}).on('error', function(err){
	  console.log('抓取数据出错！');
})

/**
 * [filerChapters 组装数据]
 * @param  {[type]} html [description]
 * @return {[type]}      [description]
 */
function filerChapters(html){
      var $ = cheerio.load(html);
      var chapters = $('.mod-chapters');
      var courseData = [];
      // 数据格式
      // [{
      // 	 chapterTitle: '',
      // 	 videos: [
      //       title: '',
      //       id: ''   
      // 	 ]
      // },{}]
      
       chapters.each(function(item){
          var chapter = $(this);
          var chapterTitle = chapter.find('strong').text();
          var videos = chapter.find('.video').children('li');
          var chapterData = {
          	   chapterTitle: chapterTitle,
               videos: []
          }

          videos.each(function(item){
               var video = $(this).find('.J-media-item');
               var videoTitle = video.text();
               var id = video.attr('href').split('video/')[1];

               chapterData.videos.push({
               	   title: videoTitle,
               	   id: id
               })
          })

          courseData.push(chapterData);
       })
    
       
       return courseData;
}

/**
 * [printCourseInfo 打印显示]
 * @param  {[type]} course [description]
 * @return {[type]}        [description]
 */
function printCourseInfo(course){
   var course = course || [];
   course.forEach(function(item){
        var chapterTitle = item.chapterTitle;
        console.log(chapterTitle + '\n');

        item.videos.forEach(function(item){
                console.log('    [' + item.id + ']' + item.title + '\n');
        })
   })
}