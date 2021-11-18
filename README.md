# Xerxes
Xerxes is a discord bot written on the discord.js framework and a lot of commands. I constantly develop new features and add them.

<h1 align="center">
  <br>
  <a href="https://github.com/coderXeno/Xerxes"></a>
  <br>
  X E R X E S
  <br>
</h1>

<h3 align=center>A fun discord bot built with <a href=https://github.com/discordjs/discord.js>discord.js</a> framework.</h3>
<p align="center">Its super fun to use, has a lot of nice features and commands 


<div align=center>

  <a href="https://github.com/discordjs">
    <img src="https://img.shields.io/badge/discord.js-v13.0-blue.svg?logo=npm" alt="shield.png">
  </a>

  <a href="https://github.com/coderXeno/Xerxes/blob/main/LICENSE">
    <img src="https://img.shields.io/badge/license-MITv3-green" alt="shield.png">
  </a>

</div>

<p align="center">
  <a href="#about">About</a>
  •
  <a href="#features">Features</a>
  •
  <a href="#installation">Installation</a>
  •
  <a href="#setting-up">Setting Up</a>
  •
  <a href="#license">License</a>
  •
  <a href="#credits">Credits</a>
</p>

## About

Xerxes is a discord bot that has got lots of features and interesting commands that are useful for having fun and moderating 
your server at the same time. Feel free to take your time and read through the code that I've posted in the repository.

However, now that the formal introductions to Xerxes are done, and if you are still reading this Readme file, then I would like
walk you through a detailed journey of how I developed Xerxes and what my mindset was when solving certain challenges that came up. 
There were a lot of problems and challenges that i had tosolve along the way, and believe me, they were super fun indeed!

If you are a beginner and want to learn to build discord bots in discord.js framework, I believe the 
following journey that Im gonna describe in detail will be quite helpful for you.

So lets get into the details of the development journey!

I would like to start with the fact that before I built Xerxes, I built another discord bot, Xeno using the discord.py framework,
which unfortunately got deprecated soon after. So I started to look for another way to build a better and smoother running discord 
bot. Then, I came across discord.js and started reading up its <a href="https://discord.js.org/#/docs/main/stable/general/welcome">documentation</a>.
Well, lets say it took me quite some time to get myself fully accustomed with all the new concepts and hard Javascript concepts I had
to come across. One of these tough concepts was Asynchrounous Javascript Programming. But I took my time and learnt the things bit by bit.

Next, I started building the bot itself. The first thing to understand is that every bot needs to have a starting file that's gonna be 
specified in the ```package.json``` after you do an npm init. In my case, I've named it index.js, but you can name it whatever you want, 
but make sure to change the starting point in the package.json file. Next, in order to store the bot's secret token we need to create a 
config.json file, that's gonna contain all the bot's secret information including the bot token, the api keys(if any), the srv for the database
(Im using Mongo) and so on. Then, we connect that confg.json file to our main index.js file and import all the necessary information 
and store them in variabled or access them directly(Your choice, really).

The main problem with Xeno, was that I wrote down all the bot's commands in the single starter file. Imagine how messy that was!
So another of my missions for building Xerxes was restructuring the code and cleaning up the mess I made when building Xeno.
Here, the first really tough challenge presented itself. I needed commands but i needed them in separate files and folders so as to highly
improve readability and maintanability.(Also debugging is much easier 😅.) To solve this problem, I came up with the solution of making a Command class,
defined properties that commands should have and exporting it with ``module.exports``. Then for every new command I defined i imported the Command class 
and defined the command as a new object of that class, also exporting the command with ``module.exports``.

If you liked this repository, please to leave a star ⭐! It helps me keep bringing out more and more new features.

## Installation

You can add Calypso to your server with [this](https://discordapp.com/oauth2/authorize?client_id=416451977380364288&scope=bot&permissions=403008599) link! Alternatively, you can clone this repo and host the bot yourself.
```
git clone https://github.com/sabattle/CalypsoBot.git
```
After cloning, run an
```
npm install
```
to snag all of the dependencies. Of course, you need [node](https://nodejs.org/en/) installed. I also strongly recommend [nodemon](https://www.npmjs.com/package/nodemon) as it makes testing *much* easier.

## Setting Up

You have to create a `config.json` file in order to run the bot (you can use the example file provided as a base). Your file should look something like this:
```
{
  "token": "your_token_here",
  "ownerId": "your_ID_here",
  "bugReportChannelId": "bug_report_channel_ID_here",
  "feedbackChannelId": "feedback_channel_ID_here",
  "serverLogId": "server_log_ID_here",
  "apiKeys": {
    "catApi": "your_API_key_here",
    "googleApi": "your_API_key_here"
  }
}
```
Visit the Discord [developer portal](https://discordapp.com/developers/applications/) to create an app and use the client token you are given for the `token` option. `ownerId` is your own Discord snowflake. `bugReportChannelId`, `feedbackChannelId`, and `serverLogId` should be set to respective text channels on your own server. To get keys for supported APIs, vist:

  * [TheCatAPI](https://thecatapi.com/)
  * [Google APIs](https://console.developers.google.com/apis/)

After your `config.json` file is built, you have enable `Privileged Intents` on your Discord [developer portal](https://discordapp.com/developers/applications/). You can find these intents under the "Bot" section, and there are two ticks you have to switch on. For more information on Gateway Intents, check out [this](https://discordjs.guide/popular-topics/intents.html#the-intents-bit-field-wrapper) link.

Once done, feel free to launch Calypso using the command `node app.js` or `nodemon app.js`. If on Linux, you can also kick off using the `start.sh` script. If you need additional help setting up, join the [Calypso Support Server](https://discord.gg/pnYVdut)!

**Important Note:** Do not use Heroku to host Calypso! Calypso uses SQLite as its database which backs up its data store on disk. Heroku clears its contents often, so your database will be wiped. Read more [here](https://devcenter.heroku.com/articles/sqlite3).

### Emojis

If you are **self-hosting** Calypso, you may notice that the emojis for certain commands are not displaying. This is because Calypso uses **custom emojis** for a variety of her commands. These emojis will have to be added to your own server, and you will have to change the corresponding IDs in the `emojis.json` util if you would like to use them. Or, you can replace the emojis in `emojis.json` with ones you already have access to. If you would like to use Calypso's original custom emojis, hop into the [Calypso Support Server](https://discord.gg/pnYVdut) where you can snag them all.

### Colors

Upon being invited to a server, Calypso will automatically create **6** predefined colors for your server to enjoy. To add more, use the provided `createcolor` command to quickly and easily create new colors.

To add colors manually, first create a few empty roles at the bottom of your server's role hierarchy. The names of these roles must begin with the character `#`, for example, `#Red` or `#Blue`. Then change the color of that role to your desired hex, and that's it! After they are set up, the members of your server can then change their color by using Calypso's color commands! Credit to [Threebow](https://github.com/Threebow) for the idea.

![Alt Text](https://i.imgur.com/SLJCN6y.gif)

## To-Do

Calypso is in a continuous state of development. New features/updates may come at any time. Some pending ideas are:

  * Music
  * Automod
  * Stream alerts
  * Custom tag/reaction system

## License

Released under the [GNU GPL v3](https://www.gnu.org/licenses/gpl-3.0.en.html) license.

## Credits

* **Sebastian Battle** - *Initial work* - [github](https://github.com/sabattle)
* **Kyle Glaws** - [github](https://github.com/krglaws)
* **CommradeFido#5286** - *All art and graphics*
* **Red Discord Bot** - *Initial trivia* - [github](https://github.com/Cog-Creators/Red-DiscordBot/blob/V3/develop/README.md#join-the-community)
* **Threebow** - *Ideas and tutorials* - [github](https://github.com/Threebow)
