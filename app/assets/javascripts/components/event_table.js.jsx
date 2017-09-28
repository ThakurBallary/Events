var EventTable = React.createClass({
  render: function() {
    var events = [];
    this.props.events.forEach(function(event) {
      events.push(<Event event={event}
                         key={'event' + event.id}/>);
    }.bind(this));
    return(
      <div className="list">
        <div className="list-head row">
          <div className="col-md-3">Name</div>
          <div className="col-md-2">Date</div>
          <div className="col-md-3">Place</div>
          <div className="col-md-4">Description</div>
        </div>
        <div className="list-body">
          {events}
        </div>
      </div>
    )
  }
});