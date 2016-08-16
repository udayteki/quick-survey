# Quick Survey

> A tool for quickly building and releasing surveys. Open source & quick to host it yourself.

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/simonv3/quick-survey/tree/develop)

![quick-survey](http://i.imgur.com/AYn4Jd4.png)
![quick-survey-results](http://i.imgur.com/4elbHfe.png)

# Try it out

Have a go at managing [this heroku instance](https://quick-survey-sample-app.herokuapp.com/manage). The email is `admin@admin.com` and the password is `admin123`. 

You can take the example survey here: https://quick-survey-sample-app.herokuapp.com/.

# Goals

* [x] One click install.
* [x] Manage your own survey with a variety of question types.
* [ ] Optional log in and verification (through e-mail / GitHub / Twitter) of a survey. Still to do: GitHub / Twitter / Etc.

# To deploy

## To install on Sandstorm:

* Visit [Quick Survey in the Sandstorm App Market](https://apps.sandstorm.io/app/wupmzqk4872vgsye9t9x5dmrdw17mad97dk21jvcm2ph4jataze0) and click "Install".

## To deploy on Heroku:

[![Deploy](https://www.herokucdn.com/deploy/button.svg)](https://heroku.com/deploy?template=https://github.com/simonv3/quick-survey/tree/develop)

Then fill in the name and url of your app. Once your survey is deployed you'll be able to add questions, edit the details, etc. 

## To deploy with Meteor:

1. Install Meteor `curl https://install.meteor.com/ | sh`
2. Clone repo to a local directory `git clone git@github.com:simonv3/quick-survey` and change directory `cd quick-survey`.
4. Run the app to see if it all works `meteor`
5. Deploy to meteor `meteor deploy mysurveyname.meteor.com`
6. Go to mysurveyname.meteor.com, you'll be taken to a setup screen.
7. Ask people things!

# Contributing

What's needed:

* This tool was built for user experience researchers. So I need user experience testers!
* Ideas for the tool to do.
* Angular / Meteor expertise to go over the code
* Security holes found?

# Attribution

* Entypo icon font used for icons. It's beautiful. http://www.entypo.com/
