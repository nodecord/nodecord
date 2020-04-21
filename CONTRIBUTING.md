# Contributing to Nodecord
Hello! First off, thank you for wanting to contribute.

The following is a set of guidelines for contributing to any parts of Nodecord. It's goal is to guide you in the right way for any sort of contribution, code-side or when dealing with bug reports or anything else. All content is meant as a guide towards what we expect in contributions, not specific rules. Use your own judgement on what you think would fit best, and get going.

### Table of contents
[How can I contribute?](#how-can-i-countribute)
* [Reporting Bugs](#reporting-bugs)
  * [Before you submit a bug report](#before-you-submit-a-bug-report)
  * [Submitting a bug report](#submitting-a-bug-report)
  * [Tips for making a good report](#tips-for-making-a-good-report)
* [Suggesting Additions](#suggesting-additions)
  * [Before you suggest an addition](#before-you-suggest-an-addition)
  * [Submitting a suggestion](#submitting-a-suggestion)

[Styleguide](#styleguide)
* [General Preferences](#general-preferences)
* [Readability](#readability)
* [Variables and Configuration](#variables-and-configuration)

[Notes](#notes)
* [Managing issues](#managing-issues)

# How can I contribute?

## Reporting Bugs
Any project is going to run into bugs, no matter how many contributors or any other factors. We encourage the community to keep their eyes peeled for bugs :eyes: and file a bug report if they do find any. This section will guide you through the bug reporting process.

### Before you submit a bug report
There are a couple important steps to through before submitting a bug report, to ensure the quality of reports and to make it easier for maintainers to work through them.

* First, check any [pre-existing issues](https://github.com/nodecord/nodecord/issues) on GitHub to see if a bug report for the bug you've found has been submitted already. Try multiple queries and ways of describing the bug in the search box, and only continue if you're sure that you're not submitting a duplicate, or if already existing report aren't accurate enough.
* Next, make sure that the bug is reproducable. Make sure that it isn't a once off or rare bug, and that you can provide clear steps on how to reproduce the bug.
* Also make sure to check that the bug hasn't arised from your own code, and that it *is* from Nodecord's code (usually any file found in the `/lib/` directory).

### Submitting a bug report
Submitting a bug report is super easy thanks to GitHub issues. Click [here](https://github.com/nodecord/nodecord/issues/new?assignees=&labels=&template=bug_report.md&title=), which will take you to the bug report issue template, give it an appropriate title, fill in all the details you can, and hit submit. You're done!

### Tips for making a good report
* Keep your issue titles short and concise. `Message model failing to create TextChannel` would be a better choice than `The message model won't create a text channel` in most cases, as an example.
* Be gentle on the formatting, plain text with Markdown formatting only where needed is preferred.
* Provide concise, clear and descriptive answers. The key to a bug report is making the bug as clear as possible to maintainers and anybody looking at the report, so they don't have to spend time figuring out what the bug actually is, and can get to investigating (and potentially sorting) the bug.
* Use an external service like [Hastebin](https://hasteb.in) for providing console logs and otherwise large blocks of content, instead of pasting them directly into the description.

## Suggesting Additions
You may come across one of those "wow, this is a great idea" showerthoughts while using Nodecord. We hope not in the shower, but you get the jist. We :heart: suggestions of any kind, and want to make it easy and open to making suggestions.

### Before you suggest an addition
All we ask is you give your idea some thought before going forward with the suggestion. Some key points to consider before going forward with the suggestion are:
* Would the addition be helpful to more than one person, or just me?
* Is the addition feasable? (ie. wouldn't bloat the library or require major work)
* What are the reasons it would be helpful to others?

### Submitting a suggestion
Submitting suggestions is even easier than bug reports, as you only need to provide a clear description of your suggestion and any context if necessary. Click [here](https://github.com/nodecord/nodecord/issues/new?assignees=&labels=&template=feature_request.md&title=) to be directed to the feature additions template, add a title and some details, and you're away!

# Styleguide

## General Preferences
* Single quotes (`'`) are preferred over double quotes (`"`) in cases where variables are not required.
* Template literals are preferred over joining strings (`'a' + test`) in cases where varables are required.
* Features provided in node.js v12 are preferred over any others, as that is the minimum version required for Nodecord.
* Use of ES6 and promises is **required**, usage of code like `function () {}` and callbacks will be denied.

### Readability
* Compacting code is not preferred, and it is advised you keep code open and readable where possible.
  * Single line functions are great if the function in question is not complex or only requires one/no argument(s).

### Variables and Configuration
* Hard coding variables in files is strongly discouraged.
  * For variables that most likely won't change, whether they're needed in one or more file(s), they should be defined in the Constants file, found in `/lib/util/Constants.js`
  * If possible in the context being worked in, providng a way to configure an option is preferred over hard coding it, for example allowing the user to set an avatar size but having a default of 128x, instead of hard coding and forcing a size of 128x.

If you have any suggestions for the styleguide, please open a blank issue related to Contribution Guidelines and discuss them with us, or ask on our [Discord server](https://discord.gg/BUGV4Er).

# Notes

### Managing issues
* Attach appropriate labels where you feel necessary. Labels provide a faster and efficient way to find and manage open or past issues, so only add appropriate labels if you feel it would benefit from them.