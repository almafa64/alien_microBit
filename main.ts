input.onButtonPressed(Button.A, function () {
    if (game_NOT_over && mainMenuNot) {
        Player_posX += -1
        led.unplot(Player_posX + 1, 4)
    }
})
input.onButtonPressed(Button.AB, function () {
    if (game_NOT_over && mainMenuNot) {
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
    } else if (!(mainMenuNot)) {
        mainMenuNot = true
        basic.clearScreen()
    }
})
input.onButtonPressed(Button.B, function () {
    if (mainMenuNot && game_NOT_over) {
        Player_posX += 1
        led.unplot(Player_posX - 1, 4)
    }
})
let Alien_posX_prev = 0
let bulletContactAlien = false
let Bullet_StartX = 0
let Alien_posY = 0
let mainMenuNot = false
let game_NOT_over = false
let Alien_posX = 0
let Player_posX = 0
Player_posX = 2
Alien_posX = randint(0, 4)
game_NOT_over = true
mainMenuNot = false
Alien_posY = 0
led.plot(Alien_posX, Alien_posY)
let startCharList: string[] = []
let StartMSG = "A+B START"
for (let char_i = 0; char_i <= StartMSG.length; char_i++) {
    startCharList[char_i] = StartMSG.charAt(char_i)
}
basic.forever(function () {
    if (!(mainMenuNot)) {
        for (let value of startCharList) {
            basic.showString("" + (value))
            if (mainMenuNot) {
                break;
            }
        }
    }
})
basic.forever(function () {
    if (game_NOT_over && mainMenuNot) {
        mainMenuNot = true
        if (Player_posX > 4) {
            Player_posX += -1
        } else if (Player_posX < 0) {
            Player_posX += 1
        }
        led.plot(Player_posX, 4)
    }
})
basic.forever(function () {
    if (game_NOT_over && mainMenuNot) {
        for (let Alien_Loop_k = 0; Alien_Loop_k <= 4; Alien_Loop_k++) {
            if (bulletContactAlien) {
                bulletContactAlien = false
                break;
            } else {
                if (Alien_Loop_k != 4) {
                    led.plot(Alien_posX, Alien_Loop_k)
                    led.unplot(Alien_posX, Alien_Loop_k - 1)
                    basic.pause(randint(300, 700))
                } else {
                    led.unplot(Player_posX, 4)
                    game_NOT_over = false
                    game.gameOver()
                }
            }
        }
    }
})
