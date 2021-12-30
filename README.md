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
