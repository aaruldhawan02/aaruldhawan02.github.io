# Portfolio Website Project Outline

## File Structure

### Core HTML Pages

#### index.html - Landing Page & Portfolio Overview
**Purpose**: First impression, hero introduction, and portfolio highlights
**Content Sections**:
- Navigation bar with smooth scroll links
- Hero section with animated background and typewriter introduction
- Brief professional summary with key metrics (GPA, experience count, technologies)
- Featured projects carousel with 3-4 best projects
- Skills visualization dashboard (interactive radar chart)
- Call-to-action directing to experience and projects pages
- Footer with contact links

#### experience.html - Professional Experience Timeline
**Purpose**: Detailed work history with interactive timeline
**Content Sections**:
- Navigation bar
- Page header with professional tagline
- Interactive timeline component:
  - AWS SDE Intern (May-Aug 2025)
  - Epivara Software Engineer Intern (Sept 2024-Jan 2025)
  - Epic Systems Software Developer Intern (May-Aug 2024)
  - Disruption Lab Software Engineer (Aug 2023-May 2024)
  - TechSur Solutions Software Developer Intern (Jun-Aug 2023)
- Each timeline node expands to show detailed achievements
- Company logos and technology tags for each position
- Download resume button
- Footer

#### projects.html - Project Showcase Gallery
**Purpose**: Comprehensive project portfolio with filtering
**Content Sections**:
- Navigation bar
- Page header with project overview
- Filter controls by technology stack:
  - All, Python, React, Rust, Java, C++, ML/AI, Web Development
- Project grid with 6+ projects:
  - Arcade Karaoke (AWS Award Winner)
  - Learning Management Assignment Collector (LeMAC)
  - Additional projects from experience sections
- Search functionality for project names
- Modal popups with detailed project information
- GitHub links and live demos where applicable
- Footer

#### contact.html - Contact & Professional Links
**Purpose**: Professional contact form and networking links
**Content Sections**:
- Navigation bar
- Contact form with validation:
  - Name, Email, Subject (dropdown), Message
  - Real-time validation feedback
- Professional summary and availability
- Social links (LinkedIn, GitHub, Email)
- Location information
- Response time expectations
- Footer

### JavaScript Files

#### main.js - Core Functionality
**Purpose**: Initialize components and handle navigation
**Functions**:
- Smooth scrolling for navigation links
- Mobile menu toggle
- Initialize all interactive components
- Handle page transitions
- Scroll progress indicator

#### components.js - Interactive Components
**Purpose**: Modular component definitions
**Components**:
- `initializeTimeline()` - Interactive experience timeline
- `initializeProjectFilters()` - Project filtering and search
- `initializeSkillsChart()` - Skills visualization dashboard
- `initializeContactForm()` - Contact form validation and submission
- `initializeAnimations()` - Scroll-triggered animations

#### utils.js - Utility Functions
**Purpose**: Helper functions and shared utilities
**Functions**:
- `debounce()` - For search and filter optimization
- `formatDate()` - Date formatting for timeline
- `validateEmail()` - Email validation helper
- `showNotification()` - Toast notifications
- `downloadResume()` - Resume download handler

### Resource Assets

#### resources/ - Media and Static Files
**Contents**:
- hero-bg.jpg - Generated hero background image
- profile-photo.jpg - Professional headshot (generated)
- company-logos/ - AWS, Epic, UIUC logos
- tech-icons/ - Programming language and framework icons
- project-screenshots/ - Project demo images (generated)
- resume.pdf - Downloadable resume file

### Styling Approach

#### Embedded CSS Strategy
- All styles embedded in HTML files using `<style>` tags
- Consistent design system across all pages
- Mobile-first responsive design
- Dark theme with amber/sage accent colors
- Tailwind CSS as base framework
- Custom CSS for animations and effects

## Page-Specific Functionality

### Index Page Interactions
1. **Typewriter Animation**: Hero text types out on page load
2. **Skills Radar Chart**: Interactive visualization of technical skills
3. **Project Carousel**: Auto-scrolling showcase of featured projects
4. **Background Animation**: Subtle network topology visualization

### Experience Page Interactions
1. **Timeline Navigation**: Click nodes to expand/collapse details
2. **Company Logo Display**: Visual brand recognition
3. **Achievement Highlighting**: Key metrics and accomplishments
4. **Technology Tags**: Visual representation of tools used

### Projects Page Interactions
1. **Technology Filtering**: Real-time filtering by tech stack
2. **Search Functionality**: Text-based project search
3. **Project Modals**: Detailed view with descriptions and links
4. **Hover Effects**: 3D card tilts and information reveals

### Contact Page Interactions
1. **Form Validation**: Real-time input validation
2. **Subject Dropdown**: Categorized inquiry types
3. **Success States**: Confirmation messages
4. **Social Link Integration**: Direct links to professional profiles

## Technical Implementation Notes

### Libraries Integration
- **Anime.js**: Page transitions and micro-interactions
- **ECharts.js**: Skills radar chart and data visualization
- **Typed.js**: Hero section typewriter effect
- **Splide.js**: Project carousel functionality
- **p5.js**: Background network animation
- **Shader-park**: Ambient background effects

### Performance Considerations
- Lazy loading for images and heavy components
- Optimized animations with requestAnimationFrame
- Compressed images and assets
- Minimal JavaScript bundle size
- Progressive enhancement approach

### Accessibility Features
- Keyboard navigation support
- Screen reader compatible
- High contrast color ratios (4.5:1+)
- Focus indicators for interactive elements
- Semantic HTML structure