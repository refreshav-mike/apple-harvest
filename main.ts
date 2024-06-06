namespace SpriteKind {
    export const Wall = SpriteKind.create()
    export const Intro = SpriteKind.create()
    export const Setup = SpriteKind.create()
    export const Apple = SpriteKind.create()
    export const Bin = SpriteKind.create()
    export const Sky = SpriteKind.create()
    export const Coffee = SpriteKind.create()
    export const Clock = SpriteKind.create()
    export const Lightning = SpriteKind.create()
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Lightning, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.fire, 500)
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
    pause(randint(80, 100))
    for (let index = 0; index < randint(20, 60); index++) {
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Apple)
        sprite_apple.setScale(randint(0.25, 0.75), ScaleAnchor.Middle)
        sprite_apple.ay = randint(30, 70)
        sprite_apple.vy = randint(30, 70)
        sprite_apple.y = 0
        sprite_apple.x = sprite.x
        pause(randint(80, 100))
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.Clock, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.smiles, 500)
    music.stopAllSounds()
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.UntilDone)
    info.changeCountdownBy(10)
    scene_game_music()
})
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
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (scene_current == 2) {
        scene_game_cancel_text()
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.Coffee, function (sprite, otherSprite) {
    sprites.destroy(otherSprite, effects.smiles, 500)
    music.stopAllSounds()
    music.play(music.createSong(hex`003c000a64020100001c00010a006400f401640000040000000000000000000000000005000004580400000b000803161307001e25030b00160001131600210004130b1e2520002b0001132b003600090a0705131e251e250a36004100011340005500030b131b4b005600050f131e250f56006b000307001361006c0003131e256b008000020b137600810003131b1b81008c00070a1307051e250a8c00970003131b1b9600a10004130b1e25a100ac000113ac00b70007010700131d2401b600c1000113c100cc0004130b1d24cc00d7000113d600e10009080705131d241d2408e100ec000113ec00f70003130b19f7000201050d131d240d01010601030007130c01170103131d2417012201020b1322012d01031319192c01370107080513071d2408370142010313191942014d01040b131d244c01570101135701620107031307001e250362016d0101136d01780104130b1e2577018201011382018d01090a0705131e251e250a8d01980101139801ad01030b131ba201ad01050f131e250fad01c20103070013b801c30103131e25c201d701020b13cd01d80103131b1bd801e301070a1307051e250ae301ee0103131b1bed01f80104130b1e25f8010302011303020e0207010700131d24010e02190201131802230204130b1d2423022e0201132e02390209080705131d241d240838024302011343024e0203130b194e025902050d131d240d59025e020300071363026e0203131d246e027902020b13790284020313191984028f0207080513071d24088e029902031319199902a402040b131d24a402af02020313ae02ae020803161307001e2503b902c4020113c402cf0204130b1e25cf02da020113d902e402090a0705131e251e250ae402ef020113ef020403030b131bfa020503050f131e250f04031903030700130f031a0303131e251a032f03020b1324032f0303131b1b2f033a03070a1307051e250a3a03450303131b1b4503500304130b1e254f035a0301135a03650307010700131d240165037003011370037b0304130b1d247a03850301138503900309080705131d241d240890039b0301139a03a50303130b19a503b003050d131d240db003b50303000713bb03c60303131d24c503d003020b13d003db0303131919db03e60307080513071d2408e603f10303131919f003fb03040b131d24fb03060401130604110407031307001e250310041b0401131b04260404130b1e2526043104011330043b04090a0705131e251e250a3b044604011346045b04030b131b51045c04050f131e250f5b047004030700136604710403131e2571048604020b137c04870403131b1b86049104070a1307051e250a91049c0403131b1b9c04a70404130b1e25a604b1040113b104bc0407010700131d2401bc04c7040113c704d20404130b1d24d104dc040113dc04e70409080705131d241d2408e704f2040113f204fd0403130b19fc040705050d131d240d07050c050300071312051d0503131d241c052705020b13270532050313191932053d0507080513071d24083d0548050313191947055205040b131d2452055d050203135d050806070116171d192201`), music.PlaybackMode.InBackground)
    if (mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number) == 1) {
        player_1_dx_multiplier = 2
    } else {
        player_2_dx_multiplier = 2
    }
    pause(10000)
    scene_game_music()
    if (mp.getPlayerProperty(mp.getPlayerBySprite(sprite), mp.PlayerProperty.Number) == 1) {
        player_1_dx_multiplier = 1
    } else {
        player_2_dx_multiplier = 1
    }
})
controller.player2.onButtonEvent(ControllerButton.A, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(1)
    } else if (scene_current == 1) {
        scene_setup_button(2)
    } else if (scene_current == 2) {
        scene_game_cancel_text()
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
    if (scene_game_playing == 1) {
        if (player2.vy == 0) {
            player2.vy = -160
        }
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
    sprites.destroyAllSpritesOfKind(SpriteKind.Coffee)
    sprites.destroyAllSpritesOfKind(SpriteKind.Clock)
    sprites.destroyAllSpritesOfKind(SpriteKind.Lightning)
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
    effects.confetti.startScreenEffect()
    story.startCutscene(function () {
        if (players > 1) {
            player_1_name = textsprite.create(farmers_names[farmer_p1], 0, 14)
            player_1_name.setPosition(32, 20)
            player_1_locator = textsprite.create("Player 1", 0, 14)
            player_1_locator.setPosition(32, 100)
            mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.One), sprites.create(farmers_sprites_64[farmer_p1], SpriteKind.Player))
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setPosition(32, 60)
            player_2_name = textsprite.create(farmers_names[farmer_p2], 0, 6)
            player_2_name.setPosition(128, 20)
            player_2_locator = textsprite.create("Player 2", 0, 6)
            player_2_locator.setPosition(128, 100)
            mp.setPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two), sprites.create(farmers_sprites_64[farmer_p2], SpriteKind.Player))
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setPosition(128, 60)
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).setFlag(SpriteFlag.Ghost, true)
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).setFlag(SpriteFlag.Ghost, true)
        } else {
            player_1_name = textsprite.create(farmers_names[farmer_p1], 0, 14)
            player_1_name.setPosition(32, 20)
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
                500,
                true
                )
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)),
                animation.animationPresets(animation.bobbing),
                1000,
                true
                )
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).startEffect(effects.smiles)
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).startEffect(effects.smiles)
                story.printDialog("It's a tie with a total of " + convertToText(info.player1.score()) + " apples picked!", 80, 90, 50, 150)
            } else if (info.player1.score() > info.player2.score()) {
                story.printDialog("" + convertToText(info.player2.score()) + " apples picked Player 2.  Good attempt.", 80, 90, 50, 150)
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)),
                animation.animationPresets(animation.bobbing),
                500,
                true
                )
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).startEffect(effects.smiles)
                story.printDialog("Player 1 wins with a total of " + convertToText(info.player1.score()) + " apples picked!", 80, 90, 50, 150)
            } else {
                story.printDialog("" + convertToText(info.player1.score()) + " apples picked Player 1.  Good attempt.", 80, 90, 50, 150)
                animation.runMovementAnimation(
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)),
                animation.animationPresets(animation.bobbing),
                500,
                true
                )
                mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).startEffect(effects.smiles)
                story.printDialog("Player 2 wins with a total of " + convertToText(info.player2.score()) + " apples picked!", 80, 90, 50, 150)
            }
            if (info.player1.score() > info.highScore() || info.player2.score() > info.highScore()) {
                music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
                story.printDialog("That's a new high score!!!", 80, 90, 50, 150)
            }
        } else {
            animation.runMovementAnimation(
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)),
            animation.animationPresets(animation.bobbing),
            500,
            true
            )
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).startEffect(effects.smiles)
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
    player_1_dx_multiplier = 1
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
        player_2_dx_multiplier = 1
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
    sprite_powerups = sprites.create(assets.image`coffee`, SpriteKind.Player)
    animation.runImageAnimation(
    sprite_powerups,
    assets.animation`powerups`,
    500,
    true
    )
    sprite_powerups.setScale(2, ScaleAnchor.Middle)
    sprite_powerups.setPosition(40, 50)
    story.printDialog("Keep an eye out for power ups", 80, 90, 50, 140)
    sprites.destroy(sprite_powerups)
    scene_game_playing = 1
    info.startCountdown(60)
    scene_game_music()
}
scene.onHitWall(SpriteKind.Enemy, function (sprite, location) {
    sprites.destroy(sprite)
})
controller.player2.onButtonEvent(ControllerButton.Right, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 1) {
        scene_setup_farmer_next(1, 2)
    }
})
function scene_game_music () {
    if (scene_current == 2 && scene_game_playing == 1) {
        music.stopAllSounds()
        music.play(music.createSong(assets.song`game-play`), music.PlaybackMode.InBackground)
    }
}
function scene_game_move_players () {
    if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).vy != 0) {
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x += player_1_dx
    } else {
        player_1_dx = controller.player1.dx(100 * player_1_dx_multiplier)
        mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)).x += player_1_dx
    }
    if (players > 1) {
        if (mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).vy != 0) {
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x += player_2_dx
        } else {
            player_2_dx = controller.player2.dx(100 * player_2_dx_multiplier)
            mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.Two)).x += player_2_dx
        }
    }
}
scene.onHitWall(SpriteKind.Clock, function (sprite, location) {
    sprites.destroy(sprite)
})
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
        scene_game_cancel_text()
        scene_game_jump_player(mp.getPlayerSprite(mp.playerSelector(mp.PlayerNumber.One)))
    }
})
controller.player1.onButtonEvent(ControllerButton.B, ControllerButtonEvent.Pressed, function () {
    if (scene_current == 0) {
        scene_intro_button(2)
    }
})
scene.onHitWall(SpriteKind.Coffee, function (sprite, location) {
    sprites.destroy(sprite)
})
function scene_game_cancel_text () {
    if (scene_game_playing == 0) {
        story.clearAllText()
        story.cancelAllCutscenes()
    }
}
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
scene.onHitWall(SpriteKind.Lightning, function (sprite, location) {
    sprites.destroy(sprite)
})
let sprite_clock: Sprite = null
let sprite_lightning: Sprite = null
let sprite_coffee: Sprite = null
let sprite_sky: Sprite = null
let sprite_sky_type = 0
let player_2_dx = 0
let player_1_dx = 0
let sprite_powerups: Sprite = null
let sprite_worm: Sprite = null
let player_2_bin: Sprite = null
let player_1_bin: Sprite = null
let sprite_apple_x = 0
let player_2_locator: TextSprite = null
let player_2_name: TextSprite = null
let player_1_locator: TextSprite = null
let player_1_name: TextSprite = null
let sprite_setup_right: Sprite = null
let sprite_setup_left: Sprite = null
let sprite_farmer: Sprite = null
let sprite_setup_farmer: TextSprite = null
let sprite_setup_title: TextSprite = null
let sprite_start_2: TextSprite = null
let sprite_start_1: TextSprite = null
let sprite_title: Sprite = null
let player_2_dx_multiplier = 0
let player_1_dx_multiplier = 0
let player_2_bucket: StatusBarSprite = null
let player_1_bucket: StatusBarSprite = null
let sprite_apple: Sprite = null
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
        sprite_apple = sprites.create(assets.image`sprite_apple`, SpriteKind.Apple)
        sprite_apple.setScale(randint(0.25, 0.75), ScaleAnchor.Middle)
        sprite_apple.ay = randint(20, 60)
        sprite_apple.vy = randint(20, 60)
        sprite_apple.y = 0
        sprite_apple.x = randint(20, 140)
    }
    if (info.countdown() >= 30) {
        pause(randint(800, 1200))
    } else if (info.countdown() >= 20) {
        pause(randint(600, 800))
    } else {
        pause(randint(500, 600))
    }
})
forever(function () {
    if (scene_current == 2 && scene_game_playing == 1) {
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
    pause(randint(2000, 5000))
})
forever(function () {
    if (scene_current == 2 && scene_game_playing == 1) {
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
    pause(randint(1200, 2000))
})
forever(function () {
    pauseUntil(() => scene_current == 2 && scene_game_playing == 1)
    pause(randint(10000, 20000))
    if (scene_current == 2 && scene_game_playing == 1) {
        sprite_coffee = sprites.create(assets.image`coffee`, SpriteKind.Coffee)
        sprite_coffee.ay = randint(20, 60)
        sprite_coffee.vy = randint(20, 60)
        sprite_coffee.y = 0
        sprite_coffee.x = randint(20, 140)
    }
})
forever(function () {
    pauseUntil(() => scene_current == 2 && scene_game_playing == 1)
    pause(randint(20000, 30000))
    if (scene_current == 2 && scene_game_playing == 1) {
        sprite_lightning = sprites.create(assets.image`lightning`, SpriteKind.Lightning)
        sprite_lightning.ay = randint(20, 60)
        sprite_lightning.vy = randint(20, 60)
        sprite_lightning.y = 0
        sprite_lightning.x = randint(20, 140)
    }
})
forever(function () {
    pauseUntil(() => scene_current == 2 && scene_game_playing == 1)
    pause(randint(30000, 60000))
    if (scene_current == 2 && scene_game_playing == 1) {
        sprite_clock = sprites.create(assets.image`clock`, SpriteKind.Clock)
        sprite_clock.ay = randint(20, 60)
        sprite_clock.vy = randint(20, 60)
        sprite_clock.y = 0
        sprite_clock.x = randint(20, 140)
    }
})
