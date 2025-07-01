# Roo AI Development Cycle: An Overview

This document provides a high-level overview of the new, interactive workflow for developing applications with a Roo AI agent. The process is designed to be a structured conversation, ensuring clarity and control at each stage.

The workflow is divided into three distinct phases:

### Phase 1: PRD Conversation
The goal of this phase is to collaboratively define the "what" and "why" of a feature.
1.  **User Provides Brief:** The user starts with a simple "Feature Idea Brief," outlining the basic goal and user stories.
2.  **AI Asks Questions:** The Roo agent, acting as a Product Manager, asks clarifying questions to fill in any gaps.
3.  **AI Generates PRD:** Based on the conversation, the agent generates a detailed Product Requirements Document (PRD).

### Phase 2: Task Breakdown
This phase translates the PRD into an actionable engineering plan.
1.  **User Requests Tasks:** The user asks the agent to break down the PRD.
2.  **AI Generates Task List:** The agent, now acting as a Senior Engineer, creates a detailed, step-by-step task list with checkboxes in a markdown file.

### Phase 3: Iterative Implementation
This is the coding phase, where the feature is built one piece at a time.
1.  **User Initiates Work:** The user gives the agent the command to start, along with a set of rules for the process.
2.  **AI Completes One Sub-Task:** The agent executes the first sub-task on the list.
3.  **AI Pauses for Review:** The agent marks the task as complete, shows the changes, and waits for the user's approval.
4.  **User Approves:** The user reviews the work and says "proceed." This loop continues until all tasks are completed.

This iterative, human-in-the-loop process ensures the final product is built correctly and according to specification, minimizing rework and maximizing efficiency.