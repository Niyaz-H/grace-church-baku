# The Roo AI Development Cycle: An Interactive Workflow

This document outlines a structured, interactive workflow for building applications with a Roo Code AI agent. Inspired by the methods of successful AI-assisted developers, this process emphasizes clarity, context, and control to ensure you build the right features, efficiently and reliably.

The workflow is broken down into three conversational phases.

```mermaid
graph TD
    subgraph "Phase 1: PRD Conversation"
        A[1. User provides a high-level feature idea using a simplified brief] --> B{2. Roo, acting as a Product Manager, asks clarifying questions};
        B --> C[3. User answers the questions];
        C --> D[4. Roo generates a detailed PRD and saves it as `prd-feature-name.md`];
    end

    subgraph "Phase 2: Task Breakdown"
        D --> E[5. User asks Roo to break down the PRD into tasks];
        E --> F{6. Roo creates a detailed, step-by-step task list with checkboxes};
        F --> G[7. Roo saves the list as `tasks-feature-name.md`];
    end

    subgraph "Phase 3: Iterative Implementation"
        G --> H[8. User asks Roo to begin work];
        H --> I{9. Roo completes the first sub-task};
        I --> J[10. Roo marks the task as complete, shows the changes, and waits for confirmation];
        J --> K{11. User reviews and says "proceed"};
        K --> I;
        J --> L[12. All tasks are completed];
    end
```

---

## Phase 1: The PRD Conversation

**Goal:** To collaboratively create a clear Product Requirements Document (PRD) that defines the feature, its purpose, and its requirements.

### **Step 1: Provide the Initial Brief**
Start by giving the Roo agent a high-level overview of your feature idea. Use the simplified `project_brief_template.md` for this.

### **Step 2: The Clarification Dialogue**
Next, use the following prompt to have the AI ask you clarifying questions. This is the most critical step for providing context.

**User Prompt:**
```
Based on the brief I provided, please act as a Product Manager. Ask me clarifying questions to help you write a detailed Product Requirements Document (PRD). The PRD should be suitable for a junior developer to understand and implement. Ask about the problem, users, success metrics, and any technical constraints.
```

### **Step 3: Generate the PRD**
After you've answered the questions, the AI will have the context it needs. Use this prompt to generate the final PRD.

**User Prompt:**
```
Thank you. Based on our conversation, please now generate the complete PRD for the [Your Feature Name] feature. Save it to a file named `prd-[your-feature-name].md`.
```

---

## Phase 2: The Task Breakdown

**Goal:** To convert the high-level PRD into a detailed, step-by-step engineering task list.

### **Step 4: Generate the Task List**
Now that you have a PRD, ask the Roo agent to break it down into a checklist.

**User Prompt:**
```
Please act as a Senior Engineer. Read the attached PRD (`prd-[your-feature-name].md`). Create a detailed, step-by-step task list required to build this feature. The list should be in Markdown format with checkboxes. Include parent tasks and sub-tasks. Save it to a file named `tasks-[your-feature-name].md`.
```

---

## Phase 3: Iterative Implementation

**Goal:** To code the feature, one sub-task at a time, with you in full control.

### **Step 5: Begin the Work**
This is where the coding begins. The AI will work through the checklist you just created, stopping for your approval at each step.

**User Prompt:**
```
Let's start working on the tasks. Please follow these rules:
1.  Complete only ONE sub-task at a time.
2.  After you finish a sub-task, immediately mark it as complete in the task list file.
3.  Show me the changes you made (e.g., the diff).
4.  Stop and wait for me to say "proceed" before starting the next sub-task.

Begin with the first sub-task in `tasks-[your-feature-name].md`.
```

### **Step 6: Review and Proceed**
After each sub-task, the AI will pause. Review the changes it made. If you're happy, simply respond with:

**User Prompt:**
```
proceed
```
If you're not happy, provide corrective feedback. The AI will attempt the task again. Continue this cycle until all tasks are complete.