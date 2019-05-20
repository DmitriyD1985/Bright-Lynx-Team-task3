//объявляем переменные
var base = 60;
var clocktimer,dateObj,dh,dm,ds,ms;
var readout='';
var h=1,m=1,tm=1,s=0,ts=0,ms=0,init=0;

//функция для очистки поля
// секундомер спер, не мой это
function ClearСlock() {
    clearTimeout(clocktimer);
    h=1;m=1;tm=1;s=0;ts=0;ms=0;
    init=0;
    readout='00:00:00.00';
    document.MyForm.stopwatch.value=readout;
}

//функция для старта секундомера
function StartTIME() {
    var cdateObj = new Date();
    var t = (cdateObj.getTime() - dateObj.getTime())-(s*1000);
    if (t>999) { s++; }
    if (s>=(m*base)) {
        ts=0;
        m++;
    } else {
        ts=parseInt((ms/100)+s);
        if(ts>=base) { ts=ts-((m-1)*base); }
    }
    if (m>(h*base)) {
        tm=1;
        h++;
    } else {
        tm=parseInt((ms/100)+m);
        if(tm>=base) { tm=tm-((h-1)*base); }
    }
    ms = Math.round(t/10);
    if (ms>99) {ms=0;}
    if (ms==0) {ms='00';}
    if (ms>0&&ms<=9) { ms = '0'+ms; }
    if (ts>0) { ds = ts; if (ts<10) { ds = '0'+ts; }} else { ds = '00'; }
    dm=tm-1;
    if (dm>0) { if (dm<10) { dm = '0'+dm; }} else { dm = '00'; }
    dh=h-1;
    if (dh>0) { if (dh<10) { dh = '0'+dh; }} else { dh = '00'; }
    readout = dh + ':' + dm + ':' + ds + '.' + ms;
    document.MyForm.stopwatch.value = readout;
    clocktimer = setTimeout("StartTIME()",1);
}

function newColor()
{
    let table= document.getElementsById("th");
    cell.onclick = function () {
        cell.style.background = 'red';
    }

}


//Функция запуска и остановки
function StartStop() {
    if (init==0){
        ClearСlock();
        dateObj = new Date();
        StartTIME();
        init=1;
    } else {
        clearTimeout(clocktimer);
        init=0;
        newColor();
    }
}
var pics = new Array();
for (i = 0; i <= 18; i++) {
    pics = new Image();
    pics.src = 'image' + i + '.gif';
}
var map=new Array(1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 14, 14, 15, 15, 16, 16, 17, 17, 18, 18);
var user = new Array();
var temparray = new Array();
var clickarray = new Array(0, 0);
var ticker, sec, min, ctr, id, oktoclick, finished;

function init() {
    for (i = 0; i <= 35 ;i++) {
        user = 0;
    }
    ticker = 0;
    min = 0;
    sec = 0;
    ctr = 0;
    oktoclick = true;
    finished = 0;
    document.f.b.value = "";
    scramble();
    runclk();
    for (i = 0; i <= 35; i++) {
        document.f[('img'+i)].src = "image0.gif";
    }
}
function runclk() {
    min = Math.floor(ticker/60);
    sec = (ticker-(min*60))+'';
    if(sec.length == 1) {sec = "0"+sec};
    ticker++;
    document.f.b.value = min+":"+sec;
    id = setTimeout('runclk()', 1000);
}
function scramble() {
    for (z = 0; z < 5; z++) {
        for (x = 0; x <= 35; x++) {
            temparray[0] = Math.floor(Math.random()*36);
            temparray[1] = map[temparray[0]];
            temparray[2] = map[x];
            map[x] = temparray[1];
            map[temparray[0]] = temparray[2];
        }
    }
}
function showimage(but) {
    if (oktoclick) {
        oktoclick = false;
        document.f[('img'+but)].src = 'image'+map[but]+'.gif';
        if (ctr == 0) {
            ctr++;
            clickarray[0] = but;
            oktoclick = true;
        } else {
            clickarray[1] = but;
            ctr = 0;
            setTimeout(returntoold, 600);
        }
    }
}
function returntoold() {
    if ((clickarray[0] == clickarray[1]) && (!user[clickarray[0]])) {
        document.f[('img'+clickarray[0])].src = "image0.gif";
        oktoclick = true;
    } else {
        if (map[clickarray[0]] != map[clickarray[1]]) {
            if (user[clickarray[0]] == 0) {
                document.f[('img'+clickarray[0])].src = "image0.gif";
            }
            if (user[clickarray[1]] == 0) {
                document.f[('img'+clickarray[1])].src = "image0.gif";
            }
        }
        if (map[clickarray[0]] == map[clickarray[1]]) {
            if (user[clickarray[0]] == 0&&user[clickarray[1]] == 0) { finished++; }
            user[clickarray[0]] = 1;
            user[clickarray[1]] = 1;
        }
        if (finished >= 18) {
            alert('Ты сделал это за '+document.f.b.value+' !');
            init();
        } else {
            oktoclick = true;
        }
    }
}
// function colorChange() {
//function changeColor()
//         {
//             var cell = document.getElementsByTagName("td");
//             for (var i = 0; i < cell.length; i++)
//             {
//                 cell[i].onclick = function (evt)
//                 {
//                     evt.target.style.background = 'red';
//                 }
//             }
//         }
//         window.onload = changeColor;
// }

