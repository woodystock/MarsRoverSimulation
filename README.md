
# Initialise the project

## Install
First install node and jest in the directory by running the following in the terminal:

        npm install --save-dev jest

In order to add debugging, create a launch.json file (in the debug menu) and replace the generate file with the following:
```javascript
{
  "version": "0.2.0",
  "configurations": [
    {
      "name": "Debug Jest Tests",
      "type": "node",
      "request": "launch",
      "runtimeArgs": [
        "--inspect-brk",
        "${workspaceRoot}/node_modules/.bin/jest",
        "--runInBand"
      ],
      "console": "integratedTerminal",
      "internalConsoleOptions": "neverOpen",
      "port": 9229
    }
  ]
}
```
or for windows:
```javascript
{
    "version": "0.2.0",
    "configurations": [{
        "name": "Debug Jest Tests",
        "type": "node",
        "request": "launch",
        "runtimeArgs": [
            "--inspect-brk",
            "${workspaceRoot}/node_modules/jest/bin/jest.js",
            "--runInBand"
        ],
        "console": "integratedTerminal",
        "internalConsoleOptions": "neverOpen",
        "port": 9229
    }]
}
```
## Debug and testing
To run the tests, just initiate the debugger (f5).<br>
To look deeper into what is being tested in each file, open up
        package.json
and replace the word '<b>jest</b>' in the section:
```javascript
 "scripts": {
    "test": "jest"
  },
```
With any of the following:

        jest test/mars_plateau.test.js
        jest test/mars_rover-console.test.js
        jest test/mars_rover_naviagation.test.js
        jest test/mars_rover_test.js

Then, instead of intiating the debugger, run the following in the terminal:

        npm test

You should now see a detailed list of everthing being tested inside the specified test suite.
# Using the mars rover console
The program will take a number of inputs that will create a plateau, place rovers and move them about given a set of movement instructions. This can be done either using a single function call, or broken down and done manually, step by step.
## First input -> Create the plateau
The first input is looking for a width and height to create a plateau. This will be used for the remainder of the inputs
<br>eg. the input...

        5 5

...will create a plateau with its north-east most position being the coordinates 5,5.

## Next input -> Place a rover in the plateau
The second input will place a rover at the given coords, looking in the direction <b>N</b>orth, <b>W</b>est, <b>S</b>outh, or <b>E</b>ast
<br>eg. the input

        1 2 N

will place a rover at postion x = 1, y = 2, looking in the direction North.

## Next input -> Path for the rover to follow

The next input should be a string containing either 
        
        L - turn the rover left
        R - turn the rover right
        M - move the rover forward in its current direction

so the path

        LMLM

will try to move the robot "<b>left, forward, left, forward</b>" in that order. If it encounters the boundries of the plateau, or another robot, it will stop and not follow any more of the path.
<br>After this, you can then repeat inputs indefinitly for new rovers and movement paths...

## Using a single function call
All the functionality of this program can be run through a single command in the mars_rover_console.js

```javascript
function handleMarsRoverConsoleInputs(...inputs)
```
### Inputs
The input should be provided as parameters to the function in the order given below.
<br> eg. In order to run the following commands...

        5 5
        1 2 N
        LMLMLMLMM
        3 3 E
        MMRMMRMRRM

You would call the function as follows:

```javascript
const output = handleMarsRoverConsoleInputs(
    "5 5",
    "1 2 N",
    "LMLMLMLMM",
    "3 3 E",
    "MMRMMRMRRM"
);
```
### Outputs
The output of this call will be a list of all the rovers final positions and directions in the same format as the input.
<br> Running the above will give the following output

        1 3 N
        5 1 E

And in javascript in the form of...

```javascript
["1 3 N","5 1 E"]
```

## Calling the inputs manually
If you want more control over each of the inputs this can be done manually using the following functions

```javascript
function handlePlateauInput(input)
function handleRoverInput(plateau, input)
function handlePathInput(plateau, roverIndex, input)
```
These functions will validate the given input and do each of the above inputs indvidually. As you can see, rovers require a pre generated plateau and path require a plateau with a given rover index. These are returned by their retrospective input handler...
        
        handlePlateauInput - returns a plateau object
        handleRoverInput - returns the index of the generated rover on the given plateau
        handlePathInput - returns the new position of the rover, formatted as above

with the intention being they are passed along the input heirachy. The path input is slightly different in that it returns the formatted output string for that given rover.

# Possible Extensions
To improve the program, here is a list of possible future additions that could be added...
<br>

### Extension 1 - Add a way to visualise what is going on
<hr>
Adding a way to print out the current state of the plateau, so it is easier to visualise what is happening on the plateau. Though this was considered, it would not have added anything to the implementation of the TDD approach, and would have more than likely got in the way by adding more to the logs. This would be a nice feature though, to help visualise what the program is actually doing.


### Extension 2 - Add asyncronous movement
<hr>
Rovers shouldn't move instantly, and it would take time for the rover to move from one space to another in a non-simulated environment. This would also mean the rovers could move at the same time, but adds the additional complications of how it should handle, and try to avoid, collisions. The approach I have currently taken is very data driven, and it would probably need changing to utilise the plateau more, fleshihg it out into a fully managed 2D array. I thought this changed the nature of the program too much from its initial brief, but would be happy to give it a go in the future.