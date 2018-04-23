## Reminisce

### Background and Overview
Reminisce is a web application that lets writers use version control in their documents, while also preserving formatting. Users will be able to “commit” versions of their documents or projects and switch between them. Users can also invite other users to view their documents.

### Functionality and MVP

   * Text editor version control system (text format and changes)
   * Create and merge branches (drafts)
   * User commits (saves) - with commit messages
   * Auto commits (auto-saves)
   * Word processor look and base functionality (indent, bold, italics, underline, bulletpoints, headers)
   * User auth with Google OAuth
   * Add collaborators - project specific auth set by user

### Bonus features
   * Auth: add OAuth providers and allow for custom auth
   * Add comments to documents
   * Pre-set format (e.g. screenplay specific)
   * Hotkeys for editor control
   * Offline editing and committing
   * Live multi-user updates to doc
   * Suggestion mode with auto-comments
   * Visualization of commit histories
   * User show page

### Wireframes

#### Splash Page
Users must log in in order to access the site:
![Splash Page](https://res.cloudinary.com/deor0br3s/image/upload/v1524498422/Screen_Shot_2018-04-23_at_8.29.12_AM.png)

#### Projects Dashboard
Once logged in, user will be presented with all projects that they've created or have been added as a collaborator on.
![Projects Dashboard](https://res.cloudinary.com/deor0br3s/image/upload/v1524498405/Screen_Shot_2018-04-23_at_8.45.39_AM.png)


#### Project Show Page
List of documents that pertain to the selected project. On this page, users can:
 * Toggle between different drafts (branches)
 * Click a specific document to edit
 * Go to the save history page for a history of saves for the project. 
 * Save the current project draft (commit)
 
![Project Show Page](https://res.cloudinary.com/deor0br3s/image/upload/v1524498405/Screen_Shot_2018-04-23_at_8.45.47_AM.png)


#### Document Editor
Editing a specific document. Users will be spending the bulk of their time on this page. They can save this page directly, or toggle between past drafts as well. 

![Document Editor Page](https://res.cloudinary.com/deor0br3s/image/upload/v1524498405/Screen_Shot_2018-04-23_at_8.45.53_AM.png)

#### Save History Page
Log of past saves (commits). When clicking on a specific save, a modal will pop up with the differentials between the current save and the save immediately prior. There will be a mini map with green and red highlights where users can jump to the sections of the document that changed.

![Save History Page](https://res.cloudinary.com/deor0br3s/image/upload/v1524498405/Screen_Shot_2018-04-23_at_8.46.02_AM.png)

![Save History Modal with Diffs](https://res.cloudinary.com/deor0br3s/image/upload/v1524498405/Screen_Shot_2018-04-23_at_8.46.08_AM.png)

#### Additional Wireframes Coming Soon
* Combine Drafts Page (merging branches)
* About Us page


### Technologies and Technical Challenges

Backend: NodeJS/JavaScript/Express
Frontend: React/Redux/JavaScript
Database: MongoDB
Libraries: DraftJS

  #### Implementation of the Myers diff algorithm for merges
    * JS implementation
    * Determining / resolving conflicts

  #### Adapting Git in the backend and api
    * Compressing commits from client and reconstructing them on the server
    * Commits impact the whole database

  #### UX
    * Letting users compare conflicts and select which version to keep
    * Letting users write docs/revert changes/display changes/merge branches
    * Making it intuitive for non-tech savvy users

 ### Things accomplished this weekend

   * Mapped out API calls, schema, Frontend routes, wireframes
   * Set up MongoDB for user auth
   * Begun work on user auth
   * Familiarized ourselves with new technologies
   * Picked our text editor, DraftJS
   * Implemented diffing algorithm using JS

### Group Members and Work Breakdown
  **Kimberly Allgeier, Gabriel Talavera, Ian MacLeod, Americo Zuzunaga**

### Implementation Timeline

  * **Day 1:**
     * Wrap up UA backend - *AZ*
     * Finish UA frontend - *GT*
     * Basic implementation of Mongo tables - *IM*
     * Splash page - *KA*
  *  **Day 2:**
     * Backend - Ability to commit and checkout past commits, ability to rollback
     * Frontend - Complete the individual document/text editor page
  * **Day 3:**
     * Backend - Start branching, merging and diffing
     * Backend - Complete auto-commits (auto-saves done by the system when user is idle or quits out)
     * Frontend - Create interactive commits page, enable users to click on various commits and see that commit version
  * **Day 4:**
     * Backend - Complete branching/merging/diffing
     * Frontend - Complete project page (listing of all documents within the project)
     * Frontend - Complete User page (listing all projects that user has access to)
  * **Day 5:**
     * Backend auth for documentation (allowing for collaborators)
     * Frontend - Displaying branching/merging diffs
     * Finish all MVPs/styling
     * Complete production README
  * **Day 6 & 7:**
     * Implement bonus features
