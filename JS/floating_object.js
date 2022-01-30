let myRectangle = document.querySelector(`#rectangle`)
let myFrame = document.querySelector(`#container`)
let mySquares = document.querySelector(`.square`)
let mySquare_1 = document.querySelector(`#square-1`)
let mySquare_2 = document.querySelector(`#square-2`)
let mySquare_3 = document.querySelector(`#square-3`)
let mySquare_4 = document.querySelector(`#square-4`)
let mySquare_5 = document.querySelector(`#square-5`)
let mySquare_6 = document.querySelector(`#square-6`)
let allSquares = [mySquare_1, mySquare_2, mySquare_3, mySquare_4, mySquare_5, mySquare_6]
alert('Please click the BLUE rectangle.')

function pickColor() {
    let colorArray = ["red", "green", "yellow", "orange", "black", "purple", "pink", "aqua", "grey", "brown"]
    return colorArray[Math.floor(Math.random() * colorArray.length)]
}

function pickPos() {
    let myFrameLeft = myFrame.offsetLeft
    let myFrameRight = (myFrame.offsetLeft + myFrame.offsetWidth) - 50
    let posx = (Math.random() * (myFrameRight - myFrameLeft) + myFrameLeft).toFixed();
    return { posx }
}

function makeSquare() {
    let squaresYPosition = parseInt(100) + "px"
    for (let i = 0; i < allSquares.length; i++) {
        let pos = pickPos()
        while (true) {
            let myHeight = Math.floor(Math.random() * (50 - 25) + 25).toFixed();
            let myWidth = Math.floor(Math.random() * (50 - 25) + 25).toFixed();
            if (myHeight === myWidth) {
                allSquares[i].style.position = "absolute"
                allSquares[i].style.display = "inline-block"
                allSquares[i].style.width = myWidth + "px"
                allSquares[i].style.height = myHeight + "px"
                allSquares[i].style.backgroundColor = pickColor()
                allSquares[i].style.left = pos.posx + "px"
                allSquares[i].style.top = squaresYPosition
                break
            }
        }
        squaresYPosition = parseInt(squaresYPosition) + parseInt(100) + "px"
    }
}

function myMove() {
    let squares = makeSquare()
    let id = null;
    let pos = 0;

    clearInterval(id);
    id = setInterval(frame, 5);
    function frame() {
        if (parseInt(myRectangle.style.bottom) == (parseInt(myFrame.offsetHeight)) - 2) {
            clearInterval(id);
        }
        else {
            pos++;
            myRectangle.style.top = pos + "px";
            myRectangle.style.bottom = parseInt(pos) + parseInt(myRectangle.style.height) + "px";
            for (let i = 0; i < allSquares.length; i++) {
                if (parseInt(myRectangle.style.bottom) + "px" == parseInt(allSquares[i].style.top) + "px") {
                    myRectangle.style.height = parseInt(myRectangle.style.height) + parseInt(allSquares[i].style.height) + "px"
                    myRectangle.style.backgroundColor = allSquares[i].style.backgroundColor
                    allSquares[i].style.display = "none"
                }
            }
        }
    }
}

$("#rectangle").one("click", myMove);