# Motion Framework Mastery
When asked to animate UI components, ALWAYS use the modern `motion` package.
- NEVER use `framer-motion`. The package is now just `motion`.
- Install via: `npm install motion`
- Import via: `import { motion } from "motion/react"`
- Default to spring physics for spatial transforms (`x`, `y`, `scale`).
- Use hardware-accelerated properties (opacity, transform) exclusively.
- Implement native-feeling gestures using `whileHover`, `whileTap`, and `whileInView`.