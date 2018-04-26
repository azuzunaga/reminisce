import React from 'react';
import { sumBy } from 'lodash';

import '../../styles/diff.css';

class RevisionDiff extends React.Component {
  constructor(props) {
    super(props);
    this.diffRef = React.createRef();
    this.minimapRef = React.createRef();
    this.state = { viewTop: 0, viewHeight: 0 };

    this.adjustWindow = this.adjustWindow.bind(this);
    this.handleMinimapClick = this.handleMinimapClick.bind(this);
  }

  componentDidMount() {
    this.adjustWindow(this.diffRef.current);
  }

  componentDidUpdate(prevProps) {
    if (prevProps === null || prevProps.rev !== this.props.rev) {
      this.adjustWindow(this.diffRef.current);
    }
  }

  adjustWindow(scrollEl) {
    console.log(scrollEl)
    const viewTop = scrollEl.scrollTop / scrollEl.scrollHeight;
    const viewHeight = scrollEl.offsetHeight / scrollEl.scrollHeight;
    this.setState({
      viewTop,
      viewHeight
    });

    const minimap = this.minimapRef.current;

    if (viewTop < minimap.scrollTop / minimap.scrollHeight) {
      minimap.scrollTop = viewTop * minimap.scrollHeight;
    } else if (
      viewTop + viewHeight >
      (minimap.scrollTop + minimap.offsetHeight) / minimap.scrollHeight
    ) {
      minimap.scrollTop =
        (viewTop + viewHeight) * minimap.scrollHeight - minimap.offsetHeight;
    }
  }

  handleMinimapClick(e) {
    const diffEl = this.diffRef.current;
    diffEl.scrollTop =
      e.currentTarget.offsetTop /
      e.currentTarget.parentElement.scrollHeight *
      diffEl.scrollHeight;
  }

  render() {
    // const added = sumBy(rev.diffInfo, op => op.type === 'insert');
    // const addEl = added ? <span className="add">+{added}</span> : "";
    // const deleted = sumBy(rev.diffInfo, op => op.type === 'delete');
    // const deletedEl = deleted ? <span className="delete">-{deleted}</span> : "";
    // const comma = added && deleted ? ", " : "";
    const { rev } = this.props;
    return (
      <div className="revision-diff">
        <ol ref={this.diffRef} onScroll={e => this.adjustWindow(e.target)}>
          {rev.diffInfo.map(op => (
            <li className={op.type} key={`${op.origIdx}:${op.targetIdx}`}>
              <div
                className="content"
                dangerouslySetInnerHTML={{ __html: op.data }}
              />
            </li>
          ))}
        </ol>
        <div className="minimap" ref={this.minimapRef}>
          <div className="container">
            <ol>
              {rev.diffInfo.map(op => (
                <li
                  className={op.type}
                  key={`${op.origIdx}:${op.targetIdx}`}
                  onClick={this.handleMinimapClick}
                >
                  <div
                    className="content"
                    dangerouslySetInnerHTML={{ __html: op.data }}
                  />
                </li>
              ))}
            </ol>
            <div
              style={{
                top: `${this.state.viewTop * 100}%`,
                height: `${this.state.viewHeight * 100}%`
              }}
              className="window-outline"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default RevisionDiff;
