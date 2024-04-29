@namespace
class SpriteKind:
    Wall = SpriteKind.create()
    Intro = SpriteKind.create()

def on_b_pressed():
    if scene_current == 0:
        scene_intro_button(2)
controller.B.on_event(ControllerButtonEvent.PRESSED, on_b_pressed)

def on_a_pressed():
    if scene_current == 0:
        scene_intro_button(1)
controller.A.on_event(ControllerButtonEvent.PRESSED, on_a_pressed)

def scene_intro():
    global sprite_title, sprite_apple, sprite_start_1, sprite_start_2
    sprite_title = sprites.create(assets.image("""
        sprite_title
    """), SpriteKind.Intro)
    sprite_title.set_position(80, 40)
    animation.run_image_animation(sprite_title,
        assets.animation("""
            sprite_animation_title
        """),
        200,
        True)
    music.play(music.string_playable("C5 A B G A F G E ", 400),
        music.PlaybackMode.IN_BACKGROUND)
    for index in range(40):
        sprite_apple = sprites.create(assets.image("""
            sprite_apple
        """), SpriteKind.Intro)
        sprite_apple.set_position(randint(1, 159), -20)
        sprite_apple.vy = randint(60, 120)
        sprite_apple.ay = randint(60, 120)
    sprite_start_1 = textsprite.create(" 1P Start")
    sprite_start_1.set_kind(SpriteKind.Intro)
    sprite_start_1.set_icon(assets.image("""
        sprite_a
    """))
    sprite_start_1.set_outline(1, 2)
    sprite_start_1.set_position(80, 90)
    sprite_start_2 = textsprite.create(" 2P Start")
    sprite_start_2.set_kind(SpriteKind.Intro)
    sprite_start_2.set_icon(assets.image("""
        sprite_b
    """))
    sprite_start_2.set_outline(1, 2)
    sprite_start_2.set_position(80, 110)

def on_left_pressed():
    global farmer_p1
    if scene_current == 1:
        farmer_p1 += -1
        if farmer_p1 < len(farmers_names):
            farmer_p1 = len(farmers_names) - 1
        music.play(music.melody_playable(music.jump_down),
            music.PlaybackMode.IN_BACKGROUND)
        scene_setup_farmer(farmer_p1)
controller.left.on_event(ControllerButtonEvent.PRESSED, on_left_pressed)

def scene_setup():
    global sprite_setup_title
    scene.set_background_color(1)
    sprite_setup_title = textsprite.create("P1: Choose Your Farmer", 0, 9)
    sprite_setup_title.set_outline(1, 8)
    sprite_setup_title.set_max_font_height(5)
    sprite_setup_title.set_position(80, 10)
    scene_setup_farmer(farmer_p1)
def scene_setup_farmer(farmer_id: number):
    global sprite_farmer, sprite_setup_farmer
    sprite_farmer = sprites.create(farmers_sprites_64[farmer_id], SpriteKind.player)
    sprites.destroy(sprite_setup_farmer)
    sprite_setup_farmer = textsprite.create(farmers_names[farmer_id], 1, 13)
    sprite_setup_farmer.set_outline(1, 14)
    sprite_setup_farmer.set_position(80, 100)
def scene_intro_button(players: number):
    global scene_current
    players = players
    music.play(music.melody_playable(music.power_up),
        music.PlaybackMode.IN_BACKGROUND)
    sprites.destroy_all_sprites_of_kind(SpriteKind.Intro, effects.spray, 500)
    scene_current = 1
    scene_setup()

def on_right_pressed():
    global farmer_p1
    if scene_current == 1:
        farmer_p1 += 1
        if farmer_p1 >= len(farmers_names):
            farmer_p1 = 0
        music.play(music.melody_playable(music.jump_down),
            music.PlaybackMode.IN_BACKGROUND)
        scene_setup_farmer(farmer_p1)
controller.right.on_event(ControllerButtonEvent.PRESSED, on_right_pressed)

sprite_setup_farmer: TextSprite = None
sprite_farmer: Sprite = None
sprite_setup_title: TextSprite = None
sprite_start_2: TextSprite = None
sprite_start_1: TextSprite = None
sprite_apple: Sprite = None
sprite_title: Sprite = None
farmers_sprites_64: List[Image] = []
farmers_names: List[str] = []
farmer_p1 = 0
players2 = 0
scene_current = 0
scene_current = 1
players2 = 1
farmer_p1 = 0
farmers_names = ["Elderkin", "Sterling", "Hennigar", "Bishop"]
farmers_sprites_64 = [assets.image("""
        sprite_elderkin_64
    """),
    assets.image("""
        sprite_elderkin_64
    """),
    assets.image("""
        sprite_elderkin_64
    """),
    assets.image("""
        sprite_elderkin_64
    """)]
scene_setup()