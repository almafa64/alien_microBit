def on_button_pressed_a():
    global Player_posX
    Player_posX += -1
    led.unplot(Player_posX + 1, 4)
input.on_button_pressed(Button.A, on_button_pressed_a)

def on_button_pressed_ab():
    global Bullet_StartX
    Bullet_StartX = Player_posX
    led.plot_brightness(Bullet_StartX, 3, 110)
    for Bullet_Loop_i in range(4):
        if Bullet_Loop_i == 3:
            led.unplot(Bullet_StartX, 0)
        else:
            led.unplot(Bullet_StartX, 2 - Bullet_Loop_i + 1)
            led.plot_brightness(Bullet_StartX, 2 - Bullet_Loop_i, 110)
            basic.pause(50)
input.on_button_pressed(Button.AB, on_button_pressed_ab)

def on_button_pressed_b():
    global Player_posX
    Player_posX += 1
    led.unplot(Player_posX - 1, 4)
input.on_button_pressed(Button.B, on_button_pressed_b)

Bullet_StartX = 0
Player_posX = 0
Player_posX = 2

def on_forever():
    global Player_posX
    if Player_posX > 4:
        Player_posX += -1
    elif Player_posX < 0:
        Player_posX += 1
    led.plot(Player_posX, 4)
basic.forever(on_forever)
