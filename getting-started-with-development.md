# FlyFlix Development Guide

This guide serves as a basic introduction to developing with FlyFlix. It wil cover the main structure as well as the most important files.

## File Overview

### flyflix.py

This is the main file that the server is hosted on. It handles the majority of communication with clients through socket events. For example, when the server recieves the event 'start-pressed' it emits the event 'star-triggered' which then gets sent to the `experiment_control.js` class and triggers an event there. It also handles routing to each page in flyflix. When experiment pages are routed, `flyflix.py` starts a background function that defines the experiment and creates trials.

### arena.js

The `arena.js` class defines the environment that the experiment takes place in. This includes the creation of the camera, scene, renderer, and animation loop. These are all three.js components to handle 3D rendering. It also creates any additional classes used in the experiment like the panels class (used for vertical bar trials) or the spheres class in the starfield branch (used for starfield trials).

### trial.py

The Trial class is used 

## How to guides

### Implementing Existing Stimulus / Creating New Experiments

Implementing existing stimulus in FlyFlix is simpler than creating new stimulus. The only file that you will need to edit is `flyflix.py`.

In order to implement existing stimulus, follow these steps:

1. 

### Implementing New Stimulus

In order to implement new stimulus, follow these steps:

1. Create a new class in components that defines your stimulus. Examples of these classes that already exist are `panels.js` and `spheres.js` (in the starfield branch). The stimulus will need to be made using [three.js](https://threejs.org/) systems and imported accordingly. In addition to the constructor, the class will need _setup method in which the [three.js](https://threejs.org/) object meshes will be created. This is necessary because the same object will need to be updated for each trial so it is easier to have one method to set up each trial. You will also need to create a changeClassName method that clears the object and calls setup again with the new parameters. Another crucial method to include is the `tick()` method. The `tick()` method is used to animate the class and should trigger movement based on the time interval since last tick. For additional methods and guidance, I reccommend looking at the `panels.js` class and creating a counterpart for all methods there as well as any additional methods you want for your stimulus.

2. Create a class that describes the spatial and temporal stimulation and update `data_exchanger.js` as you create diffrent methods. To do this it is easiest to model the class after the vertical bar stimulus' `spatial_temporal.py` class. The spatial temporal class will emit different socket events that will be recieved by the `data_exchanger` which will in turn call methods of the stimulus class in components. For example, when `SpatialTemporal.trigger_rotation(socket)` is called, the `SpatialTemporal` class emits the `speed` or `panels-speed` event along with a speed. This event is then recieved by the data exchanger and calls `panels.setRotateRadHz(speed)`. The data exchanger class is the only class that calls methods in the stimulus classes like `panels.js` or `spheres.js`. The spatial temporal class you create should emit events that trigger these changes.

3. Update the Trial class (`trial.py`). First, add new parameters that will be needed to initialize the 2 classes you created previously. Second, if the Trial class is created with those parameters, create a spatial temporal object with those parameters. This will then be used to create `open_loop_condition.py` and `closed_loop_condition.py`. These classes may need altered based on the needs of your stimulus (closed loop almost definetely will need updated). These conditions should then be added to `self.conditions` which is iterated through in the `trigger()` method.

4. Update the `arena.js` class to import and initialize your stimulus class, add it to the scene, add it to `loop.updateables`, set loggable to io, and add it to the DataExchanger constructor.

Additional information: In most branches of FlyFlix, vertical bars/panels are the only type of stimulus. Currently, only the starfield branch implements a second type. It may be helpful to work extending off of the starfield branch when implementing more stimulus for additional documentation and comparison.