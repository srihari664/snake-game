$(document).ready(function() {
    const boardSize = 20;
    const board = $('#game-board');
    let snake = [{ x: 10, y: 10 }];
    let direction = { x: 0, y: 0 };
    let food = { x: 5, y: 5 };
    let score = 0;

    function draw() {
        board.empty();
        snake.forEach(segment => {
            $('<div>').addClass('snake').css({
                left: `${segment.x * boardSize}px`,
                top: `${segment.y * boardSize}px`
            }).appendTo(board);
        });
        $('<div>').addClass('food').css({
            left: `${food.x * boardSize}px`,
            top: `${food.y * boardSize}px`
        }).appendTo(board);
    }

    function update() {
        const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
        snake.unshift(head);

        if (head.x === food.x && head.y === food.y) {
            score++;
            $('#score').text(score);
            placeFood();
        } else {
            snake.pop();
        }

        if (head.x < 0 || head.x >= 20 || head.y < 0 || head.y >= 20 || snakeCollision(head)) {
            alert('Game Over');
            resetGame();
        }
    }

    function snakeCollision(head) {
        return snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y);
    }

    function placeFood() {
        food = {
            x: Math.floor(Math.random() * 20),
            y: Math.floor(Math.random() * 20)
        };
    }

    function resetGame() {
        snake = [{ x: 10, y: 10 }];
        direction = { x: 0, y: 0 };
        score = 0;
        $('#score').text(score);
        placeFood();
    }

    $(document).keydown(function(e) {
        switch (e.which) {
            case 37: direction = { x: -1, y: 0 }; break; // left
            case 38: direction = { x: 0, y: -1 }; break; // up
            case 39: direction = { x: 1, y: 0 }; break; // right
            case 40: direction = { x: 0, y: 1 }; break; // down
        }
    });

    $('#reset-button').click(resetGame);

    setInterval(function() {
        update();
        draw();
    }, 200);
});
