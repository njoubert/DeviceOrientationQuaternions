## What's this?

Euler Angles are terrible to work with if you want to calculate differences between orientations. But the browser spits out euler angles for your phone's deviceorientation.

This code shows you how to convert the euler angle representation to quaternions, and use it to calculate the angles between an initial orientation of your phone, and subsequent orientations.

If you change the phone's orientation by more than 20 degrees around any axis, the screen will turn red.

Try to start it in a weird orientation and see what happens! Works every time :) 

with only 7 lines of simple to read code to get this behavior!


## Testing
Run index.html on your phone. I do this by:

    python -m SimpleHTTPServer
    
and opening the local IP on my phone.
