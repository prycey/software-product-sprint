// Copyright 2019 Google LLC
//
// Licensed under the Apache License, Version 2.0 (the "License");
// you may not use this file except in compliance with the License.
// You may obtain a copy of the License at
//
//     https://www.apache.org/licenses/LICENSE-2.0
//
// Unless required by applicable law or agreed to in writing, software
// distributed under the License is distributed on an "AS IS" BASIS,
// WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
// See the License for the specific language governing permissions and
// limitations under the License.

/**
 * Adds a random greeting to the page.
 */
function addRandomGreeting() {
  const greetings =
      ['Hello world!', '¡Hola Mundo!', '你好，世界！', 'Bonjour le monde!'];

  // Pick a random greeting.
  const greeting = greetings[Math.floor(Math.random() * greetings.length)];

  // Add it to the page.
  const greetingContainer = document.getElementById('greeting-container');
  greetingContainer.innerText = greeting;
}
 window.onload = function () {
    fetch('/data2').then(response => response.text()).then((quote) => {
    console.log(quote);
    var config = {
    trace: true,
    spiralResolution: 1, //Lower = better resolution
    spiralLimit: 360 * 5,
    lineHeight: 0.8,
    xWordPadding: 0,
    yWordPadding: 3,
    font: "sans-serif"
}
let qoute2 = quote.toString().replace(/\n/ig, '');;
qoute2 = qoute2.split(" ");
console.log(qoute2);
var words = qoute2.map(function(word) {
    return {
        word: word,
        freq: Math.floor(Math.random() * 50) + 10
    }
})

words.sort(function(a, b) {
    return -1 * (a.freq - b.freq);
});

var cloud = document.getElementById("word-cloud");
cloud.style.position = "relative";
cloud.style.fontFamily = config.font;

var traceCanvas = document.createElement("canvas");
traceCanvas.width = cloud.offsetWidth;
traceCanvas.height = cloud.offsetHeight;
var traceCanvasCtx = traceCanvas.getContext("2d");
cloud.appendChild(traceCanvas);

var startPoint = {
    x: cloud.offsetWidth / 2,
    y: cloud.offsetHeight / 2
};

var wordsDown = [];
/* =======================  PLACEMENT FUNCTIONS =======================  */
function createWordObject(word, freq) {
    var wordContainer = document.createElement("div");
    wordContainer.style.position = "absolute";
    wordContainer.style.fontSize = freq + "px";
    wordContainer.style.lineHeight = config.lineHeight;
/*    wordContainer.style.transform = "translateX(-50%) translateY(-50%)";*/
    wordContainer.appendChild(document.createTextNode(word));

    return wordContainer;
}

function placeWord(word, x, y) {

    cloud.appendChild(word);
    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";

    wordsDown.push(word.getBoundingClientRect());
}

function trace(x, y) {
//     traceCanvasCtx.lineTo(x, y);
//     traceCanvasCtx.stroke();
    traceCanvasCtx.fillRect(x, y, 1, 1);
}

function spiral(i, callback) {
    angle = config.spiralResolution * i;
    x = (1 + angle) * Math.cos(angle);
    y = (1 + angle) * Math.sin(angle);
    return callback ? callback() : null;
}

function intersect(word, x, y) {
    cloud.appendChild(word);    
    
    word.style.left = x - word.offsetWidth/2 + "px";
    word.style.top = y - word.offsetHeight/2 + "px";
    
    var currentWord = word.getBoundingClientRect();
    
    cloud.removeChild(word);
    
    for(var i = 0; i < wordsDown.length; i+=1){
        var comparisonWord = wordsDown[i];
        
        if(!(currentWord.right + config.xWordPadding < comparisonWord.left - config.xWordPadding ||
             currentWord.left - config.xWordPadding > comparisonWord.right + config.wXordPadding ||
             currentWord.bottom + config.yWordPadding < comparisonWord.top - config.yWordPadding ||
             currentWord.top - config.yWordPadding > comparisonWord.bottom + config.yWordPadding)){
            
            return true;
        }
    }
    
    return false;
}
/* =======================  END PLACEMENT FUNCTIONS =======================  */





/* =======================  LETS GO! =======================  */
(function placeWords() {
    for (var i = 0; i < words.length; i += 1) {

        var word = createWordObject(words[i].word, words[i].freq);

        for (var j = 0; j < config.spiralLimit; j++) {
            //If the spiral function returns true, we've placed the word down and can break from the j loop
            if (spiral(j, function() {
                    if (!intersect(word, startPoint.x + x, startPoint.y + y)) {
                        placeWord(word, startPoint.x + x, startPoint.y + y);
                        return true;
                    }
                })) {
                break;
            }
        }
    }
})();
/* ======================= WHEW. THAT WAS FUN. We should do that again sometime ... ======================= */



/* =======================  Draw the placement spiral if trace lines is on ======================= */
(function traceSpiral() {
    
    traceCanvasCtx.beginPath();
    
    if (config.trace) {
        var frame = 1;

        function animate() {
            spiral(frame, function() {
                trace(startPoint.x + x, startPoint.y + y);
            });

            frame += 1;

            if (frame < config.spiralLimit) {
                window.requestAnimationFrame(animate);
            }
        }

        animate();
    }
})();

  });
}
$(document).ready(function(){
    $('.menu-toggler').on('click',function(){
        $(this).toggleClass('open');
        $('.top-nav').toggleClass('open');
    });
    
$('.top-nav .nav-link').on('click', function(){
$('.menu-toggler').removeClass('open');
$('.top-nav').removeClass('open');
    });
    
    $('nav a[href*="#"]').on('click', function(){
        $('html, body').animate({
            scrollTop: $($(this).attr('href')).offset().top - 100
        }, 2000)
    });
    AOS.init({
        easing: 'ease',
        duration: 1800
      
      });
});
    $("#uploadForm").submit(function(event) {
        $('#theform')
    .ajaxForm({
        url : "/sentiment", // or whatever
        dataType : 'html',
        success : function (response) {
            //alert("The server says: " + response);
            document.getElementById('sentimentscore').innerHTML = response;
        }
    })
;
    });
