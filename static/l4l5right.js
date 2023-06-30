
import { Arena } from './arena/arena.js';

import { FullScreener } from './arena/systems/full_screener.js';
import { ExperimentControl } from './arena/systems/experiment_control.js';

/**
 * Create the experiment in the client, inside the HTML-ID `scene-container`. Supplement to the 
 *    `three-container-bars.html` template file.
 */

var socket = io();

function main() {
    const container = document.querySelector('#scene-container');
  
    const arena = new Arena(container, 50);

    const fullScreenButton = new FullScreener(container);
    const experimentController = new ExperimentControl(container, socket, false);
  
    arena.start();

    socket.on('stop-triggered', function(empty){
      arena.stop();
    })

  }

main();
