var Event = React.createClass({
  getInitialState: function() {
    return { edit: false };
  },
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },
  handleToggle: function(e) {
    e.preventDefault();
    this.setState({ edit: !this.state.edit });
  },
  handleUpdate: function(e) {
    e.preventDefault();
    if (this.validRecord()) {
      var event_data = {
        name: this.recordValue("name"),
        description: this.recordValue("description"),
        event_date: this.recordValue("date"),
        place: this.recordValue("place")
      };
      $.ajax({
        method: 'PUT',
        url: '/api/events/' + this.props.event.id,
        data: { event: event_data },
        success: function(data) {
          this.props.handleUpdateRecord(this.props.event, data);
          this.setState({ edit: false });
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot update requested record: ', error);
        }
      });
    } else {
      alert('Please fill all fields.');
    }
  },
  validRecord: function() {
    if (this.recordValue("name") && this.recordValue("place") && this.recordValue("date") && this.recordValue("description")) {
      return true;
    } else {
      return false;
    }
  },
  recordValue: function(field) {
    return ReactDOM.findDOMNode(this.refs[field]).value;
  },
  handleDelete: function(e) {
    e.preventDefault();
    if (confirm("Are you sure to Delete?")) {
      $.ajax({
        method: 'DELETE',
        url: '/api/events/' + this.props.event.id,
        success: function(data) {
          this.props.handleDeleteRecord();
        }.bind(this),
        error: function(xhr, status, error) {
          alert('Cannot delete requested record: ', error);
        }
      });
    }
  },
  renderForm: function() {
    return (
      <div className="row">
        <div className="col-md-3">
          <input name="name"
                 defaultValue={this.props.event.name} 
                 className="form-control"
                 type="text"
                 ref="name" />
        </div>
        <div className="col-md-2">
          <input name="event_date"
                 defaultValue={this.props.event.event_date} 
                 className="form-control"
                 type="date"
                 ref="date" />
        </div>
        <div className="col-md-3">
          <input name="place"
                 defaultValue={this.props.event.place} 
                 className="form-control"
                 type="text"
                 ref="place" />
        </div>
        <div className="col-md-3">
          <input name="description"
                 defaultValue={this.props.event.description} 
                 className="form-control"
                 type="text"
                 ref="description" />
        </div>
        <div className="col-md-1 mt-3">
          <a className="mx-1" onClick={this.handleUpdate}><i className="fa fa-check green-text px-1"></i></a>
          <a className="mx-1" onClick={this.handleToggle}><i className="fa fa-times grey-text px-1"></i></a>
        </div>
      </div>
    )
  },
  renderRecord: function() {
    var event = this.props.event;
    return(
      <div className="row">
        <div className="col-md-3">{event.name}</div>
        <div className="col-md-2">{event.event_date}</div>
        <div className="col-md-3">{event.place}</div>
        <div className="col-md-3">{event.description}</div>
        <div className="col-md-1">
          <a className="mx-1" onClick={this.handleToggle}><i className="fa fa-pencil blue-text px-1"></i></a>
          <a className="mx-1" onClick={this.handleDelete}><i className="fa fa-trash-o red-text px-1"></i></a>
        </div>
      </div>
    )
  },
  render: function() {
    if (this.state.edit) {
      return (this.renderForm());
    } else {
      return (this.renderRecord());
    }
  }
});