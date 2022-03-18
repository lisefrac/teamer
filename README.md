# Teamer

**Project:** [Teamer: Make the Perfect Cuppa](http://lisefrac.net/teamer/)

**Date:** June 2020

**Involvement:** Wholly designed and developed by me.

**Description:** As a personal enrichment project, I decided to create a tea timing web application. This would allow you to select a type of tea (green, black, white, etc) which will automatically set a brewing time and display the brewing temperature. The user could then adjust the time up or down in increments of 10 seconds or 1 minute.  An alarm plays when the timer is done. 

Although simple to describe, the timing logic was not always easy to implement! Afterward, I wrote a more detailed post about what I learned about [measuring time in JavaScript](http://www.lisefrac.net/log/webdev-craft/til-in-javascript-timers/).

**Technologies:** HTML, CSS (including Flexbox), vanilla JavaScript. No images are used; just emoji, which are HTML entities. The tea buttons were created with a combination of border-radius:50% and the padding-top aspect ratio hack to maintain the same height and width despite Flexbox's... flexiness. 

**Status:** Live. 

**Potential improvements:**
- Allow users the ability to add a tea, and store it using their local storage
- Use Sass or Stylus for CSS
- Visual effects - border that changes color? (per iOS timer)

**Additional Notes**: Right now this is deployed as flat files FTPed to hosting space. Might set up as a Netlify site (or similar) for build/deploy/hosting in the future, but probably not until I move my blog to a static site generator.