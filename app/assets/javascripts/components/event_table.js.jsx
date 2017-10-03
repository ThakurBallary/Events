var EventTable = React.createClass({
  handleUpdateRecord: function(old_event, event) {
    this.props.handleUpdateRecord(old_event, event);
  },
  handleDeleteRecord: function(event) {
    this.props.handleDeleteRecord(event);
  },
  render: function() {
    var events = [];
    this.props.events.forEach(function(event) {
      events.push(<Event event={event}
                         key={'event' + event.id}
                         handleUpdateRecord={this.handleUpdateRecord}
                         handleDeleteRecord={this.handleDeleteRecord} />);
    }.bind(this));
    return(
      <div className="list">
        <div className="list-head row">
          <div className="col-md-2">Name</div>
          <div className="col-md-2">Date</div>
          <div className="col-md-3">Place</div>
          <div className="col-md-3">Description</div>
          <div className="col-md-2">Actions</div>
        </div>
        <div className="list-body">
          {events}
        </div>
      </div>
    )
  }
});