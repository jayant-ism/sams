
var canvas, ctx,
    brush = {
        x: 0,
        y: 0,
        color: '#000000',
        size: 10,
        down: false,
    },
    strokes = [],
    currentStroke = null;

function redraw () {
    ctx.clearRect(0, 0, canvas.width(), canvas.height());
    ctx.lineCap = 'round';
    for (var i = 0; i < strokes.length; i++) {
        var s = strokes[i];
        ctx.strokeStyle = s.color;
        ctx.lineWidth = s.size;
        ctx.beginPath();
        ctx.moveTo(s.points[0].x, s.points[0].y);
        for (var j = 0; j < s.points.length; j++) {
            var p = s.points[j];
            ctx.lineTo(p.x, p.y);
        }
        ctx.stroke();
    }
}

function init () {
    canvas = $('#draw');
    canvas.attr({
        width: window.innerWidth,
        height: window.innerHeight,
    });
    ctx = canvas[0].getContext('2d');

    function mouseEvent (e) {
        brush.x = e.pageX;
        brush.y = e.pageY;

        currentStroke.points.push({
            x: brush.x,
            y: brush.y,
        });

        redraw();
        sendmouse(brush.x,brush.y);
    }

    canvas.mousedown(function (e) {
        brush.down = true;

        currentStroke = {
            color: brush.color,
            size: brush.size,
            points: [],
        };

        strokes.push(currentStroke);

        mouseEvent(e);
    }).mouseup(function (e) {
        brush.down = false;

        mouseEvent(e);

        currentStroke = null;
    }).mousemove(function (e) {
        if (brush.down)
            mouseEvent(e);
    });

    $('#save-btn').click(function () {
        window.open(canvas[0].toDataURL());
    });

    $('#undo-btn').click(function () {
        strokes.pop();
        redraw();
        sendmouse(1,1);
    });

    $('#clear-btn').click(function () {
        strokes = [];
        redraw();
        sendmouse(0,0);
    });

    $('#color-picker').on('input', function () {
        brush.color = this.value;
    });

    $('#brush-size').on('input', function () {
        brush.size = this.value;
    });
}

$(init);
socket = io.connect('http://localhost:3000');
    // We make a named event called 'mouse' and write an
    // anonymous callback function
    socket.on('mouse',
      // When we receive data
      function(data) {
        console.log("Got: " + data.x + " " + data.y);
        if(data.x==0&&data.y==0)
        {
            strokes = [];
            redraw();
        }
        else if(data.x==1&&data.y==1)
        {
            strokes.pop();
            redraw();
        }
        else
        {   
        var ctx=document.getElementById("draw").getContext("2d");
        ctx.fillStyle="#ff2626";
        ctx.beginPath();
        ctx.arc(data.x,data.y,5,0,Math.PI*2,true);
        ctx.fill();
        currentStroke.points.push({
            x: data.x,
            y: data.y,
        });
        strokes.push(currentStroke);
        }
      }
    );

  function sendmouse(xpos, ypos) {
    // We are sending!
    console.log("sendmouse: " + xpos + " " + ypos);
    
    // Make a little object with  and y
    var data = {
      x: xpos,
      y: ypos
    };
  
    // Send that object to the socket
    socket.emit('mouse',data);
  }
