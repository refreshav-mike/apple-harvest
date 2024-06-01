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
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
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
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.UntilDone)
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
    scene.setBackgroundImage(img`
        .................................77777777777777777777777777..77777777777777777...777...7777777777......777...7777777777777777777777777..........................
        ..........................b777...777777777777777777777777777777777777777777777...777..7777777777777...7777...7777777777777777777777777..........................
        ..........................777777777777777777777222222277777777...777777777...77777777772222222222777777..77777777777777777777777777777..........................
        ..........................777777777777777777772225522222777777...7777777.....7777..77772555555222777777...7777777777777777777777777b............................
        ..........................777777777.7777..77772225552222777777...777777......7777..77772555555222777777...77777777777777777777777777............................
        .......................b7777777777777777...2225555552227777777777777777......777777777725555222227777777777777777777777777777777777777..........................
        .......................b7777777777777777...2225555552227777..7777777777......777777777725555222227777777777777777777777777777777777777..........................
        .......................b7777777777777777...2225555522227777..7777777777......777777777725525222227777777777777777777777777777777777777777b......................
        .......................b7777777777777...7772225552222227777..7777777777777...7777777777222222222777777777777777722222277777777777777777777......................
        .......................b7777777777777...7772225222222277777..7777777777777...7777777777222222222777777777777777725522277777777777777777777......................
        .......................b7777777777777...7772222222222777777..77777777777777..7777777777222222222777777777777777725522277777777777777777777......................
        ........................7777777777.7....7772222222222777777..7777777777777777777777777722222277777777777777772225552222227777777777777777b......................
        .............................7777.......7777722222222777777..77777777777777777777777777777777777777777777777722255555233227777777777............................
        .............................b777.......7777722222222777777..77777777777777777777777777777777777777777777777722255555233227777777777............................
        .................................77777777777777722227777777..7777222222222777777777777777777777777777777777775555555522222777777777777..........................
        .................................7777777777777777777777777777777755555222277777777777777..77777777777777777775555555522227777777777777..........................
        .................................7777777777777777777777777777777755552222277777777777777..77777777777777777772555555522227777777777777..........................
        ....................7777......7777777777.77777..777777777777772225555222227777777777777...777777777777777777722222222222277777777777777777......................
        ....................77777777777777..7777.........7777777..77772255555222227777..7777777...777777777777777777772222222222777777777777777777......................
        ....................77777777777777..7777.........7777777..77772255522222227777..7777777...777777777777777777772222222222777777777777777777......................
        ....................77777777777777777777........7777777777777725522222222277777777777777..777777777777777777777222222277777777777777777777......................
        ............................7777777722227777.7777777777777b7.7222222222222777777777777777777777777777777777777777777777777777777777777..........................
        ............................7777772222227777.77777777777777..7222222222222777777777777777777777777777777777777777777777777777777777777..........................
        ...........................77772222222222277777777777777777.772222222222277777777777...77777777777777777777777777777777777777777777777..........................
        ........................77777772225555522277777777777777777..77772227777777777777777......77777722222222227777777777777777777777777777..........................
        ........................77777722555555522277777777777777777..77777777777777777777777......77777725555522227777777777777777777777777777..........................
        ....................7777777777255555555222777777777777777777777777777777777777777777......77777725555522227777777777777777777777777777..........................
        ....................77777777772555555222227777777...7777777..77777777777777777777777...77777777725555522227777777777777777777777777777..........................
        ....................77777777772555555222227777777...7777777...7777777777777777777777...77777777725555522227777777777777777777777777777..........................
        ....................77777777772555555222227777777...7777777....777777777777777777777...77777777725555522227777777777b77777777777777777..........................
        ....................b77777777722222222222277777777777777777777777777777777eee777777777777777777722222222227777777777777777777..7777777..........................
        ..........................777722222222227777777777777777777777777777777777eee777777777777777777772222222227777777777777777777..7777777..........................
        .......................b77777722222222227777777777777777777777777777777777eee7777777777777777777722222222277777777777777777777b7777777..........................
        .......................b77777777722227777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777..........................
        .......................b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b.7777..........................
        .......................b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b.7777..........................
        .......................7777777777777777777777777777777777777777777ee777777eeee77777777777777777777777777777777777777777777777777b.7777..........................
        ..........................777777777777777777777777777777777777777eeeeee777eeee77777777777777777777777777777777777777777777777777b...............................
        ..........................777777777777777777777777777777777777777eeeeeeee7eeee77777777777777777777777777777777777777777777777777................................
        ..........................b777777777777777777777777777777777777777eeeeeeeeeeee77777777777777777777777777777777777777777777777777................................
        .............................b77777777777777777777777777777777777777eeeeee777777777777777777777777777777777777777777777777777...................................
        .............................b77777777777777777777777777777777777777eeeeee777777777777777777777777777777777777777777777777777...................................
        .............................b77777777777777777777777777ee7777777777eeeeeeeeee77777777777777777777777777777777777777777777777777b...............................
        .............................b77777777777777777777777777eeeee7777777eeeeeeeeee777777777777eee77777777777777777777777777777.b7777b...............................
        .............................77777777.....77777777777777eeeee7777777eeeeeeeeee777777777777eee77777777777777777777777777777..7777b...............................
        .............................b7777777.....77777777777777eeeeee777777eeeeeeeeeeee7777777777eee77777777777777777777777777777777777................................
        .............................b7777777.....77777777777777777eeeeeeeeeeeeeeeeeeeeeeeee77eeeeeee7777777777777777..77777777.77777...................................
        .............................b7777777.....77777777777777777eeeeeeeeeeeeeeeeeeeeeeeee77eeeeeee7777777777777777..77777777.77777...................................
        .............................b7777777.....77777777777777777eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee7777777777777777..77777777777777...................................
        ..............................7777777.....77777777777777777777eeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccc777777777777..b7777777777777...................................
        ..........................................77777777777777777777eeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccc777777777777.....77777777......................................
        ..........................................77777777777777777777eeeeeeeeeeeeeeeeeeeeeeeeeeeeccccccc777777777777.....77777777......................................
        ..........................................77777777777777777777777eeeeeeeeeeeeeeeeeeeeeeccccccccccb77777777777.....b7777777......................................
        ..........................................77777777777.b7777777777eeeeeeeeeeeeeeeeeeeeeecccccccccc..7777777777...................................................
        ..........................................77777777777.b7777777777eeeeeeeeeeeeeeeeeeeeeecccccccccc..7777777777...................................................
        ..........................................77777777b77.b777777777777eeeeeeeeeeeeeeeeeecccccccccccc..b777777777...................................................
        .............................................77777........7777777777eeeeeeeeeeeeeeeeccceeecccc..........b7777...................................................
        .............................................77777........7777777777eeeeeeeeeeeeeeeeccceeecccc..........b7777...................................................
        .............................................77777........7777777777eeeeeeeeeeeeeccccccccccccc...........7777...................................................
        .............................................................7777..7eeeeeeeeeeeeeccccccccccccc..................................................................
        .............................................................7777..7eeeeeeeeeeeeeccccccccccccc..................................................................
        .............................................................7777..eeeeeeeeeeeeeeccccccccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeecccccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeecccccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeeccccccccccccf...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeeeeeccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeeeeeccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeeeecccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeecccccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeecccccccccc...............................................................
        .................................................................eeeeeeeeeeeeeeeeeeeeeeeccccccccc...............................................................
        ................................................................eeeeeeeeeeeeeeeeeeeeeecccccccffff...............................................................
        ................................................................eeeeeeeeeeeeeeeeeeeeeecccccccc..................................................................
        ................................................................eeeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................eeeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................eeeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................eeeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................eeeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................ceeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................ceeeeeeeeeeeeeeeeeeecccccccccc..................................................................
        ................................................................fcceeeeeeeeeeeeeeeeecccccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeeccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeeccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeecccccccccc..................................................................
        ...................................................................eeeeeeeeeeeeeeeeecccccccccf..................................................................
        ...................................................................eeeeeeeeeeeeeeeeecccccccccf..................................................................
        ...................................................................eeeeeeeeeeeeeeeeeccccccccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeecccccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeecccccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeeeecccccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeccceeeccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeccceeeccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeccceeeccccccc...............................................................
        ...................................................................eeeeeeeecceeeeeecccceeeccccccc...............................................................
        ...................................................................eeeeeeeccceeeeeecccceeeccccccc...............................................................
        ...................................................................eeeeeeeccceeeeeecccceeeccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeccceeeccccccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeccceeeeeecccc...............................................................
        ...................................................................eeeeeeeeeeeeeeeeeccceeeeeecccc...............................................................
        ................................................................eeeeeeeeeeccceeeeeeeccceeeeeeccccccf..eeeee.....................................................
        ................................................................eeeeeeeeeeccceeeeeeeccceeeeeeccccccf..eeeee.....................................................
        ................................................................eeeeeeeeeeccceeeeeeecccceeeeeccccccccceeeeeeccc.................................................
        ................................................................eeeeeeeeeeccceeeeeeecccccceeeeeeeeeeccccccccccc.................................................
        ................................................................eeeeeeecccccceeeeeeecccccceeeeeeeeecccccccccccc.................................................
        ................................................................eeeeeeecccccceeeeeeecccccceeeeeeeeecccccccccccc.................................................
        .............................................................eeeeeeeeeeccccccccceeeecccccceeeeeeececcccccccccccccc..............................................
        .............................................................eeeeeeeccccccc77cccccccccccccccceeeccccccceeecccccccc..............................................
        .............................................................eeeeeeeccccccc77cccccccccccccccceeeecccccceeecccccccc..............................................
        ..........................................................eeeeeeeeeeccc777cccccccccccccccccccccccccccccccccccccccc..............................................
        ..........................................................eeeeeeeccc777eeecccccc7777cccccceeeccccccc77cccceeeccccc..............................................
        ..........................................................eeeeeeeccc777ee7cccccc7777cccccceeeccccccc77cccceeeccccc..............................................
        ..........................................................eeeeeeeccc77ee77ecc7777777777777eeecccccc777ecceeeecccee..............................................
        ..........................................................4444444444444444444bb444444444444444444bb444444444444444..............................................
        .........................................................444444444444444444444444444444444444444444444444444444444..............................................
        .........................................................444444444444444444444444444444444444444444444444444444444..............................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............................................
        .........................................................eeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee..............................................
        .........................................................ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..............................................
        .........................................................ccccccccccccccccccccccccccccccccccccccccccccccccccccccccc..............................................
        `)
    tiles.setCurrentTilemap(tilemap`level2`)
    story.printDialog("It's apple harvest time in the Valley.  A bumper crop!", 80, 50, 70, 150)
    story.printDialog("The apples are falling off the trees.", 80, 50, 70, 150)
    for (let index = 0; index < 30; index++) {
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Player)
        sprite_apple.setFlag(SpriteFlag.Ghost, true)
        sprite_apple.setFlag(SpriteFlag.AutoDestroy, true)
        sprite_apple.setScale(randint(0.4, 0.7), ScaleAnchor.Middle)
        sprite_apple_x = randint(30, 130)
        sprite_apple.setPosition(sprite_apple_x, 10)
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
    story.printDialog("Your basket can only hold 5 at a time.  Fill the bin when your basket is full.", 90, 90, 50, 130)
    scene_game_playing = 1
    music.play(music.createSong(hex`003c000a64070100001c00010a006400f4016400000400000000000000000000000000050000048106000007000308110136004400010952005900030811056d00740003030801880091000108a300b100022505bf00cd000109da00e1000308110110011e0101092c0133010308110547014e010303080162016b0101087d018b01032427059801a6010109b401bb0103081101ea01f801010905020c020308110520022702030308013c024502010857026502022505720280020225098d02940203081101c402d2020109df02e60203081105fa0201030303080116031d0302030831033f03032427054c035a03010967036e03030811018203900302202490039e030222259e03ac0303242709b903c003050811242705d403db03050308242701ef03f80301080a041804022505260434040225094104480405081120240177048504010993049a0403081105ae04b50403030801c904d2040108e404f2040324270500050e0501091b0522050308110136054405012751055f0501096c0573050308110588058f0503030801a305ac050108be05cc0503252705d905e705022509f405fb05030811012b063906010946064d0604081127055406620601256106680604030824017c0683060203089806a60603242705b306c1060109ce06d50603081101e906f706021d20f7060507021f220507130703202409200727070508112024053b07420705030820240156075f070108720780070225058d079b0703222509a807af07050811202401de07ec070109fa0701080308110515081c08030308013008390801084b085908032427056608740801096d087b08010874088208010c7b088908010f820889080408110e01b808c6080109d308da0803081105ef08f608030308010a09130901082509330902250540094e090225095c096309030811019209a0090109ad09b40903081105c809cf0903030801e409eb09020308ff090d0a032427051a0a280a0109350a3c0a03081101500a5e0a0220245e0a6c0a0222256c0a7a0a03242709870a8e0a050811242705a20aa90a050308242701bd0ac60a0108d90ae70a022505f40a020b0225090f0b160b050811202401460b540b0109610b680b030811057c0b830b03030801970ba00b0108b20bc00b03242705ce0bdc0b0109e90bf00b03081101040c120c01271f0c2d0c01093a0c410c03081105560c5d0c03030801710c7a0c01088c0c9a0c03252705a70cb50c022509c20cc90c03081101f90c070d0109140d1b0d0408112705220d300d01252f0d360d04030824014b0d520d020308660d740d03242705810d8f0d01099c0da30d03081101b80dc60d021d20c50dd30d021f22d30de10d03202409ee0df50d050811202405090e100e050308202401240e2d0e0108400e4e0e0225055b0e690e03222509760e7d0e050811202401ac0eba0e0109c80ecf0e03081105e30eea0e03030801fe0e070f0108190f270f03242705350f430f01093b0f490f0108420f500f010c490f570f010f500f570f0408110e01860f940f0109a20fa90f03081105bd0fc40f03030801d80fe10f0108f30f01100225050e101c100225092a1031100308110160106e1001097b1082100308110596109d1003030801b210b910020308cd10db1003242705e810f610010903110a11030114013a114811010955115c11030814057011771105010d2427018c119311020d25a711b511022505c211d01103252709dd11e41103031601f81106120224271412221201092f123612040a1625054a12511203030f0165126c12010f80128e120225059c12aa120109b712be1203011401ed12fb12010908130f130308140524132b1304010d27013f134613020d245a1368130325250575138313032527099013971303031601c713d5130109e213e913030a1605fd13041403030f011914201402030f341442140225054f145d1401096a14711403011401a114af140109bc14c31403081405d714de1405010d242701f214f914020d250e151c15022505291537150325270944154b15030316015f156d150227247a158815010996159d15040a162505b115b81503030f01cc15d31502030fe715f5150225050216101601091e162516030114015416621601096f167616030814058b16921604010d2401a616ad16020d20c116cf1603252205dc16ea1603252409f716fe16030316012e173c17010949175017030a160564176b1703030f018017871702030f9b17a917022505b617c4170109d117df1701010818161801092318311801053e184c18010175188318010590189e180109ab18b9180101e218f0180109fd180b1901051819261901014e195c1901056a1978190109`), music.PlaybackMode.InBackground)
    info.startCountdown(60)
}
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
let player_2_dx = 0
let player_1_dx = 0
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
