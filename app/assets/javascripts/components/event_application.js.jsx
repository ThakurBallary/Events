var EventApplication = React.createClass({
  getInitialState: function() {
    return { events: [],
             sort: "name",
             order: "asc",
             page: 1,
             pages: 0 };
  },
  componentDidMount: function() {
    this.getDataFromApi(this.state.page);
  },
  getDataFromApi: function(page) {
    var self = this;
    $.ajax({
      url: '/api/events',
      data: { page: page },
      success: function(data) {
        self.setState({ events: data.events, pages: parseInt(data.pages), page: parseInt(data.page) });
      },
      error: function(xhr, status, error) {
        alert('Cannot get data from API: ', error);
      }
    });
  },
  handleSearch: function(events) {
    this.setState({ events: events });
  },
  handleAdd: function() {
    this.getDataFromApi(this.state.page);
  },
  handleDeleteRecord: function() {
    this.getDataFromApi(this.state.page);
  },
  handleUpdateRecord: function(old_event, event) {
    var events = this.state.events.slice();
    var index = events.indexOf(old_event);
    events.splice(index, 1, event);
    this.setState({ events: events });
  },
  handleSortColumn: function(name, order) {
    if (this.state.sort != name) {
      order = 'asc';
    }
    $.ajax({
      url: '/api/events',
      data: { sort_by: name, order: order },
      method: 'GET',
      success: function(data) {
        console.log(data);
        this.setState({ events: data.events, sort: name, order: order });
      }.bind(this),
      error: function(xhr, status, error) {
        alert('Cannot sort events: ', error);
      }
    });
  },
  handleChangePage: function(page) {
    this.getDataFromApi(page);
  },
  render: function() {
    return(
      <div className="container">
        <h4 className="mt-2 header">Events</h4>
        <div className="row">
          <div className="col-md-12">
            <NewForm handleAdd={this.handleAdd} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-4">
            <SearchForm handleSearch={this.handleSearch} />
          </div>
        </div>
        <div className="row">
          <div className="col-md-12">
            <EventTable events={this.state.events}
                        sort={this.state.sort}
                        order={this.state.order}
                        handleUpdateRecord={this.handleUpdateRecord}
                        handleDeleteRecord={this.handleDeleteRecord}
                        handleSortColumn={this.handleSortColumn} />
            <Pagination page={this.state.page}
                    pages={this.state.pages}
                    handleChangePage={this.handleChangePage} />            
          </div>
        </div>
      </div>
    )
  }
});