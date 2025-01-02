import { Code2, Database, Globe, Lock, Cpu, Layers } from 'lucide-react';
import { BlogPost } from '../../types/blog';

export const techPosts: BlogPost[] = [
  {
    title: "Building scalable APIs with Node.js and TypeScript",
    color: "bg-emerald-600",
    icon: <Code2 className="w-12 h-12 text-white" />,
    content: `# Building Scalable APIs with Node.js and TypeScript

## Introduction

Building scalable APIs requires careful consideration of architecture, performance, and maintainability. Let's explore best practices and patterns.

## Key Principles

1. Modular Architecture
2. Type Safety
3. Error Handling
4. Performance Optimization
5. Testing Strategies

## Code Example

\`\`\`typescript
import express from 'express';
import { validateRequest } from './middleware';

const app = express();

app.use(express.json());
app.use(validateRequest);

app.get('/api/users', async (req, res) => {
  try {
    const users = await UserService.getUsers();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: 'Internal server error' });
  }
});
\`\`\`

## Best Practices

- Use dependency injection
- Implement proper error handling
- Add request validation
- Include comprehensive testing
- Document your API
`
  },
  {
    title: "Creating interactive 3D globes with Three.js",
    color: "bg-indigo-600",
    icon: <Globe className="w-12 h-12 text-white" />,
    content: `# Creating Interactive 3D Globes with Three.js

## Setup

First, install the necessary dependencies:

\`\`\`bash
npm install @react-three/fiber @react-three/drei three
\`\`\`

## Basic Globe Component

\`\`\`typescript
import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function Globe() {
  const meshRef = useRef();
  
  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.1;
    }
  });

  return (
    <mesh ref={meshRef}>
      <sphereGeometry args={[2, 32, 32]} />
      <meshStandardMaterial
        color="#000000"
        metalness={0.2}
        roughness={0.8}
        wireframe
      />
    </mesh>
  );
}
\`\`\`

## Adding Interactivity

\`\`\`typescript
<OrbitControls
  enableZoom={true}
  enablePan={false}
  minDistance={4}
  maxDistance={8}
/>
\`\`\`

## Performance Optimization

1. Use \`useCallback\` for event handlers
2. Implement proper cleanup in \`useEffect\`
3. Use \`useMemo\` for complex calculations
`
  },
  {
    title: "Machine Learning fundamentals for developers",
    color: "bg-rose-600",
    icon: <Cpu className="w-12 h-12 text-white" />,
    content: `# Machine Learning Fundamentals for Developers

## Introduction

Understanding machine learning doesn't have to be complicated. Let's break down the core concepts that every developer should know.

## Key Concepts

1. Supervised vs Unsupervised Learning
2. Training Data
3. Model Selection
4. Evaluation Metrics
5. Deployment Considerations

## Simple Example

\`\`\`python
from sklearn.model_selection import train_test_split
from sklearn.linear_model import LogisticRegression

# Prepare data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)

# Train model
model = LogisticRegression()
model.fit(X_train, y_train)

# Evaluate
accuracy = model.score(X_test, y_test)
print(f"Model accuracy: {accuracy}")
\`\`\`

## Best Practices

- Start simple
- Validate your data
- Use cross-validation
- Monitor performance
- Regular retraining
`
  }
];