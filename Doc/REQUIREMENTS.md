## 🧠 AI-Agent-Builder : Refactor, Fix & Enhance

## 🎯 Task Objective

Refactor and improve an existing partially built React application ("AI-Agent-Builder") by:

- Fixing intentional React bugs and performance issues
- Improving code quality and architecture
- Redesigning the UI/UX into a modern drag-and-drop interface
- Delivering a production-quality, high-performance web application

This challenge evaluates both engineering thinking and user-focused design skills.

---
⚙️ Tech Stack

# The application is built using:

- React.js
- TypeScript
- Tailwind CSS (recommended for styling)
- dnd-kit (for drag-and-drop functionality)

# Optional tools:
 
- React Context & Hooks for better state management
---

##  Tasks

### 🧩 Task 1. Fixing Bugs and Performance Issues
The codebase intentionally contains several React anti-patterns and performance bottlenecks:

* Unnecessary re-renders
* Missing memoization  
* Inefficient state updates
* Improper `useEffect` usage (infinite loops, redundant calls)
* Large component re-renders due to poor state structure

---

### 🧩 Task 2. Refactor Codebase
 
Improve the overall architecture and maintainability.

* Refactoring Goals
* Break large components into smaller reusable components
* Improve project folder structure
* Extract custom hooks, Provvider and context
* Maintain clean and readable code
* Follow consistent naming conventions

---

### 🔄 Task 3. Improve State Management

* Lift state only where necessary
* Use Context to Avoid unnecessary prop drilling 
* Ensure predictable and minimal state updates
* Optimize component rendering flow

---

### Task 4. Redesign UI/UX  

 Styling & Design

# Requirements
 * Use Tailwind CSS or another modern styling solution
 * Ensure full responsiveness
    - Mobile
    - Tablet
    - Desktop
 * Maintain consistent:
   - spacing
   - typography
   - color system
 
transitions
drag feedback
* Use Tailwind CSS for a clean and modern UI
* Ensure full responsiveness (mobile, tablet, desktop)
* Maintain consistent spacing, typography, and color system
* Add subtle animations (hover effects, transitions)

## ⚡ Task 5: Performance Optimization

Improve application performance.

# Focus Areas
   * Lazy load heavy components
   * Avoid unnecessary DOM updates
   * Optimize rendering of lists
   * Use memoization when appropriate
   * Ensure efficient component rendering
♿ Task 6: Accessibility & UX Polish

Improve usability and accessibility.

# Goals
  * Intuitive buttons and actions
  * Clear UI hierarchy
  * Loading states where needed
  * Proper spacing and alignment
  * Accessible interactions

#### Current Problem:

* Basic dropdown-based UI
* Poor usability and interaction

#### Target:

* Replace dropdown flow with drag-and-drop builder with dnd-kit

#### Requirements:

* Use dnd-kit (or a similar drag-and-drop library) to implement:
* Allow users to construct AI agents visually
* Add sidebar with draggable components (e.g., actions, inputs, logic blocks)
* Create canvas area where items can be dropped and arranged
* Provide visual feedback (hover, active states)


---

### 6. Performance Optimization

* Lazy load components where possible
* Avoid unnecessary DOM updates
* Optimize rendering of lists and dynamic components
* Use keys correctly in lists

---

### 7. Accessibility & UX Polish

* Ensure buttons and actions are intuitive
* Add loading states where needed
* Improve form usability
* Maintain proper spacing and alignment

---


## 🤖 AI Tool Usage

The use of AI tools is encouraged.

If you used any tools such as:

* ChatGPT
* Claude
* GitHub Copilot
* Cursor
* Other AI assistants
 

---

## 📌 Deliverables

* Refactored and optimized codebase
* Improved UI with drag-and-drop builder
* Clean component structure
* Performance improvements
* Responsive and polished design
* Clear PR documentation
* CV in the public folder

---

## 📝 Notes

* Focus heavily on the final 20% polish
* Think like a product engineer, not just a coder
* Maintain high attention to detail

---

## 🚀 Goal

Transform this project into a production-quality, visually impressive, and high-performance web application.