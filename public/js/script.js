inited = false;
free_slot_pos = 12;
free_slot_element = {};
var currently_moving = false;

function init(){
    if (inited){
        return false;
    } 
    pieces_can = []
    pieces_ctx = []
    for(var i=0;i<12;i++){
        var can = document.getElementById('c'+(i+1));
        var ctx = can.getContext('2d');
        pieces_can.push(can)
        pieces_ctx.push(ctx)
    }
    i = setInterval(function(){
        var sWidth = dWidth = 320
        var sHeight = dHeight = 240 
        dx = dy = 0
        var source = document.getElementById('puzzle_image')
        for(var i=0;i<12;i++){
            sx = (i*sWidth)%1280
            sy = ((Math.floor(i/4))*sHeight)
            pieces_ctx[i].drawImage(source, sx, sy, sWidth, sHeight, dx, dy, dWidth, dHeight)
        }
    },30)
    shuffle_pieces()
    var last_piece = document.getElementById('p12')
}
function shuffle_pieces(){
    slots = [1,2,3,4,5,6,7,8,9,10,11,12]
    for(var i=0;i<12;i++){
        a = i
        b = Math.floor(Math.random()*12)
        temp = slots[a]
        slots[a] = slots[b]
        slots[b] = temp
    }
    for(var i=0;i<12;i++){
        piece_element = document.getElementById('p'+(i+1))
        piece_element.className = 'piece pos'+slots[i]
        free_slot_pos = slots[i]
        free_slot_element = piece_element
    }
}
function pieceClicked(piece_element){
    if (currently_moving) {
      return false;
    };
    piece_pos = parseInt(piece_element.className.substring((piece_element.className.indexOf('pos')+3),piece_element.className.length))
    if (canPieceMove(piece_pos)){
        currently_moving = true;
        var target_top = $('#p12').css('top');
        var target_left = $('#p12').css('left');
        $(piece_element).css('z-index', 100);
        $(piece_element).animate(
          {
            top: target_top,
            left: target_left
          },
          500,
          'swing',
          function() {
            piece_element.className = 'piece pos'+free_slot_pos;
            free_slot_element.className = 'piece pos'+piece_pos;
            free_slot_pos = piece_pos;
            currently_moving = false;
          }
        )
    }
}

function canPieceMove(piece_pos){
    return (
        ((piece_pos+1 == free_slot_pos)&&(piece_pos % 4 != 0)) ||
        ((piece_pos-1 == free_slot_pos)&&(piece_pos % 4 != 1)) ||
        ((piece_pos-4 == free_slot_pos)&&(piece_pos-4 >0)) ||
        ((piece_pos+4 == free_slot_pos)&&(piece_pos+4 <=12))
        );
}
function solve(){
    for(var i=0;i<12;i++){
        piece_element = document.getElementById('p'+(i+1))
        piece_element.className = 'piece pos'+(i+1)
    }
}

function restartVideo(){
    document.getElementById('puzzle_image').play()
}
