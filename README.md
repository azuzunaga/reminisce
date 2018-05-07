## Reminisce

[Live Site!](https://reminisce-app.herokuapp.com/)

### Background and Overview
Reminisce is essentially a "GitHub for Writers" built using the MERN stack -- MongoDb, Express.js, React, and Node.js. We created our own version control system and text editor and combined them into a single application that enables users to write, commit their progress, and toggle between multiple drafts (e.g. for alternate endings). 

We enabled writers to execute complex version control actions by recreating the committing and branching workflows natively and simplifying processes by removing the use of terminal and using custom React modals in its place. We used Myers' diff algorithm to identify the text differences between commits and branches. 


## Contents
* [Technologies Used](#technologies-used)
* [Features](#features)
* [Code Highlights](#code-highlights)
* [Planned Work](#planned-work)


## Technologies Used

#### Backend
* Backend Framework: Node/Express (v8.11.1/v4.16.13)
* Database: MongoDB (v3.0.6)
* User Authentication: Google OAuth

#### Frontend
* Frontend Framework: React/Redux (v16.3.2/v4.0.0)
* Notable React Library: DraftJs
* Styling: HTML5/CSS3

## Features

#### Splash Page
Users must log in in order to access the site. Users can log in via Google OAuth.
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

#### Save History Modal
Log of past saves (commits). When clicking on a specific save, a modal will pop up with the differentials between the current save and the save immediately prior. There will be a mini map with green and red highlights where users can jump to the sections of the document that changed.

![Save History Modal with Diffs](https://res.cloudinary.com/deor0br3s/image/upload/v1524498405/Screen_Shot_2018-04-23_at_8.46.08_AM.png)


#### Resolve Conflicts from Merging Drafts
Once the user decides to combine two drafts, if there are any merge conflicts (same paragraph was changed in both drafts), the conflicting paragraph will be displayed for the user to decide which version to keep. In the resolve conflicts modal, paragarphs before and after the conflict will be included for context.

![Resolve Conflicts Modal](https://res.cloudinary.com/deor0br3s/image/upload/v1525732048/image.png)



## Code Highlights

#### Applying Myers' Diff Algorithm for text diffing 

To find and display the diffing for the user, we used Myers' algorithm to find the "shortest edit" from the one commit version to another. 

``` javascript 
const shortestEdit = (original, target) => {
  const [n, m] = [original.length, target.length];
  const max = n + m;
  const trace = [[0]];
  let originalIdx, targetIdx;

  for (let edits = 0; edits <= max; edits++) {
    const v = [];
    const prev = trace[trace.length - 1];

    for (let deletes = 0; deletes <= edits; deletes++) {
      if (
        deletes === 0 ||
        (deletes !== edits && prev[deletes - 1] < prev[deletes])
      ) {
        originalIdx = prev[deletes];
      } else {
        originalIdx = prev[deletes - 1] + 1;
      }

      targetIdx = originalIdx - (2 * deletes - edits);

      while (
        originalIdx < n &&
        targetIdx < m &&
        original[originalIdx] === target[targetIdx]
      ) {
        originalIdx++;
        targetIdx++;
      }

      v.push(originalIdx);

      if (originalIdx >= n && targetIdx >= m) {
        return trace;
      }
    }
    trace.push(v);
  }
};

const backtrack = (original, target) => {
  const result = [];
  const trace = shortestEdit(original, target);
  let [originalIdx, targetIdx] = [original.length, target.length];

  for (let edits = trace.length - 1; edits >= 0; edits--) {
    const row = trace[edits];
    const deletes = (originalIdx - targetIdx + edits) / 2;
    let prevDeletes;
    if (
      deletes === 0 ||
      (deletes !== edits && row[deletes - 1] < row[deletes])
    ) {
      prevDeletes = deletes;
    } else {
      prevDeletes = deletes - 1;
    }

    const prevOriginalIdx = row[prevDeletes];
    const prevTargetIdx = prevOriginalIdx - (2 * prevDeletes - edits + 1);

    while (originalIdx > prevOriginalIdx && targetIdx > prevTargetIdx) {
      result.push([originalIdx - 1, targetIdx - 1, originalIdx, targetIdx]);
      originalIdx--;
      targetIdx--;
    }
    if (edits > 0) {
      result.push([prevOriginalIdx, prevTargetIdx, originalIdx, targetIdx]);
    }
    [originalIdx, targetIdx] = [prevOriginalIdx, prevTargetIdx];
  }
  return result;
};

const diffRevisions = (original, target) => {
  const result = [];

  for (const [
    prevOriginalIdx,
    prevTargetIdx,
    originalIdx,
    targetIdx
  ] of backtrack(original, target)) {
    if (originalIdx === prevOriginalIdx) {
      result.push({
        type: 'insert',
        data: target[prevTargetIdx],
        origIdx: originalIdx - 1,
        targetIdx: prevTargetIdx + 1
      });
    } else if (targetIdx === prevTargetIdx) {
      result.push({
        type: 'delete',
        data: original[prevOriginalIdx],
        origIdx: prevOriginalIdx + 1,
        targetIdx: targetIdx - 1
      });
    } else {
      result.push({
        type: 'none',
        data: original[prevOriginalIdx],
        origIdx: prevOriginalIdx + 1,
        targetIdx: prevTargetIdx + 1
      });
    }
  }

  result.reverse();
  return result;
};

```

#### 


## Planned Work
* User Show Page with statistics
* Add collaborators
* Enable comments
