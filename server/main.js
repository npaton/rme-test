import Empirica from "meteor/empirica:core";
import "./bots.js";
import "./callbacks.js";
import { taskData } from "./constants";

// gameInit is where the structure of a game is defined.
// Just before every game starts, once all the players needed are ready, this
// function is called with the treatment and the list of players.
// You must then add rounds and stages to the game, depending on the treatment
// and the players. You can also get/set initial values on your game, players,
// rounds and stages (with get/set methods), that will be able to use later in
// the game.
Empirica.gameInit(game => {
  game.players.forEach((player, i) => {
    player.set("avatar", `/avatars/jdenticon/${player._id}`);
    player.set("score", 0);
  });

  //if the stage duration is less than 5 seconds (can't work), then we set it to unlimited (i.e., 86400)
  const roundDuration =
      game.treatment.stageDuration > 5 ? game.treatment.stageDuration : 86400;

  //we shuffle the task and make sure that we skip the practice example
  const task = _.shuffle(taskData.slice(1));


  _.times(task.length, i => {
    const round = game.addRound();
    round.set("task", task[i]);
    round.addStage({
      name: "response",
      displayName: "Response",
      durationInSeconds: roundDuration
    });
  });
});
