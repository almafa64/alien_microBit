input.onButtonPressed(Button.A, function () {
    if (game_NOT_over) {
        Player_posX += -1
        led.unplot(Player_posX + 1, 4)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (game_NOT_over) {
        Bullet_StartX = Player_posX
        for (let Bullet_Loop_i = 0; Bullet_Loop_i <= 4; Bullet_Loop_i++) {
            bulletContactAlien = Bullet_StartX == Alien_posX && 4 - Bullet_Loop_i == Alien_posY
            if (bulletContactAlien) {
                led.unplot(Alien_posX, Alien_posY)
                Alien_posX_prev = Alien_posX
                while (Alien_posX == Alien_posX_prev) {
                    Alien_posX_prev = Alien_posX
                    Alien_posX = randint(0, 4)
                }
                game.addScore(1)
                break;
            } else {
                led.unplot(Bullet_StartX, 3 - Bullet_Loop_i + 1)
                led.plotBrightness(Bullet_StartX, 3 - Bullet_Loop_i, 110)
                basic.pause(50)
            }
        }
    }
})
input.onButtonPressed(Button.B, function () {
    if (game_NOT_over) {
        Player_posX += 1
        led.unplot(Player_posX - 1, 4)
    }
})
let Alien_posX_prev = 0
let bulletContactAlien = false
let Bullet_StartX = 0
let Alien_posY = 0
let game_NOT_over = false
let Alien_posX = 0
let Player_posX = 0
Player_posX = 2
Alien_posX = randint(0, 4)
game_NOT_over = true
Alien_posY = 0
led.plot(Alien_posX, Alien_posY)
basic.forever(function () {
    if (game_NOT_over) {
        if (Player_posX > 4) {
            Player_posX += -1
        } else if (Player_posX < 0) {
            Player_posX += 1
        }
        led.plot(Player_posX, 4)
    }
})
basic.forever(function () {
    if (game_NOT_over) {
        for (let Alien_Loop_k = 0; Alien_Loop_k <= 4; Alien_Loop_k++) {
            if (bulletContactAlien) {
                bulletContactAlien = false
                break;
            } else {
                if (Alien_Loop_k != 4) {
                    led.plot(Alien_posX, Alien_Loop_k)
                    led.unplot(Alien_posX, Alien_Loop_k - 1)
                    basic.pause(500)
                } else {
                    led.unplot(Player_posX, 4)
                    game_NOT_over = false
                    game.gameOver()
                }
            }
        }
    }
})
