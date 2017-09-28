var Event = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
    event_date: React.PropTypes.string,
    place: React.PropTypes.string,
    description: React.PropTypes.string
  },
  render: function() {
    var event = this.props.event;
    return(
      <div className="row">
        <div className="col-md-3">{event.name}</div>
        <div className="col-md-2">{event.event_date}</div>
        <div className="col-md-3">{event.place}</div>
        <div className="col-md-4">{event.description}</div>
      </div>
    )
  }
});