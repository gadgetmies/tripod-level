# Tripod leveling web app

Tool for easy leveling of a camera tripod with (or without) a half ball leveler.

Currently works only on iOS (tested with iPhone) and in landscape mode.

## Instructions

1. Open the app in the browser on your iOS device.
1. Tap the Share icon (the square with an arrow pointing out of it) at the bottom of the screen.
1. Scroll down to the list of actions and tap Add to Home Screen.
1. Attach your device to a mount that you can mount on the tripod (in landscape orientation).
1. Move the half ball to move the lines to the center of the circles. 
   When the center circle turns green, the top is level.
1. Replace the device mount with e.g. a ball head or with a camera.
1. Snap some photos (optional).

## Tools

<figure>
<img src="https://cdn.shopify.com/s/files/1/0136/3119/3188/products/ulanzi-st-01-phone-tripod-mount-mobile-photo-video-11086458421348_800x.jpg" alt="Ulanzi ST-01 Phone Tripod Mount" width="200"/>
<figcaption>Phone tripod mount (e.g. Ulanzi ST-01 Phone Tripod Mount)</figcaption>
</figure>

### Options for levelling

<figure>
<img src="https://cdn.manfrotto.com/pub/media/catalog/product/cache/1e774dca205198565016e92bdb88ad55/4/3/438.jpg" alt="Manfrotto Ball Camera Leveller" width="200"/>
<figcaption>Ball Camera Leveller (e.g. Manfrotto Ball Camera Leveller)</figcaption>
</figure>

<figure>
<img src="https://cdn.manfrotto.com/pub/media/catalog/product/cache/1e774dca205198565016e92bdb88ad55/l/e/levelling-base-manfrotto-338.jpg" alt="Manfrotto Levelling Base" width="200"/>
<figcaption>Levelling base (e.g. Manfrotto Levelling Base)</figcaption>
</figure>

<figure>
<img src="https://cdn.manfrotto.com/pub/media/catalog/product/cache/1e774dca205198565016e92bdb88ad55/5/5/555b.jpg" alt="Levelling Centre Column for 055Pro" width="200"/>
<figcaption>Levelling centre column (e.g. Manfrotto Levelling Centre Column for 055Pro)</figcaption>
</figure>

<figure>
<img src="https://cdn.manfrotto.com/pub/media/catalog/product/cache/1e774dca205198565016e92bdb88ad55/5/6/560ballsh.jpg" alt="Manfrotto 60mm Short Half Ball" width="200"/>
<figcaption>Half ball leveler (e.g. Manfrotto 60mm Short Half Ball)</figcaption>
</figure>

<figure>
<img src="https://cdn.manfrotto.com/pub/media/catalog/product/cache/1e774dca205198565016e92bdb88ad55/5/3/535.jpg" alt="MPRO Carbon Fibre 2-Stage Video Tripod" width="200"/>
<figcaption>Tripod with bowl for half ball leveler (e.g. MPRO Carbon Fibre 2-Stage Video Tripod)</figcaption>
</figure>

## Development

In order to access the accelerometer on the iOS device the page needs to be served over a secure connection (https). One
way of achieving this is to:

1. Install ngrok and http-server with e.g. `brew install ngrok` and `npm i -g http-server`
1. Setup ngrok (you can get (better) instructions by running `npm start`):
   1. Register for a ngrok account
   1. Generate an authtoken
   1. Save the authtoken to your local config `./ngrok authtoken YOUR_AUTHTOKEN_HERE`
1. Start the server with `npm start`
1. Open `https://NGROK_PUBLIC_URL/tripod-level/` (`NGROK_PUBLIC_URL` being in the form 
   `https://0000-00-000-00-00.ngrok.io`) in a browser  