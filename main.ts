namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Intro = SpriteKind.create()
    export const Setup = SpriteKind.create()
}
function scene_setup_farmer_next (dir2: number) {
    if (scene_setup_players[0] == 1) {
        scene_setup_farmer_sprite = farmer_p1
    } else {
        scene_setup_farmer_sprite = farmer_p2
    }
    scene_setup_farmer_sprite += dir2
    if (scene_setup_farmer_sprite >= farmers_names.length) {
        scene_setup_farmer_sprite = 0
    } else if (scene_setup_farmer_sprite < 0) {
        scene_setup_farmer_sprite = farmers_names.length - 1
    }
    music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
    if (scene_setup_players[0] == 1) {
        farmer_p1 = scene_setup_farmer_sprite
    } else {
        farmer_p2 = scene_setup_farmer_sprite
    }
    scene_setup_farmer(scene_setup_farmer_sprite)
}
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(2)
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button()
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
    scene.setBackgroundColor(13)
    sprite_setup_title = textsprite.create("P" + ("" + scene_setup_players[0] + ": Choose Your Farmer"))
    if (scene_setup_players[0] == 1) {
        sprite_setup_title.setOutline(1, 14)
    } else {
        sprite_setup_title.setOutline(1, 6)
    }
    sprite_setup_title.setMaxFontHeight(5)
    sprite_setup_title.setPosition(80, 10)
    sprite_setup_title.setKind(SpriteKind.Setup)
    scene_setup_farmer(0)
}
// Sets the setup screen to the farmer ID for player consideration
function scene_setup_farmer (farmer_sprite_id: number) {
    sprites.destroy(sprite_setup_farmer)
    sprites.destroy(sprite_farmer)
    sprite_farmer = sprites.create(farmers_sprites_64[farmer_sprite_id], SpriteKind.Setup)
    sprite_setup_farmer = textsprite.create(" " + farmers_names[farmer_sprite_id])
    sprite_setup_farmer.setKind(SpriteKind.Setup)
    sprite_setup_farmer.setOutline(1, 15)
    sprite_setup_farmer.setIcon(assets.image`sprite_a`)
    sprite_setup_farmer.setPosition(80, 100)
    sprite_setup_left = sprites.create(assets.image`sprite_left`, SpriteKind.Setup)
    sprite_setup_left.setPosition(30, 60)
    sprite_setup_right = sprites.create(assets.image`sprite_right`, SpriteKind.Setup)
    sprite_setup_right.setPosition(130, 60)
}
function scene_intro_button (players: number) {
    players = players
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Intro, effects.spray, 500)
    scene_current = 1
    pause(1000)
    scene_setup_players = [1]
    if (players > 1) {
        scene_setup_players.push(players)
    }
    scene_setup()
}
function scene_game () {
    scene.setBackgroundColor(9)
    game.showLongText("It's apple harvest time in the Valley.  A bumper crop!  The apples are falling off the trees.  Get them before they hit the ground. ", DialogLayout.Full)
    game.showLongText("Your basket can only hold 5 at a time.  Fill the bin when your basket is full.  Watch out for the rotten apples!", DialogLayout.Full)
    player_1 = sprites.create(farmers_sprites_32[farmer_p1], SpriteKind.Player)
    controller.moveSprite(player_1, 100, 0)
    player_1.bottom = 120
    if (players > 1) {
        player_2 = sprites.create(farmers_sprites_32[farmer_p2], SpriteKind.Player)
        controller.player2.moveSprite(player_2, 100, 0)
        mp.setPlayerIndicatorsVisible(true)
        player_2.bottom = 120
        player_2.x = 120
        player_1.x = 40
    }
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1)
    }
})
function scene_setup_button () {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
    sprites.destroyAllSpritesOfKind(SpriteKind.Setup)
    scene_setup_players.shift()
    if (scene_setup_players.length > 0) {
        scene_setup()
    } else {
        scene_current += 1
        scene_game()
    }
}
let player_2: Sprite = null
let player_1: Sprite = null
let sprite_setup_right: Sprite = null
let sprite_setup_left: Sprite = null
let sprite_farmer: Sprite = null
let sprite_setup_farmer: TextSprite = null
let sprite_setup_title: TextSprite = null
let sprite_start_2: TextSprite = null
let sprite_start_1: TextSprite = null
let sprite_apple: Sprite = null
let sprite_title: Sprite = null
let scene_setup_farmer_sprite = 0
let scene_setup_players: number[] = []
let farmers_sprites_32: Image[] = []
let farmers_sprites_64: Image[] = []
let farmers_names: string[] = []
let farmer_p2 = 0
let farmer_p1 = 0
let players = 0
let scene_current = 0
scene_current = 0
players = 0
farmer_p1 = 0
farmer_p2 = 0
farmers_names = [
"Elderkin",
"Sterling",
"Hennigar",
"Bishop"
]
farmers_sprites_64 = [
assets.image`sprite_elderkin_64`,
assets.image`sprite_sterling_64`,
assets.image`sprite_hennigar_64`,
assets.image`sprite_bishop_64`
]
farmers_sprites_32 = [
assets.image`sprite_elderkin_32`,
assets.image`sprite_sterling_32`,
assets.image`sprite_hennigar_32`,
assets.image`sprite_bishop_32`
]
scene_intro()
