# Trex ANALYSIS AND DESIGN

1. What is the title of the game?
T-Rex Game

2. What is the goal of the game?
The goal of the game is to avoid the cacti by jumping over them.

3. What is the storyline of the game?
A T-Rex is running across a field where there are cacti in the way so it has to jump over them.

4. What are different elements constituting the game?
T-Rex
Cactus
Score
High score
Replay button
Clouds
Ground
Game Over message

5. Describe individual behavior of each element in the game.

T-Rex: Can jump or duck by using the arrow keys or space bar. Has an animation while running and changes when it touches a cactus. Can’t touch the cactus.

Cactus: 
-- The cacti is created beyong the right boundary of canvas
-- the cacti moves from righ to left.( -ve velocityX)
-- there is almost equal distance between each cacti object.
-- T-Rex has to jump over them. 
-- Each cacti is different from the others, 
-- there are 6 different cacti Images
-- each cacti object is placed on the ground
-- the cacti speed increases as the score increases.
-- INFINTE amount of cacti objects in the game
-- different sizes
-- different spaces
-- random images on cacti
-- no pattern for cactus images



Clouds: 
-- Moves from right to left and is just decoration 
-- x velocity is negative. 
-- Generated randomly according to vertical position. 
-- When the game ends, clouds stop moving. 
-- Only one image is used for all the clouds.
-- INFINTE amount of clouds objects in the game
-- stops moving when player dies


Score: The score is in the top right and is steadily increasing as long as the T-Rex is alive.

High score: Displayed as “HI,” the high score is the highest score on the game that the player got.

Replay button: 
- After the T-Rex touches a cactus this button is displayed 
- Click the replay button to reset the game.
- score returns to 0 once pressed
- gamestate returns to play
- the clouds and cacti which where paused upon ending the game are removed
- after old cacti and clouds are removed, new ones are genarated normally
- highscore stays even if the gamestate is play
-- if user refreshes page, the game will treat user like a new player and will not display high score
-- trex anim reverts to normal
-- ground velocity returns to normal



Ground: T-Rex runs on the ground and can only jump when touching it. Moves from right to left and increases in speed as the score increases. Ground and cacti are moving at the same speed.

Game Over message: Displayed when the T-Rex touches a cactus.

5. What are the elements of skill?
Timing the jumps

6. What are the elements of chance?
When you aren’t very good at the game but get lucky when trying to jump over the cactus.

7. How does the game create balance between elements of skill and chance?
The goal is not very difficult but not very easy which allows players that are skilled, or players that are lucky to play the game.

8. How does the game provide feedback to the player?
Through the score, high score, game over message, and play again button.
