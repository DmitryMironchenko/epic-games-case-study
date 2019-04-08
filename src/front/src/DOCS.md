## Working with the Data

Using a SQLite client is the quickest way to browse through the database. [SQLiteBrowser](https://sqlitebrowser.org/) is a good application for this.

## Available API Endpoints

All endpoints are prefixed with `/api/`

| endpoint      | returns                                                                           |
| :------------ | :-------------------------------------------------------------------------------- |
| game/frame    | game frame data                                                                   |
| weapons       | the weapon name and number of kills made by that weapon                           |
| players/kills | player kill data                                                                  |
| players/:type | player data for a specific player type. Types are beginner, intermediate, and pro |

## Database Tables

### player_state

Contains frame-by-frame information of the game state in easily queriable format.

| Column      |   Type   | Description                                                                         |
| ----------- | :------: | :---------------------------------------------------------------------------------- |
| playerguid  | text(32) | Unique identifier for the player.                                                   |
| framenumber | integer  | Frame number identifying the exact frame this state describes in the match.         |
| posX        |   real   | Player's position's x-coordinate component in this frame.                           |
| posY        |   real   | Player's position's y-coordinate component in this frame.                           |
| posZ        |   real   | Player's position's z-coordinate component in this frame.                           |
| viewW       |   real   | W component of the quaternion defining where player is looking at in this frame.    |
| viewX       |   real   | X component of the quaternion defining where player is looking at in this frame.    |
| viewY       |   real   | Y component of the quaternion defining where player is looking at at in this frame. |
| viewZ       |   real   | Z component of the quaternion defining where player is looking at at in this frame. |

### game_frame

Contains frame-by-frame information of the game state in JSON format.

| Column      |  Type   | Description                                                                 |
| ----------- | :-----: | :-------------------------------------------------------------------------- |
| framenumber | integer | Frame number identifying the exact frame this state describes in the match. |
| frame       |  text   | JSON string containing a list of player state updates in the frame.         |

### player_kill

Contains information about the individual kills.

| Column      |   Type   | Description         |
| ----------- | :------: | :------------------ |
| killer_guid | text(32) | GUID of the killer. |
| victim_guid | text(32) | GUID of the victim. |
| weapon      | text(32) | Weapon used in kill |
