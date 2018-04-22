## Reminisce

### Background and Overview
Reminisce is a web application that lets writers use version control in their documents, while also preserving formatting. Users will be able to “commit” versions of their documents or projects and switch between them. Users can also invite other users to view their documents.

### Functionality and MVP

   * Text editor version control system (text format and changes)
   * Branch and merge commits
   * User commits - with commit messages
   * Auto commits (auto-save with timestamp commit message)
   * Word processor look and base functionality (indent, bold, italics, underline, bulletpoints, headers)
   * User auth
   * Add collaborators - project specific auth set by user

### Bonus features
   
   * Comments
   * Pre-set formats/hot keys (screenplay specific)
   * Offline editing and commiting
   * Live multi-user updates to doc
   * Suggestion mode with auto-comments
   * Visualization of commit histories
   * User show page

### Wireframes

### Technologies and Technical Challenges

Backend: NodeJS/JavaScript/Express
Frontend: React/Redux/JavaScript
Database: MongoDB
Libraries: DraftJS

   * Implementation of the Myers diff algorithm for merges
   * Adapting Git in the backend and api
   * UX
      * Letting user write docs/revert changes/display changes/merge branches
      * Making it intuitive for nontech users
      
 ### Things accomplished this weekend
  
   * Mapped out API calls, schema, Frontend routes, 
   * Set up MongoDB 
   * Begun work on user auth
   * Set up splash page
   * Familiarized ourselves with new technologies
   * Picked our text editor, DraftJS

### Group Members and Work Breakdown

### Implementation Timeline

**Day 1:** 
    * Wrap up UA backend 
    * Finish UA frontend
    * Basic implementation of Mongo tables
**Day 2:**
    * Backend - Ability to commit and checkout past commits, ability to rollback
    * Frontend - Complete the individual document/text editor page
**Day 3:** 
    * Backend - Start branching, merging and diffing
    * Backend - Complete auto-commits (auto-saves done by the system when user is idle or quits out)
    * Frontend - Create ineractive commits page, enable users to click on various commits and see that commit version
**Day 4:**
    * Backend - Complete branching/merging/diffing
    * Frontend - Complete project page (listing of all documents within the project)
    * Frontend - Complete User page (listing all projects that user has access to)
**Day 5:**
    * Backend auth for documentation (allowing for collaborators)
    * Frontend - Displaying branching/merging diffs
    * Finish all MVPs/styling
    * Complete production README
**Day 6 & 7:**
