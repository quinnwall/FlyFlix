# FlyFlix Development Guide

This guide serves as a basic introduction to developing with FlyFlix. It wil cover the main structure as well as the most important files.

## File Overview

### flyflix.py

This is the main file that the server is hosted on. It handles the majority of communication with clients through socket events. For example, when the server recieves the event 'start-pressed' it emits the event 'star-triggered' which then gets sent to the experiment_control.js class and triggers an event there. It also handles routing to each page in flyflix. When experiment pages are routed, flyflix.py starts a background function that defines the experiment and creates trials.

### arena.js

The Arena class defines the environment that the experiment takes place in. This includes the creation of the camera, scene, renderer, and animation loop. These are all three.js components to handle 3D rendering. It also creates any additional classes used in the experiment like the panels class (used for vertical bar trials) or the spheres class in the starfield branch (used for starfield trials).

### trial.py

The Trial class is used 

## How to guides

### Implementing New Stimulus

In order to implement new stimulus follow these steps:

1. Create a new class in components that defines your stimulus. Examples of these classes that already exist are panels.js and spheres.js (in the starfield branch). The stimulus will need to be made using three.js systems and imported accordingly. In addition to the constructor, the class will need _setup method in which the three.js object meshes will be created. This is necessary because the same object will need to be updated for each trial so it is easier to have one method to set up each trial. You will also need to create a changeClassName method that clears the object and calls setup again with the new parameters. Another crucial method to include is the tick() method. The tick() method is used to animate the class and should trigger movement based on the time interval since last tick. For additional methods and guidance, I reccommend looking at the panels class and creating a counterpart for all methods there as well as any additional methods you want for your stimulus.

2. Update the 