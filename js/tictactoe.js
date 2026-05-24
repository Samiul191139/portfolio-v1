(function () {
    var toggleBtn = document.getElementById('game-toggle');
    var panel = document.getElementById('game-panel');
    var boardEl = document.getElementById('ttt-board');
    var statusEl = document.getElementById('ttt-status');
    var resetBtn = document.getElementById('ttt-reset');

    if (!toggleBtn || !panel || !boardEl) {
        return;
    }

    var board = ['', '', '', '', '', '', '', '', ''];
    var active = false;
    var paused = true;
    var currentPlayer = 'X';
    var gameOver = false;

    function render() {
        boardEl.querySelectorAll('.ttt-cell').forEach(function (cell, i) {
            cell.textContent = board[i];
            cell.disabled = !active || paused || gameOver || board[i] !== '';
            cell.classList.toggle('ttt-x', board[i] === 'X');
            cell.classList.toggle('ttt-o', board[i] === 'O');
        });
    }

    function checkWinner() {
        var wins = [
            [0, 1, 2], [3, 4, 5], [6, 7, 8],
            [0, 3, 6], [1, 4, 7], [2, 5, 8],
            [0, 4, 8], [2, 4, 6]
        ];
        for (var w = 0; w < wins.length; w++) {
            var a = wins[w][0];
            var b = wins[w][1];
            var c = wins[w][2];
            if (board[a] && board[a] === board[b] && board[a] === board[c]) {
                return board[a];
            }
        }
        if (board.every(function (c) { return c !== ''; })) {
            return 'draw';
        }
        return null;
    }

    function setStatus(msg) {
        if (statusEl) {
            statusEl.textContent = msg;
        }
    }

    function resetGame() {
        board = ['', '', '', '', '', '', '', '', ''];
        currentPlayer = 'X';
        gameOver = false;
        if (active && !paused) {
            setStatus("Player X's turn");
        } else if (paused) {
            setStatus('Game paused — expand to play');
        } else {
            setStatus('Press the button above to start');
        }
        render();
    }

    function handleMove(index) {
        if (!active || paused || gameOver || board[index]) {
            return;
        }
        board[index] = currentPlayer;
        var result = checkWinner();
        if (result === 'X' || result === 'O') {
            gameOver = true;
            setStatus('Player ' + result + ' wins!');
        } else if (result === 'draw') {
            gameOver = true;
            setStatus("It's a draw!");
        } else {
            currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
            setStatus("Player " + currentPlayer + "'s turn");
        }
        render();
    }

    boardEl.querySelectorAll('.ttt-cell').forEach(function (cell) {
        cell.addEventListener('click', function () {
            handleMove(parseInt(cell.dataset.index, 10));
        });
    });

    if (resetBtn) {
        resetBtn.addEventListener('click', resetGame);
    }

    toggleBtn.addEventListener('click', function () {
        var expanded = panel.classList.toggle('expanded');
        panel.hidden = !expanded;
        toggleBtn.setAttribute('aria-expanded', expanded ? 'true' : 'false');
        toggleBtn.innerHTML = expanded
            ? '<i class="fas fa-gamepad"></i> Hide Tic-Tac-Toe'
            : '<i class="fas fa-gamepad"></i> Play Tic-Tac-Toe';

        if (expanded) {
            active = true;
            paused = false;
            if (gameOver || board.every(function (c) { return c === ''; })) {
                resetGame();
            } else {
                setStatus("Player " + currentPlayer + "'s turn");
                render();
            }
        } else {
            paused = true;
            setStatus('Game paused — expand to play');
            render();
        }
    });

    resetGame();
})();
