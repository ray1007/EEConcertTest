var count = 0;
$(document).ready(function() {
                  
                  var photos = document.getElementById('list');
                  
                  /*$(photos).blur(function() {
                                 localStorage.setItem('data', this.innerHTML);
                                 });
                  */
                  /*if ( localStorage.getItem('data') ) {
                  photos.innerHTML = localStorage.getItem('data');
                  imgElements = [];
                  $('#list img').each(function(i) {
                                      count++;
                                      imgElements.push(['<img alt="" src="', $(this).attr("src"), '">'].join(''));
                                      });
                  (function(){
                   setTimeout(function(){
                              $('#count').html('已經載入 ' + count + ' 個檔案。');
                              $('#ready').slideDown();
                              },500);
                   }());
                  }*/
                  setTimeout(function(){
                     $('#ready').slideDown();
                  }, 500);
});

var fileDir = "photos/";
//var imgElements = [];
var myTimeout = [];
var zIndexBase = 1000;

var photosToSkip = 52;
for (var i = 0; i < 40; ++i) {
   myTimeout[i] = 10;
}
for (var i = 40; i < photosToSkip + 1; ++i) {
   myTimeout[i] = 3*(i-37)*(i-37);
}

var result = [];
var resultImgElements;
var showResult;


// 用來把一個陣列打亂的 prototype
Array.prototype.shuffle = function() {
   var len = this.length;
   var i = len;
   while (i--) {
      var p = parseInt(Math.random()*len);
      var t = this[i];
      this[i] = this[p];
      this[p] = t;
   }
};

$('#startAgain').click(function(){$('#start').click();});

$('#ready').click(function(){
                  $('#foregroundFrame').slideDown(function(){ // 開始抽獎的 initialize
                                                  $('#list').hide();
                                                  $('#start').click(function(){
                                                                    $('#start').hide();
                                                                    $('#step3').hide();
                                                                    $('#result').show();
                                                                    $('#congrat').hide();
                                                                    $('#startAgain').slideUp();
                                                                    resultImgElements = [];
                                                                    for (var i = 0, len = imgElements.length; i < len; ++i) {
                                                                        // 加上編號, 從 0 開始
                                                                        resultImgElements[i] = ['<span>', i + 1, '</span><br>', imgElements[i]].join('');
                                                                    }
                                                                    resultImgElements.shuffle();
                                                                    if (resultImgElements.length > photosToSkip) {
                                                                        resultImgElements = resultImgElements.slice(-photosToSkip);
                                                                    }
                                                                    showResult = function (i) {
                                                                    $('#result').empty().append(resultImgElements[i]);
                                                                    if (i + 1 < resultImgElements.length) setTimeout(function(){showResult(i+1);}, myTimeout[i]);
                                                                    else setTimeout(function(){$('#congrat').show();$('#startAgain').slideDown();
                                                                                               deletedIdx = $('#result > span').text()-1;
                                                                                               imgElements.splice(deletedIdx,1);
                                                                                    }, myTimeout[i]);
                                                                    };
                                                                    showResult(0);
                                                                    });
                                                  });
                  });

function handleFileSelect(evt) {
   evt.stopPropagation();
   evt.preventDefault();
   var files = evt.dataTransfer.files;
   imgElements = [];
   $('#list').empty();
   for (var i = 0, f; f = files[i]; i++) {
      imgElements.push(['<img alt="" src="', fileDir, f.name, '">'].join(''));
      $('#list').append(imgElements[i]);
   }
   localStorage.setItem('data', document.getElementById('list').innerHTML);
   setTimeout(function(){
              $('#count').html('已經載入 ' + files.length + ' 個檔案。');
              $('#ready').slideDown();
              },500);
}

function handleDragOver(evt) {
   evt.stopPropagation();
   evt.preventDefault();
   evt.dataTransfer.dropEffect = 'copy';
}

var dropZone = document.getElementById('drop_zone');
dropZone.addEventListener('dragover', handleDragOver, false);
dropZone.addEventListener('drop', handleFileSelect, false);