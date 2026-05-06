# Dynamic Questionnaire Engine

![NestJS](https://img.shields.io/badge/NestJS-E0234E?style=for-the-badge&logo=nestjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Swagger](https://img.shields.io/badge/Swagger-85EA2D?style=for-the-badge&logo=swagger&logoColor=black)

A production-oriented, rule-based dynamic questionnaire and workflow engine built with NestJS and MongoDB.

This project demonstrates complex workflow execution, conditional branching, nested loops, session tracking, history navigation, and dynamic question resolution using scalable backend architecture.

---

# Why This Project?

This project was built to demonstrate how workflow-driven systems dynamically manage user journeys using:
- rule evaluation
- conditional branching
- nested loops
- session state management
- dynamic execution flows

It simulates real-world onboarding and workflow engines commonly used in hiring, onboarding, and form automation systems.

---

# 🚀 Features

- Rule-based questionnaire execution
- Dynamic next question resolution
- Skip logic evaluation engine
- Nested loop handling
- Session persistence and tracking
- Question history navigation
- Modular NestJS architecture
- Swagger API documentation
- Environment-driven configuration
- DTO validation and scalable backend structure

---

# 📂 Project Structure

```text
src/
 ├── questionnaire/    # Questionnaire definitions
 ├── session/          # Session tracking & answers
 ├── execution/        # Dynamic flow execution
 ├── rule-engine/      # Rule evaluation logic
 ├── common/           # Shared utilities
 ├── config/           # Environment configuration
 ├── app.module.ts
 └── main.ts
```

---

# ⚙️ Architecture Flow

```text
Questionnaire Definition
        ↓
Session Initialization
        ↓
User Answer Submission
        ↓
Execution Engine
        ↓
Rule Evaluation
        ↓
Loop Resolution
        ↓
Next Question Resolution
        ↓
Session Update + History Tracking
```

---

# ⚙️ Execution Flow

```text
User Answer
    ↓
Save Session State
    ↓
Evaluate Skip Logic
    ↓
Resolve Next Question
    ↓
Check Loop Conditions
    ↓
Return Next Valid Question
```

---

# 🧠 Rule Engine

The Rule Engine evaluates dynamic conditions to control questionnaire flow.

## Supported Operators

- `equals`
- `not_equals`
- `contains`
- `in`
- `greater_than`
- `less_than`

---

## Example Rule

```json
{
  "field": "experience_years",
  "operator": "greater_than",
  "value": 5
}
```

---

# 🔄 Dynamic Flow & Loops

## Skip Logic

Allows conditional branching between questions.

### Example
If user experience is less than 1 year:
- skip advanced questions
- redirect to final section

---

## Nested Loops

Supports repeated question groups.

### Example Use Case
Collect employment history for multiple companies dynamically.

### Example Loop Flow

```text
How many companies worked at?
          ↓
Repeat employment questions N times
          ↓
Continue workflow
```

---

# 🗂 Session Tracking

The Session Module manages:
- current question state
- answer persistence
- navigation history
- loop iteration tracking

---

# 🔙 History Navigation

The engine maintains a history stack for:
- back navigation
- restoring previous state
- revisiting earlier questions safely

---

# 🛠 Tech Stack

| Layer | Technology |
|---|---|
| Backend Framework | NestJS |
| Database | MongoDB + Mongoose |
| Language | TypeScript |
| Documentation | Swagger |
| Validation | class-validator |

---

# 🛠 Setup Instructions

## 1. Clone Repository

```bash
git clone https://github.com/Im-Ankush/dynamic-questionnaire-engine.git
cd dynamic-questionnaire-engine
```

---

## 2. Install Dependencies

```bash
npm install
```

---

## 3. Environment Configuration

Create a `.env` file:

```env
PORT=3000
MONGODB_URI=mongodb://localhost:27017/dynamic-questionnaire-engine
```

---

## 4. Run Application

### Development Mode

```bash
npm run start:dev
```

---

# 📖 Swagger Documentation

Swagger UI available at:

```bash
http://localhost:3000/api/docs
```

---

# 📡 API Endpoints

## Questionnaires

### Create Questionnaire

```http
POST /questionnaires
```

### Get Questionnaires

```http
GET /questionnaires
```

### Get Questionnaire By ID

```http
GET /questionnaires/:id
```

---

## Sessions

### Start Session

```http
POST /sessions/start
```

### Submit Answer

```http
POST /sessions/:id/answer
```

### Navigate Back

```http
POST /sessions/:id/back
```

### Get Session State

```http
GET /sessions/:id
```

---

# 📝 Example Questionnaire Payload

```json
{
  "title": "Onboarding Workflow",
  "questions": [
    {
      "questionId": "q1",
      "title": "What is your name?",
      "type": "text",
      "order": 1
    },
    {
      "questionId": "q2",
      "title": "How many years of experience do you have?",
      "type": "number",
      "order": 2,
      "skipLogic": {
        "field": "q2",
        "operator": "less_than",
        "value": 1,
        "jumpToQuestionId": "q_end"
      }
    },
    {
      "questionId": "q_end",
      "title": "Thank you for your time!",
      "type": "text",
      "order": 3
    }
  ]
}
```

---

# 🚀 Future Improvements

- Visual workflow builder
- Redis-based session caching
- Event-driven execution engine
- Real-time collaborative workflows
- Workflow analytics dashboard
- Multi-language questionnaire support

---

# 📸 Screenshots

## Swagger API Documentation

_Add screenshot here_

---

## Questionnaire Execution Response

_Add screenshot here_

---

# 🎯 Learning Outcomes

This project demonstrates:
- Rule engine implementation
- Dynamic workflow execution
- Nested loop handling
- Session state management
- Conditional branching systems
- Scalable backend architecture
- Production-oriented NestJS design

---

# License

MIT

---

Built with ❤️ for High-Scale Backend .