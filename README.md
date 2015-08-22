# Quick Survey

> A tool for quickly building and releasing surveys. Open source, quick to host it yourself.

# Goals

* One click install - on heroku?
* (Next) Quickly edit questions and types (first in the code, then in the seed yaml, then maybe a backend)

# To deploy

For now, you need to still do most of the installation stuff, in the future you'll hopefully be able to do this with a one click deploy to heroku.

1. Install Meteor `curl https://install.meteor.com/ | sh`
2. Clone repo to a local directory `git clone git@github.com:simonv3/quick-survey` and change directory `cd quick-survey`.
3. Add the questions - they're defined in `server/startup/loadQuestions.js`. This will be moved to a yaml file that will get read every time the server restarts.
4. Run the app to see if it all works `meteor`
5. Deploy to meteor `meteor deploy mysurveyname.meteor.com`
6. Go to mysurveyname.meteor.com and enjoy your app!
