import React from 'react';
import { sumBy } from 'lodash';

import '../../styles/diff.css';

class RevisionDiff extends React.Component {
  constructor(props) {
    super(props);
    this.diffRef = React.createRef();
    this.minimapRef = React.createRef();
    this.state = { viewTop: 0, viewHeight: 0 };
  }

  componentDidMount() {
    // this.diffRef.addEventListener('scroll', this.handleScroll);
    // this.minimapRef.addEventListener('click', this.handleMinimapClick);
  }
  //
  // componentWillUnMount() {
  //   this.diffRef.removeEventListener('scroll', this.handleScroll);
  //   this.minimapRef.removeEventListener('click', this.handleMinimapClick);
  // }

  handleScroll(e) {
    const viewTop = e.target.scrollTop / e.target.scrollHeight;
    const viewHeight = e.target.offsetHeight / e.target.scrollHeight;
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

  render() {
    // const added = sumBy(rev.diffInfo, op => op.type === 'insert');
    // const addEl = added ? <span className="add">+{added}</span> : "";
    // const deleted = sumBy(rev.diffInfo, op => op.type === 'delete');
    // const deletedEl = deleted ? <span className="delete">-{deleted}</span> : "";
    // const comma = added && deleted ? ", " : "";
    const { rev } = this.props;
    return (
      <div className="revision-diff">
        <ol ref={this.diffRef} onScroll={this.handleScroll.bind(this)}>
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
                <li className={op.type} key={`${op.origIdx}:${op.targetIdx}`}>
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
