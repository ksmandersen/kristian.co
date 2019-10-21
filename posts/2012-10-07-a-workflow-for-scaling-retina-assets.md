---
layout: post
title: A workflow for scaling retina assets
date: 2014-10-07 11:15
published: true
slug: 2012-10-07-a-workflow-for-scaling-retina-assets
---

Yesterday I published a small Automator workflow for OS X that I use to generate @2x and @1x scaled versions of my @3x assets. I decided to post it here for download [since a few people seemed interested](https://twitter.com/ksmandersen/status/519144015837814784).

I have been using this workflow for ages for downscaling @2x assets to @1x. It only made sense to update the workflow for @3x assets and share it with other lazy developers who hate manual work as much as me.

![Workflow example](/archive/unretina.gif)

You can get the workflow right here:

[![Unretina Workflow](/archive/unretina_workflow_screenshot.png)](/downloads/unretina.workflow.zip)

## Sidenote

As pointed out by several people on Twitter it is not the ideal solution to downscale image assets for iOS apps. The ideal solution is to use vector images in PDF files that Xcode can automatically upscale without artifacts. It is however often not possible to generate vector graphics for all parts of an app which is why I use this script for those assets.