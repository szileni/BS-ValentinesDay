# BScript Development
[![bs-valentinesday](https://i.imgur.com/S3y2pwv.gif)](https://i.imgur.com/0EdvY3P.gif)
## BS-ValentinesDay

We wish everyone a happy and loving Valentine's Day! On this special 14th of February, it is very easy to create the content of your dreams with the script we have prepared to send an emotional message to your loved ones. You can send a special message to your loved one in the form of a meaningful letter or an elegant rose, or even spend pleasant moments together by playing a fun love game.

This game is full of questions that will strengthen your relationship and help you get to know each other better! For example, with questions such as 'Do you remember the first time we met?' you can revive your memories and deepen your bond. Our aim is to give you and your loved ones an unforgettable and special Valentine's Day.

Every message you send will be too special to throw away and will stay with you as a keepsake. We also wish you the best of luck as you spin the wheel of love! With this wonderful script you can express your feelings for your sweetheart in the most beautiful way and create unforgettable moments.

**You deserve the best and we wish you a very special Valentine's Day!**

# INSTALLATION
# VORP Core
- Run the vorp.sql file in the folder.
- Copy and paste the images from the [ITEMIMAGES] folder to `vorp_inventory\html\img\items`.
- Open `config.lua` and set `Config.Framework = "VORP"`.
# RSG Core
- Open `rsg-core/shared/items.lua` file and add the following code at the bottom.
```lua
loveenvelope = { name = 'loveenvelope', label = 'Love Envelope', weight = 100, type = 'item', image = 'loveenvelope.png', unique = true, useable = true, shouldClose = true, description = 'Love Envelope' },

lovewheelspin = { name = 'lovewheelspin', label = 'Love Wheelspin', weight = 100, type = 'item', image = 'lovewheelspin.png', unique = true, useable = true, shouldClose = true, description = 'Love Wheelspin' },
```
- Copy and paste the images from the [ITEMIMAGES] folder to `rsg-inventory\html\images`.
- Open `config.lua` file and set `Config.Framework = "RSG"`.
