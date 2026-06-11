# YOU App — Master MVP Specification

## Purpose

YOU is an identity-driven growth platform.

The mission is to help users discover what drives them, build meaningful goals, maintain momentum, and create a story they are proud of.

This document serves as the single source of truth for development, AI agents, future planning, and product decisions.

---

# Core Philosophy

Users do not choose who they are.

The system discovers:

* What drives them
* What motivates them
* How they grow
* What story they are building

Everything in the app revolves around identity.

---

# User Journey

## Launch

User opens app.

System checks:

* Logged in?
* Onboarding completed?

Routes:

### New User

Splash
→ Welcome
→ Authentication
→ Onboarding
→ Driver Reveal
→ Home

### Returning User

Splash
→ Home

---

# Authentication

Methods:

* Google Sign In
* Apple Sign In
* Email Sign In

User Object

```ts
{
  id: string
  name: string
  email: string
  createdAt: Date
  onboardingCompleted: boolean
  driver: string
}
```

# Onboarding

Purpose:

Determine Driver Card.

Total Questions:

4

## Question 1

Which would bother you more?

A. Failing publicly

B. Never trying

C. Being forgotten

D. Becoming someone you don't respect

## Question 2

Someone your age builds your dream life.

What's your first reaction?

A. Respect

B. Jealousy

C. Curiosity

D. Motivation

## Question 3

Which matters more?

A. Being admired

B. Being understood

C. Being remembered

D. Being loved

## Question 4

Which sentence feels most true?

A. I have something to prove.

B. I owe people.

C. I need more.

D. I need peace.

---

# Driver System

Drivers:

* VEX
* EMPYR
* SHADE
* RUST
* ECHO
* NULL
* VECTOR
* ASH
* NOCA
* SAGE
* REVENANT
* RAGE

## Hidden Dimensions

```ts
{
  ambition: number
  ego: number
  connection: number
  healing: number
  chaos: number
  logic: number
}
```

Each answer contributes points.

The final user profile is compared against all Driver profiles.

Nearest match wins.

---

# Driver Reveal

Flow:

Question Complete
→ Analysis Screen
→ Driver Reveal

Analysis Copy:

* Connecting the dots...
* Building your story...
* Analyzing your answers...

Reveal:

```text
YOUR DRIVER IS

VEX
```

Display:

* Driver Name
* Driver Description
* Character
* Driver Card

Buttons:

* Share Card
* Enter YOU

---

# Home Screen

Already implemented.

Do not redesign.

Home acts as the main hub.

Displays:

* Current Goal
* Character
* Day Streak
* Total XP
* Current Chapter
* Weekly Goal Progress
* Achievements
* Overall Progress
* YOU Card

Navigation:

* Home
* Streak
* YOUMap
* YOUStory
* Profile

---

# Goal System

Purpose:

Define what user wants to become.

Examples:

* Become a Video Editor
* Learn React
* Get Fit
* Start a Business

Goal Object

```ts
{
  id: string
  title: string
  progress: number
  status: string
}
```

---

# YOUMap

Purpose:

Generate roadmap.

Example:

Become a Video Editor

↓

Chapter 1
Learn Basics

Chapter 2
Edit Shorts

Chapter 3
Advanced Editing

Chapter 4
Portfolio Building

Roadmaps contain Chapters.

---

# Chapter System

Purpose:

Break goals into milestones.

Example:

Chapter 1

Tasks:

* Watch Tutorial
* Install Software
* Edit First Clip

Chapter Completion rewards XP.

---

# Task System

Every chapter contains tasks.

Task Object

```ts
{
  id: string
  title: string
  completed: boolean
}
```

Task Completion:

* XP Reward
* Progress Update
* Streak Contribution

---

# XP System

Users earn XP through:

* Completing Tasks
* Completing Chapters
* Daily Check-ins
* Goal Progress

XP determines:

* Level
* Progress
* Character Growth

---

# Streak System

Purpose:

Maintain consistency.

Daily Question:

Did you move forward today?

YES

↓

Streak +1

Store:

```ts
{
  userId: string
  date: string
  completed: boolean
}
```

---

# Character System

Every user has:

* Character
* Driver
* Level

Future Expansion:

* Cosmetics
* Outfits
* Effects
* Companions

Core progression remains free.

---

# YOU Card

Contains:

* Driver
* Character
* Level
* XP
* Goal

Actions:

* View Full Card
* Share Card
* Export Image

---

# YOUStory

Purpose:

Track user growth over time.

Displays:

* Goals Started
* Goals Completed
* Driver History
* Chapter History
* Milestones

Acts as user's digital story.

---

# Profile

Displays:

* Driver
* Level
* XP
* Goals Completed
* Streak
* Join Date

---

# Settings

Options:

* Dark Mode
* Light Mode
* Notifications
* Logout

---

# Notifications

Examples:

"Your story isn't finished."

"You were on a 7 day streak."

"Chapter 2 is waiting."

---

# Monetization

Core Features:

FREE

* Driver Discovery
* Goals
* Roadmaps
* Chapters
* Tasks
* Streaks
* Character
* YOUStory

Premium:

* Cosmetic Character Items
* Cosmetic Themes
* Profile Cosmetics
* Card Cosmetics
* Advanced AI Usage
* Additional Roadmap Revisions

Roadmap Revision Limit:

5 per month free.

Unlimited for premium.

---

# Database Collections

```text
users
drivers
goals
roadmaps
chapters
tasks
streaks
xp
cards
notifications
```

---

# MVP Definition

A user can:

1. Sign up
2. Complete onboarding
3. Receive a Driver
4. Enter Home
5. Create a Goal
6. Receive a Roadmap
7. Complete Tasks
8. Earn XP
9. Maintain a Streak
10. Track Progress
11. Share their YOU Card

If all of the above works, YOU MVP is complete.
