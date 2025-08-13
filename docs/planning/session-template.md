## AI Session Context Management Strategy

### Session Startup Protocol
#### AI Pre-Session Preparation
1. AI reads `current-state.md` for immediate context
2. AI scans `learning-progress.md` for skill level
3. AI reviews last session log for continuity

#### Developer Pre-Session Preparation
1. Review previous session notes
2. Identify specific questions
3. Set up development environment
4. Begin session-log-[N] with [Date/Number] 

#### Developer and AI Pre-Session Preparation
1. **Context Review**: Context review with AI - review current-state.md and learning-progress.md - discuss unresolved issues, potential knowledge gaps, and possible next steps
2. **Establish Learning Target** Developer and AI determine primary learning goal for this session
3. **Specify Outcomes**: Developer and AI determine desired outcomes of this session
    - Developer documents learning goal and desired outcome in session-log-[N]

## Session Protocols
### Most Effective Approaches
- **Chunked explanations**: 5-15 lines of code with before/after explanation
- **Immediate testing**: See results after each small change
- **Experimentation encouraged**: Commenting out code to see differences
- **Understanding verification**: Explaining concepts back to confirm comprehension

### Less Effective Approaches
- Large code blocks without explanation
- Copy-paste without typing
- Moving forward before understanding current piece
- Abstract explanations without concrete examples

## Session Wrap Up
**AI Summary**: 
- **Files Modified**: [Specific files]
- **Concepts Covered**: [List of concepts covered in session]
- **Code Snippets**: [if applicable, related code snippets from project that demonstrate the above concept(s)]
- **Questions and Clarifications**: [List of developer questions, insights, and important clarifications]
- **Recommendations**: [List of recommendations for next steps, concepts to practice, examples or resources to review]

**Developer Documentation**
- **Update Session Log**: [Complete session log with actual outcome(s), key concepts, questions, notes, and next steps]
- **Include Code Examples**: [Reference specific code from project to demonstrate concepts learned]

### Context Handoff Between Sessions
**AI Updates**: 
- **Verify current date with developer before updating documentation.**
- Update `current-state.md` with session outcomes
- Log new concepts in `learning-progress.md`
- Review developer-created session log; suggest modifications if applicable

### Avoiding Context Bloat
- Keep current-state.md under 500 words
- Archive old session logs after 5 sessions
- Update rather than append to progress trackers
- Use references to detailed docs rather than copying content