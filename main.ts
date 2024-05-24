namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Intro = SpriteKind.create()
    export const Setup = SpriteKind.create()
    export const Apple = SpriteKind.create()
    export const Bin = SpriteKind.create()
}
namespace StatusBarKind {
    export const Apples = StatusBarKind.create()
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Apple, function (sprite, otherSprite) {
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One)) {
        if (player_1_bucket.value == 5) {
            otherSprite.setFlag(SpriteFlag.Ghost, true)
            otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            if (otherSprite.x < 60) {
                otherSprite.setVelocity(-500, -50)
            } else {
                otherSprite.setVelocity(500, -50)
            }
        } else {
            sprites.destroy(otherSprite)
            player_1_bucket.value += 1
        }
    } else {
        if (player_2_bucket.value == 5) {
            otherSprite.setFlag(SpriteFlag.Ghost, true)
            otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            if (otherSprite.x < 60) {
                otherSprite.setVelocity(-500, -50)
            } else {
                otherSprite.setVelocity(500, -50)
            }
        } else {
            sprites.destroy(otherSprite)
            player_2_bucket.value += 1
        }
    }
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button()
    } else if (scene_current == 2) {
        scene_game_jump_player(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    }
})
function scene_game_update_bin (bin: Sprite, score: number) {
    if (score < 5) {
        bin.setImage(assets.image`bin_0`)
    } else if (score < 10) {
        bin.setImage(assets.image`bin_1`)
    } else if (score < 15) {
        bin.setImage(assets.image`bin_2`)
    } else if (score < 20) {
        bin.setImage(assets.image`bin_3`)
    } else if (score < 25) {
        bin.setImage(assets.image`bin_4`)
    } else if (score < 30) {
        bin.setImage(assets.image`bin_5`)
    } else {
        bin.setImage(assets.image`bin_6`)
    }
}
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button()
    } else if (scene_current == 2) {
        scene_game_jump_player(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
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
scene.onHitWall(SpriteKind.Apple, function (sprite, location) {
    sprites.destroy(sprite)
})
// Sets the setup screen to the farmer ID for player consideration
function scene_setup_farmer (farmer_sprite_id: number) {
    sprites.destroy(sprite_setup_farmer)
    sprites.destroy(sprite_farmer)
    sprite_farmer = sprites.create(farmers_sprites_64[farmer_sprite_id], SpriteKind.Setup)
    sprite_setup_farmer = textsprite.create(" " + farmers_names[farmer_sprite_id])
    sprite_setup_farmer.setKind(SpriteKind.Setup)
    sprite_setup_farmer.setIcon(assets.image`sprite_a`)
    sprite_setup_farmer.setPosition(80, 100)
    if (scene_setup_players[0] == 1) {
        scene.setBackgroundColor(13)
        sprite_setup_farmer.setOutline(1, 14)
        sprite_setup_left = sprites.create(assets.image`sprite_left_p1`, SpriteKind.Setup)
        sprite_setup_right = sprites.create(assets.image`sprite_right_p1`, SpriteKind.Setup)
    } else {
        scene.setBackgroundColor(9)
        sprite_setup_farmer.setOutline(1, 6)
        sprite_setup_left = sprites.create(assets.image`sprite_left_p2`, SpriteKind.Setup)
        sprite_setup_right = sprites.create(assets.image`sprite_right_p2`, SpriteKind.Setup)
    }
    sprite_setup_left.setPosition(30, 60)
    sprite_setup_right.setPosition(130, 60)
}
function scene_game_jump_player (player2: Sprite) {
    if (player2.vy == 0) {
        player2.vy = -160
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bin, function (sprite, otherSprite) {
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One) && sprites.readDataNumber(otherSprite, "player") == 1) {
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, player_1_bucket.value)
        player_1_bucket.value = 0
        scene_game_update_bin(otherSprite, mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score))
    } else if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.Two) && sprites.readDataNumber(otherSprite, "player") == 2) {
        mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, player_2_bucket.value)
        player_2_bucket.value = 0
        scene_game_update_bin(otherSprite, mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score))
    }
})
function scene_intro_button (players_selected: number) {
    players = players_selected
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
    scene.setBackgroundImage(img`
        ..........................7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777...........................................
        .........................77722222777777777777777777777777777777777777777777777777777777777777777777777777777777722222777........................................
        ........................77772222277777777777777777777777777777777772222277777777777777777777777777777777777777772222277777......................................
        ........................777722222777777777777777777777777777777777722222777777777777777777777777777777777777777722222777777.....................................
        ........................777722222777777777777777777777777777777777722222777777777777777777777777777777777777777722222777777.....................................
        ........................777722222777777777772222277777777777777777722222777777777777777777777777777777777777777722222777777.....................................
        ........................777777777777777777772222277777777777777777722222777777777777777777777777777777777777777777777777777.....................................
        .........................77777777777777777772222277777777777777777777777777777777777777777777777777777777777777777777777777.....................................
        .........................777777777777777777722222e.77777777777777777777777777777777777777777777777777777777777777777777777......................................
        .........................777777777777777777722222eeee77777777777777777777777777777777777777722222777777777777777777777777.......................................
        ...........................77777777777777777eeeeeeeeee777777777777777777777777777777777777772222277777777777777777777777........................................
        ...........................7777777777777....eeeeeeeeeeee777777777eeeeee...77777777777777777722222777777777777777777777..........................................
        ............................777777777777.....eeeeeeeeeee.......eeeeeeee....77777777777777777222227777777777777777777............................................
        ............................777777777777.....eeeeeeeeeeee......eeeeeeeee....777777777777777722222777777777777777777.............................................
        .............................77777777777.....eeeeeeeeeeee......eeeeeeeee....ee77777777777777777777777777777777777...............................................
        .............................7777777777......eeeeeeeeeeee......eeeeeeeee....ee7777777777777eeee77777777777777777................................................
        .............................77777777.........eeeeeeeeeee......eeeeeeeee....eeeeee......eeeeeeeee.7777777777777.................................................
        ..............................................eeeeeeeeeeee.....eeeeeeeee...eeeeeeee....eeeeeeee.................................................................
        .................................................eeeeeeeee......eeeeeeeee..eeeeeeee...eeeeeeeee.................................................................
        ...................................................eeeeeeeeee...eeeeeeeee..eeeeeeee..eeeeeeeee..................................................................
        .....................................................eeeeeeee...eeeeeeeee..eeeeeeee.eeeeeeeee...................................................................
        .....................................................eeeeeeeeeeeeeeeeeeee.eeeeeeeeeeeeeeeeee....................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee....................................................................
        .......................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.....................................................................
        ........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee......................................................................
        ........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.......................................................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee........................................................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeee........................................................................
        .........................................................eeeeeeeeeeeeeffeeeeeeeeeeeeeee.........................................................................
        .........................................................eeeeeeeeeeeeffefeeeeeeeeeeeeee.........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeeee..........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeeee..........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeee...........................................................................
        .........................................................eeeeeeeeeeeefffeeeeeeeeeeeee...........................................................................
        ..........................................................eeeeeeeeeefffffeeeeeeeeeeee...........................................................................
        ..........................................................eeeeeeeeeefffffeeeeeeeeeee............................................................................
        ...........................................................eeeeeeeeefffffeeeeeeeeeee............................................................................
        ...........................................................eeeeeeeeffffffeeeeeeeeee.............................................................................
        ............................................................eeeeeeeffffffeeeeeeeeee.............................................................................
        .............................................................eeeeeefffffeeeeeeeeee..............................................................................
        .............................................................eeeeeefffffeeeeeeeeee..............................................................................
        .............................................................eeeeeefffffeeeeeeeeee..............................................................................
        .............................................................eeeeeeeffffeeeeeeeee...............................................................................
        .............................................................eeeeeeeffffeeeeeeee................................................................................
        .............................................................eeeeeeeffffeeeeeee.................................................................................
        .............................................................eeeeeeeffffeeeeeee.................................................................................
        .............................................................eeeeeeeffffeeeeee..................................................................................
        .............................................................eeeeeeeffffeeeeee..................................................................................
        .............................................................eeeeeeeeeeeeeeeee..................................................................................
        .............................................................eeeeeeeeeeeeeeee...................................................................................
        .............................................................eeeeeeeeeeeeeeee...................................................................................
        .............................................................eeeeeeeeeeeeeeee...................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeeee....................................................................................
        .............................................................eeeeeeeeeeeeee.....................................................................................
        .............................................................eeeeeeeeeeeeee.....................................................................................
        ..............................................................eeeeeeeeeeee......................................................................................
        ..............................................................eeeeeeeeeeee......................................................................................
        ..............................................................eeeeeeeeeee.......................................................................................
        ..............................................................eeeeeeeeeee.......................................................................................
        ..............................................................eeeeeeeeeee.......................................................................................
        .............................................................eeeeeeeeeeee.......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        .............................................................eeeeeeeeeeeee......................................................................................
        ............................................................eeeeeeeeeeeeee......................................................................................
        ............................................................eeeeeeeeeeeeee......................................................................................
        ...........................................................eeeeeeeeeeeeeee......................................................................................
        ...........................................................eeeeeeeeeeeeeee......................................................................................
        ...........................................................eeeeeeeeeeeeeee......................................................................................
        ..........................................................eeeeeeeeeeeeeeee......................................................................................
        ..........................................................eeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeee......................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        ..........................................................eeeeeeeeeeeeeeeee.....................................................................................
        ..........................................................eeeeeeeeeeeeeeeee.....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeeee....................................................................................
        ..........................................................eeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        .........................................................eeeeeeeeeeeeeeeeee.....................................................................................
        ........................................................eeeeeeeeeeeeeeeeeeee....................................................................................
        ........................................................eeeeeeeeeeeeeeeeeeee....................................................................................
        ........................................................eeeeeeeeeeeeeeeeeeee....................................................................................
        .......................................................eeeeeeeeeeeeeeeeeeeeee...................................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeee...................................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeeee..................................................................................
        ......................................................eeeeeeeeeeeeeeeeeeeeeeee..................................................................................
        ....................................................eeeeeeeeeeeeeeeeeeeeeeeeeee.................................................................................
        ..................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeee................................................................................
        ..................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............................................................................
        ................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee............................................................................
        ..............................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee.........................................................................
        ..............................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee......................................................................
        `)
    tiles.setCurrentTilemap(tilemap`level2`)
    game.showLongText("It's apple harvest time in the Valley.  A bumper crop!  The apples are falling off the trees.  Get them before they hit the ground. ", DialogLayout.Full)
    game.showLongText("Your basket can only hold 5 at a time.  Fill the bin when your basket is full.  Watch out for the rotten apples!", DialogLayout.Full)
    mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(farmers_sprites_32[farmer_p1], SpriteKind.Player))
    mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, 0)
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).ay = 400
    mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setFlag(SpriteFlag.StayInScreen, true)
    player_1_bucket = statusbars.create(20, 4, StatusBarKind.Apples)
    player_1_bucket.value = 0
    player_1_bucket.max = 5
    player_1_bucket.setColor(2, 0)
    player_1_bucket.positionDirection(CollisionDirection.Bottom)
    player_1_bucket.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    player_1_bin = sprites.create(assets.image`bin_0`, SpriteKind.Bin)
    sprites.setDataNumber(player_1_bin, "player", 1)
    player_1_bin.setPosition(-5, 100)
    if (players > 1) {
        mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(farmers_sprites_32[farmer_p2], SpriteKind.Player))
        mp.setPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, 0)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).ay = 400
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x = 120
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x = 40
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setFlag(SpriteFlag.StayInScreen, true)
        player_2_bucket = statusbars.create(20, 4, StatusBarKind.Apples)
        player_2_bucket.value = 0
        player_2_bucket.max = 5
        player_2_bucket.setColor(2, 0)
        player_2_bucket.positionDirection(CollisionDirection.Bottom)
        player_2_bucket.attachToSprite(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)))
        player_2_bin = sprites.create(assets.image`bin_0`, SpriteKind.Bin)
        sprites.setDataNumber(player_2_bin, "player", 2)
        player_2_bin.setPosition(scene.screenWidth() + 5, 100)
        if (farmer_p1 == farmer_p2) {
            player_1_bucket.setLabel("P1")
            player_2_bucket.setLabel("P2")
        }
    }
    scene_game_playing = 1
    info.startCountdown(60)
}
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1)
    }
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1)
    }
})
function scene_game_move_players () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy != 0) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x += player_1_dx
    } else {
        player_1_dx = controller.player1.dx()
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x += player_1_dx
    }
    if (players > 1) {
        if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy != 0) {
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x += player_2_dx
        } else {
            player_2_dx = controller.player2.dx()
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x += player_2_dx
        }
    }
}
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
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(-1)
    }
})
let player_2_dx = 0
let player_1_dx = 0
let player_2_bin: Sprite = null
let player_1_bin: Sprite = null
let sprite_setup_right: Sprite = null
let sprite_setup_left: Sprite = null
let sprite_farmer: Sprite = null
let sprite_setup_farmer: TextSprite = null
let sprite_setup_title: TextSprite = null
let sprite_start_2: TextSprite = null
let sprite_start_1: TextSprite = null
let sprite_apple: Sprite = null
let sprite_title: Sprite = null
let player_2_bucket: StatusBarSprite = null
let player_1_bucket: StatusBarSprite = null
let scene_setup_farmer_sprite = 0
let scene_setup_players: number[] = []
let farmers_sprites_32: Image[] = []
let farmers_sprites_64: Image[] = []
let farmers_names: string[] = []
let scene_game_playing = 0
let farmer_p2 = 0
let farmer_p1 = 0
let players = 0
let scene_current = 0
// current scene is used to manage events across different scenes.  
// 0 = intro
// 1 = setup
// 2 = game play
// 3 = outtro
scene_current = 0
// Number of players
players = 0
// sprite ID for P1
farmer_p1 = 0
// Sprite ID for P2
farmer_p2 = 0
scene_game_playing = 0
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
game.onUpdate(function () {
    if (scene_current == 2) {
        if (scene_game_playing == 1) {
            scene_game_move_players()
        }
    }
})
forever(function () {
    if (scene_game_playing == 1) {
        pause(randint(800, 1200))
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Apple)
        sprite_apple.setScale(randint(0.25, 0.75), ScaleAnchor.Middle)
        sprite_apple.ay = randint(20, 60)
        sprite_apple.vy = randint(20, 60)
        sprite_apple.y = 0
        sprite_apple.x = randint(20, 140)
    }
})
