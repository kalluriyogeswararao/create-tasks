import {Component} from 'react'
import {v4 as uuidV4} from 'uuid'
import './App.css'

const tagsList = [
  {
    optionId: 'HEALTH',
    displayText: 'Health',
  },
  {
    optionId: 'EDUCATION',
    displayText: 'Education',
  },
  {
    optionId: 'ENTERTAINMENT',
    displayText: 'Entertainment',
  },
  {
    optionId: 'SPORTS',
    displayText: 'Sports',
  },
  {
    optionId: 'TRAVEL',
    displayText: 'Travel',
  },
  {
    optionId: 'OTHERS',
    displayText: 'Others',
  },
]

const TagItem = props => {
  const {tagDetails, filterItem, isActive} = props
  const {displayText, optionId} = tagDetails
  const activeBtn = isActive ? 'active-btn' : 'tag-button'

  const onClickSelect = () => {
    filterItem(optionId)
  }

  return (
    <li className="each-tag">
      <button type="button" className={activeBtn} onClick={onClickSelect}>
        {displayText}
      </button>
    </li>
  )
}

class App extends Component {
  state = {
    activeId: tagsList[0].optionId,
    inputText: '',
    tagList: [],
    filterId: '',
    filterListData: [],
  }

  onChangeOptionId = event => {
    this.setState({activeId: event.target.value})
  }

  onChangeTaskName = event => {
    this.setState({inputText: event.target.value})
  }

  filterItem = id => {
    const {tagList, filterId} = this.state
    const filterList = tagList.filter(tagData => tagData.optionId === id)
    console.log(filterList)
    this.setState({filterListData: filterList})

    if (filterId !== id) {
      this.setState({filterId: id})
    } else {
      this.setState({filterId: ''})
    }
  }

  onSubmitDetails = event => {
    event.preventDefault()
    const {activeId, inputText} = this.state
    const findTag = tagsList.find(tag => tag.optionId === activeId)
    const newTask = {
      id: uuidV4(),
      taskTitle: inputText,
      tagName: findTag.displayText,
      optionId: findTag.optionId,
    }
    this.setState(prevState => ({
      tagList: [...prevState.tagList, newTask],
      activeId: tagsList[0].optionId,
      inputText: '',
    }))
  }

  onRenderDisplayAllTags = () => {
    const {tagList, filterListData, filterId} = this.state
    const displayList = filterId !== '' ? filterListData : tagList

    return (
      <ul className="all-tags-list">
        {displayList.map(eachTag => (
          <li className="each-tag-details" key={eachTag.id}>
            <p className="tag-title">{eachTag.taskTitle}</p>
            <p className="tag-btn">{eachTag.tagName}</p>
          </li>
        ))}
      </ul>
    )
  }

  noTagsDisplay = () => (
    <div className="no-tags-container">
      <p className="tasks-heading">No Tasks Added Yet</p>
    </div>
  )

  onDisplayTags = () => {
    const {tagList} = this.state
    if (tagList.length > 0) {
      return this.onRenderDisplayAllTags()
    }
    return this.noTagsDisplay()
  }

  onDisplayResultDetails = () => {
    const {filterId} = this.state

    return (
      <div className="results-bg-container">
        <h1 className="tags-heading">Tags</h1>
        <ul className="all-button">
          {tagsList.map(item => (
            <TagItem
              tagDetails={item}
              key={item.optionId}
              filterItem={this.filterItem}
              isActive={filterId === item.optionId}
            />
          ))}
        </ul>
        <h1 className="tasks-heading">Tasks</h1>
        {this.onDisplayTags()}
      </div>
    )
  }

  render() {
    const {activeId, inputText} = this.state
    return (
      <div className="bg-container">
        <div className="input-bg-container">
          <h1 className="main-heading">Create a task!</h1>
          <form className="form-container" onSubmit={this.onSubmitDetails}>
            <div className="label-input-container">
              <label htmlFor="task" className="label">
                Task
              </label>
              <input
                type="text"
                id="task"
                className="input"
                placeholder="Enter the task here"
                onChange={this.onChangeTaskName}
                value={inputText}
              />
            </div>
            <div className="label-input-container">
              <label htmlFor="tags" className="label">
                Tags
              </label>
              <select
                id="tags"
                className="input"
                value={activeId}
                onChange={this.onChangeOptionId}
              >
                {tagsList.map(each => (
                  <option value={each.optionId} key={each.optionId}>
                    {each.displayText}
                  </option>
                ))}
              </select>
            </div>
            <button type="submit" className="button">
              Add Task
            </button>
          </form>
        </div>
        {this.onDisplayResultDetails()}
      </div>
    )
  }
}

export default App
