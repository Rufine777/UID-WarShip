# ⚓ WARHSHIP — Fleet Battle System

WARHSHIP is a browser-based space combat game built using **HTML, CSS, and JavaScript**.  
It features a login system, navigation-based UI, and a real-time shooting survival game where the player controls a jet, destroys enemies, and survives as long as possible.

---

## 🚀 Features

### 🔐 Authentication Screen
- Simple login system (client-side simulation)
- Input validation for Commander ID and Access Code
- Toast notifications for feedback
- Auto-redirect to game on successful login

### 🎮 Game Mechanics
- Player-controlled jet movement (↑ ↓ keys)
- Shooting system using SPACE key
- Enemy spawning system with lanes
- Health-based enemy destruction system
- Score tracking system
- Increasing difficulty over time

### 🧭 Navigation System (SPA style)
- Login Page
- Game Page
- Controls Page
- Leaderboard Page
- Smooth page switching using JavaScript (`switchPage()`)

### 📊 Leaderboard
- Static leaderboard showing top commanders
- Can be extended for backend integration

### ⏸ Game States
- Pause system (P key or click)
- Game Over screen with final score display

---

## 🎮 Controls

| Key | Action |
|-----|--------|
| ↑ | Move Up |
| ↓ | Move Down |
| SPACE | Fire Bullet |
| P | Pause Game |

---

## 🧠 Game Logic Overview

### Enemy System
- Enemies spawn in random lanes
- Move from right to left
- Have health points (multi-hit destruction)

### Scoring System
- +1 score for every enemy destroyed
- Difficulty increases every 10 points:
  - Enemy speed increases
  - Spawn rate decreases

### Collision System
- Bullet vs Enemy collision detection
- Uses bounding rectangle detection

---