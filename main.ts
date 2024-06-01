namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Intro = SpriteKind.create()
    export const Setup = SpriteKind.create()
    export const Apple = SpriteKind.create()
    export const Bin = SpriteKind.create()
    export const Sky = SpriteKind.create()
}
namespace StatusBarKind {
    export const Apples = StatusBarKind.create()
}
function scene_setup_farmer_next (dir2: number, player2: number) {
    if (scene_setup_players[0] == player2) {
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
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Apple, function (sprite, otherSprite) {
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One)) {
        if (player_1_bucket.value == 5) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
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
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        }
    } else {
        if (player_2_bucket.value == 5) {
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
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
            music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
        }
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
        scene_setup_button(2)
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
info.onCountdownEnd(function () {
    scene_current += 1
    scene_game_playing = 0
    sprites.destroyAllSpritesOfKind(SpriteKind.Enemy)
    sprites.destroyAllSpritesOfKind(SpriteKind.Apple)
    sprites.destroyAllSpritesOfKind(SpriteKind.Player)
    sprites.destroyAllSpritesOfKind(SpriteKind.Sky)
    sprites.destroyAllSpritesOfKind(SpriteKind.Bin)
    music.stopAllSounds()
    scene.setBackgroundColor(9)
    scene.setBackgroundImage(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `)
    tiles.setCurrentTilemap(tilemap`level5`)
    story.startCutscene(function () {
        if (players > 1) {
            mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(farmers_sprites_64[farmer_p1], SpriteKind.Player))
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(32, 60)
            mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(farmers_sprites_64[farmer_p2], SpriteKind.Player))
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(128, 60)
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setFlag(SpriteFlag.Ghost, true)
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setFlag(SpriteFlag.Ghost, true)
        } else {
            mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(farmers_sprites_64[farmer_p1], SpriteKind.Player))
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(32, 60)
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setFlag(SpriteFlag.Ghost, true)
        }
        story.printDialog("The apple tally is in!", 80, 90, 50, 150)
        story.setPagePauseLength(1000, 5000)
        if (players > 1) {
            if (info.player1.score() == info.player2.score()) {
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)),
                animation.animationPresets(animation.bobbing),
                5000,
                true
                )
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)),
                animation.animationPresets(animation.bobbing),
                1000,
                true
                )
                story.printDialog("It's a tie with a total of " + convertToText(info.player1.score()) + " apples picked!", 80, 90, 50, 150)
            } else if (info.player1.score() > info.player2.score()) {
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)),
                animation.animationPresets(animation.bobbing),
                1000,
                true
                )
                story.printDialog("Player 1 wins with a total of " + convertToText(info.player1.score()) + " apples picked!", 80, 90, 50, 150)
            } else {
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)),
                animation.animationPresets(animation.bobbing),
                1000,
                true
                )
                story.printDialog("Player 2 wins with a total of " + convertToText(info.player2.score()) + " apples picked!", 80, 90, 50, 150)
            }
            if (info.player1.score() > info.highScore() || info.player2.score() > info.highScore()) {
                story.printDialog("That's a new high score!!!", 80, 90, 50, 150)
            }
        } else {
            animation.runMovementAnimation(
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)),
            animation.animationPresets(animation.bobbing),
            1000,
            true
            )
            story.printDialog("You picked a total of " + convertToText(info.player1.score()) + " apples!", 80, 90, 50, 150)
            if (info.player1.score() > info.highScore()) {
                story.printDialog("That's a new high score!!!", 80, 90, 50, 150)
            }
        }
        game.gameOver(true)
    })
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Bin, function (sprite, otherSprite) {
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One) && sprites.readDataNumber(otherSprite, "player") == 1) {
        if (player_1_bucket.value > 0) {
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score, player_1_bucket.value)
            player_1_bucket.value = 0
            music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
            scene_game_update_bin(otherSprite, mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.One), MultiplayerState.score))
        }
    } else if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.Two) && sprites.readDataNumber(otherSprite, "player") == 2) {
        if (player_2_bucket.value > 0) {
            mp.changePlayerStateBy(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score, player_2_bucket.value)
            player_2_bucket.value = 0
            music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
            scene_game_update_bin(otherSprite, mp.getPlayerState(mp.playerSelector(mp.PlayerNumber.Two), MultiplayerState.score))
        }
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
    scene.setBackgroundImage(assets.image`tree`)
    tiles.setCurrentTilemap(tilemap`level2`)
    story.printDialog("It's apple harvest time in the Valley.  A bumper crop!", 80, 50, 70, 150)
    story.printDialog("The apples are falling off the trees.", 80, 50, 70, 150)
    for (let index = 0; index < 30; index++) {
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Player)
        sprite_apple.setFlag(SpriteFlag.Ghost, true)
        sprite_apple.setFlag(SpriteFlag.AutoDestroy, true)
        sprite_apple.setScale(randint(0.4, 0.7), ScaleAnchor.Middle)
        sprite_apple_x = randint(30, 130)
        sprite_apple.setPosition(sprite_apple_x, randint(0, 15))
        sprite_apple.ay = randint(100, 200)
    }
    story.printDialog("Get them before they hit the ground. ", 80, 50, 70, 150)
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
    story.printDialog("Your basket can only hold 5 at a time.  Fill the bin when your basket is full.", 80, 90, 50, 140)
    sprite_worm = sprites.create(img`
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        . . . . . . . . . . . . . . . . 
        `, SpriteKind.Player)
    sprite_worm.setScale(2, ScaleAnchor.Middle)
    animation.runImageAnimation(
    sprite_worm,
    assets.animation`sprite_worm`,
    100,
    true
    )
    sprite_worm.setPosition(40, 60)
    story.printDialog("Watch out for worms.  They will make you drop your basket.", 80, 90, 50, 140)
    sprites.destroy(sprite_worm)
    scene_game_playing = 1
    music.play(music.createSong(assets.song`game-play`), music.PlaybackMode.InBackground)
    info.startCountdown(60)
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprites.destroy(sprite)
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1, 2)
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
function scene_setup_button (player2: number) {
    if (scene_setup_players[0] == player2) {
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
}
controller.player2.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(-1, 2)
    }
})
controller.player1.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1, 1)
    }
})
controller.player1.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button(1)
    } else if (scene_current == 2) {
        scene_game_jump_player(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(2)
    }
})
controller.player1.onButtonEvent(ControllerButton.Left, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(-1, 1)
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    animation.runMovementAnimation(
    sprite,
    animation.animationPresets(animation.shake),
    500,
    false
    )
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    if (mp.getPlayerBySprite(sprite) == mp.playerSelector(mp.PlayerNumber.One)) {
        if (player_1_bucket.value > 0) {
            player_1_bucket.value = 0
        }
    } else {
        if (player_2_bucket.value > 1) {
            player_2_bucket.value = 0
        }
    }
})
let sprite_sky: Sprite = null
let sprite_sky_type = 0
let player_2_dx = 0
let player_1_dx = 0
let sprite_worm: Sprite = null
let player_2_bin: Sprite = null
let player_1_bin: Sprite = null
let sprite_apple_x = 0
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
game.setGameOverScoringType(game.ScoringType.HighScore)
game.onUpdate(function () {
    if (scene_current == 2) {
        if (scene_game_playing == 1) {
            scene_game_move_players()
        }
    }
})
forever(function () {
    if (scene_current == 2 && scene_game_playing == 1) {
        pause(randint(1200, 2000))
        sprite_sky_type = randint(0, 3)
        if (sprite_sky_type == 0) {
            sprite_sky = sprites.create(assets.image`sprite_cloud`, SpriteKind.Sky)
            sprite_sky.x = 0
            sprite_sky.vx = randint(20, 60)
        } else if (sprite_sky_type == 1) {
            sprite_sky = sprites.create(assets.image`sprite_cloud`, SpriteKind.Sky)
            sprite_sky.x = 160
            sprite_sky.vx = randint(-60, -20)
        } else if (sprite_sky_type == 2) {
            sprite_sky = sprites.create(assets.image`sprite_bird`, SpriteKind.Sky)
            animation.runImageAnimation(
            sprite_sky,
            assets.animation`sprite_sky_bird_right`,
            200,
            true
            )
            sprite_sky.x = 0
            sprite_sky.vx = randint(20, 60)
        } else {
            sprite_sky = sprites.create(assets.image`sprite_bird`, SpriteKind.Sky)
            animation.runImageAnimation(
            sprite_sky,
            assets.animation`sprite_sky_bird_left`,
            200,
            true
            )
            sprite_sky.x = 160
            sprite_sky.vx = randint(-60, -20)
        }
        sprite_sky.setScale(randint(0.5, 1), ScaleAnchor.Middle)
        sprite_sky.y = randint(1, 20)
        sprite_sky.z = randint(1, 3)
        sprite_sky.setFlag(SpriteFlag.AutoDestroy, true)
        sprite_sky.setFlag(SpriteFlag.Ghost, true)
    }
})
forever(function () {
    if (scene_current == 2 && scene_game_playing == 1) {
        pause(randint(800, 1200))
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Apple)
        sprite_apple.setScale(randint(0.25, 0.75), ScaleAnchor.Middle)
        sprite_apple.ay = randint(20, 60)
        sprite_apple.vy = randint(20, 60)
        sprite_apple.y = 0
        sprite_apple.x = randint(20, 140)
    }
})
forever(function () {
    if (scene_current == 2 && scene_game_playing == 1) {
        pause(randint(2000, 5000))
        sprite_worm = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            `, SpriteKind.Enemy)
        animation.runImageAnimation(
        sprite_worm,
        assets.animation`sprite_worm`,
        100,
        true
        )
        sprite_worm.ay = randint(20, 60)
        sprite_worm.vy = randint(20, 60)
        sprite_worm.y = 0
        sprite_worm.x = randint(20, 140)
    }
})
