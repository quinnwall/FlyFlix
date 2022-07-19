# FlyFlix

This repository is a supplement to our preprint [An inexpensive, high-precision, modular spherical treadmill setup optimized for *Drosophila* experiments](https://doi.org/10.1101/2021.04.29.442008).

## Usage

### Installation

To run the FlyFlix server, a recent version of [python](https://www.python.org/) is required. The server was written in Python-3 and only tested in [Python-3.7](https://devguide.python.org/#status-of-python-branches) and newer (up to Python-3.10.4). The [installation of a recent python interpreter](https://wiki.python.org/moin/BeginnersGuide/Download) or another type of [python distribution](https://www.anaconda.com/products/individual) is outside the scope of this documentation.

Check for the current version of python by running the following command. The result should show a version number > 3.7.0

```sh
python --version
```

To install dependencies, a python package management system compatible with [pip](https://pip.pypa.io/en/stable/) is required. Using a [virtual environment](https://packaging.python.org/guides/installing-using-pip-and-virtual-environments/#creating-a-virtual-environment) is encouraged although optional and once again outside the scope of this documentation. The following descriptions assume that pip is used as a package manager and the `pip` script is available in the path. Otherwise load pip as a module, for example by calling `python3 -m pip` followed by the pip command.

The file `requirements.txt` contains the dependencies for FlyFlix and can be installed with:

```sh
pip install -r requirements.txt
```

The most important requirements are [Flask](https://pypi.org/project/Flask/) and [Flask-SocketIO](https://pypi.org/project/Flask-SocketIO/). Most of the other packages are dependencies of these two items. If you prefer installing python packages in a different way, make sure the two packages mentioned above are installed with all their dependencies.

If you experience issues when running FlyFlix, you might want to upgrade installed packages. On Linux, you can run a `make update`, otherwise the following two commands run from the terminal should achieve the same:

```sh
pip install --upgrade pip
pip list --outdated --format=freeze | grep -v '^\-e' | cut -d = -f 1  | xargs -n1 pip install -U
```

### Run FlyFlix

Once installed, you should be able to run FlyFlix by executing a python script on the terminal: `python flyflix.py` (on Linux and Mac you can also run `make localhost`, which will also show you your local IP address). Once the application is up and running, the client can be started by pointing a web browser to an URL with the IP address of the server at port `17000` (you can specify the port by appending `:17000` to the address). If you run the browser on the same machine as FlyFlix is running, such as your laptop or your workstation, you can use the address of the localhost and point your browser to <http://127.0.0.1:17000> or <http://localhost:17000>. 

If you want to run the client on another device than your FlyFlix server, for example a tablet, a smartphone, or another computer, you will need to find out the IP address of the FlyFlix server. You can find your current IP by running the terminal command `ip addr` (Linux and Mac) or `ipconfig` (Windows). 

A resource to read more about the Client-Server model is <https://en.wikipedia.org/wiki/Client%E2%80%93server_model>. 

## Architecture

FlyFlix is a web application that runs in most modern web browsers. While the server component is written in python-3 and requires a computer to run, the client is implemented in JavaScript inside an HTML website. Browsers that access the server receive the client code as part of the website. Through a bidirectional communication server and client exchange status information. Consequently, several clients can connect to the same server. The communication between client and server uses the low-latency library [Socket.IO](https://socket.io/), technology build around the [WebSocket protocol](https://en.wikipedia.org/wiki/WebSocket), for bidirectional communication.

### Server

The server is implemented as a [Flask](https://flask.palletsprojects.com) web application. Flask itself is primarily used to deliver the client application. The server application is responsible for keeping track of the experiment, delivering the visual updates to the client, and data logging. The communication with the client is done through the additional [Flask-SocketIO](https://flask-socketio.readthedocs.io) layer.

The main implementation of the server is done in the `flyflix.py` script.

### Client

The client is implemented as a javascript application inside a HTML website. The application runs in most modern web browsers, although we recommend [Firefox](https://en.wikipedia.org/wiki/Firefox) or [Chromium](https://en.wikipedia.org/wiki/Chromium_(web_browser)), which are available on most platforms from Linux, to iOS, macOS, BSDs, Windows, and Android. The client application is delivered through the Server on an experiment-specific URL.

The FlyFlix client uses two external libraries, [Socket.IO](https://socket.io/) and [Three.js](https://threejs.org/). Recent versions of both libraries are part of this repository and are locally delivered through the Flask web server. They can be found in the `static/vendor` directory. You might want to check if more recent versions are available since they might improve performance and fix bugs.

An example application that uses the Three.js library is delivered through the `templates/three-container-bars.html` file and implemented in the `static/bars.js` file.
