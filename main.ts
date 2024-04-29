namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Intro = SpriteKind.create()
}
function scene_setup_farmer_next (dir: number) {
    farmer_p1 += dir
    if (farmer_p1 >= farmers_names.length) {
        farmer_p1 = 0
    } else if (farmer_p1 < 0) {
        farmer_p1 = farmers_names.length - 1
    }
    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
    scene_setup_farmer(farmer_p1)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(2)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    }
})
function scene_intro () {
    sprite_title = sprites.create(assets.image`sprite_title`, SpriteKind.Intro)
    sprite_title.setPosition(80, 40)
    animation.runImageAnimation(
    sprite_title,
    assets.animation`sprite_animation_title`,
    200,
    true
    )
    music.play(music.stringPlayable("C5 A B G A F G E ", 400), music.PlaybackMode.InBackground)
    for (let index = 0; index < 40; index++) {
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Intro)
        sprite_apple.setPosition(randint(1, 159), -20)
        sprite_apple.vy = randint(60, 120)
        sprite_apple.ay = randint(60, 120)
    }
    sprite_start_1 = textsprite.create(" 1P Start")
    sprite_start_1.setKind(SpriteKind.Intro)
    sprite_start_1.setIcon(assets.image`sprite_a`)
    sprite_start_1.setOutline(1, 2)
    sprite_start_1.setPosition(80, 90)
    sprite_start_2 = textsprite.create(" 2P Start")
    sprite_start_2.setKind(SpriteKind.Intro)
    sprite_start_2.setIcon(assets.image`sprite_b`)
    sprite_start_2.setOutline(1, 2)
    sprite_start_2.setPosition(80, 110)
}
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(-1)
    }
})
function scene_setup () {
    scene.setBackgroundColor(1)
    sprite_setup_title = textsprite.create("P1: Choose Your Farmer", 0, 9)
    sprite_setup_title.setOutline(1, 8)
    sprite_setup_title.setMaxFontHeight(5)
    sprite_setup_title.setPosition(80, 10)
    scene_setup_farmer(farmer_p1)
}
function scene_setup_farmer (farmer_id: number) {
    sprite_farmer = sprites.create(farmers_sprites_64[farmer_id], SpriteKind.Player)
    sprites.destroy(sprite_setup_farmer)
    sprite_setup_farmer = textsprite.create(farmers_names[farmer_id], 1, 13)
    sprite_setup_farmer.setOutline(1, 14)
    sprite_setup_farmer.setPosition(80, 100)
}
function scene_intro_button (players: number) {
    players = players
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Intro, effects.spray, 500)
    scene_current = 1
    pause(1000)
    scene_setup()
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1)
    }
})
let players = 0
let sprite_setup_farmer: TextSprite = null
let sprite_farmer: Sprite = null
let sprite_setup_title: TextSprite = null
let sprite_start_2: TextSprite = null
let sprite_start_1: TextSprite = null
let sprite_apple: Sprite = null
let sprite_title: Sprite = null
let farmers_sprites_64: Image[] = []
let farmers_names: string[] = []
let farmer_p1 = 0
let scene_current = 0
scene_current = 0
let players2 = 1
farmer_p1 = 0
farmers_names = [
"Elderkin",
"Sterling",
"Hennigar",
"Bishop"
]
farmers_sprites_64 = [
assets.image`sprite_elderkin_64`,
assets.image`sprite_elderkin_64`,
assets.image`sprite_elderkin_64`,
assets.image`sprite_elderkin_64`
]
scene_intro()
