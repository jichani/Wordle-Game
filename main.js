let height = 6; // 질문 개수
let width = 5; // 단어의 길이

// 현재 추측 위치
let row = 0; // 현재 시도
let col = 0; // 현재 시도에 대한 글자

let gameOver = false;
let word = "SQUID";

// 윈도우가 로드 될 때마다 함수를 실행시킨다.
window.onload = function () {
    intialize();
}

function intialize() {
    //  게임 보드 생성
    for (let r = 0; r < height; r++) {
        for (let c = 0; c < width; c++) {
            let tile = document.createElement("span");
            tile.id = r.toString() + "-" + c.toString();
            // "0-0" ~ "5-4" 까지 좌표 값이 각 스팬들의 id 가 된다.
            tile.classList.add("tile");
            tile.innerText = "";
            document.getElementById("board").appendChild(tile);

        }
    }

    // 키를 누를 때 마다
    document.addEventListener("keyup", (e) => {
        if (gameOver) return;

        // 무슨 키를 눌렀는지 알려주는 코드
        // alert(e.code);

        // 아스키코드를 비쿄하기 때문에 올바른 알파벳을 입력하지 않는다면 false 가 나온다.
        if ("KeyA" <= e.code && e.code <= "keyZ") {
            if (col < width) {
                let currTile = document.getElementById(row.toString() + "-" + col.toString());
                if (currTile.innerHTML == "") {
                    currTile.innerText = e.code[3]
                    col++;
                }
            }
        }
        else if (e.code == "Backspace") {
            if (0 < col && col <= width) {
                col--;
            }
            let currTile = document.getElementById(row.toString() + "-" + col.toString());
            currTile.innerText = "";
        }

        else if (e.code == "Enter") {
            update();
            row++; // 새로운 시도로 이동
            col = 0; // 새로운 시도에 대한 글자는 0부터
        }

        if (!gameOver && row == height) {
            gameOver = true;
            document.getElementById("answer").innerText = word;
        }

    })
}

function update() {
    let correct = 0;
    for (let c = 0; c < width; c++) {
        let currTile = document.getElementById(row.toString() + "-" + c.toString());
        let letter = currTile.innerText;

        // 정답이라면 ?
        if (word[c] == letter) {
            currTile.classList.add("correct");
            correct++;
        } // 다른 곳에 있다면 ?
        else if (word.includes(letter)) {
            currTile.classList.add("present");
        } // 없다면 ?
        else {
            currTile.classList.add("absent");
        }

        if (correct == width) {
            gameOver = true;
        }
    }
}