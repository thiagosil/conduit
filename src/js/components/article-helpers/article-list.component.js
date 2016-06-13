class ArticleListCtrl {
  constructor(Articles) {
    'ngInject';

    this._Articles = Articles;

    this.setListTo(this.listConfig);

  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  runQuery() {
    // Show the loading indicator
    this.loading = true;

    // Create an object for this query
    let queryConfig = {
      type: this.listConfig.type,
      filters: this.listConfig.filters || {}
    };

    // Set the limit filter from the component's attribute
    queryConfig.filters.limit = this.limit;

    // Run the query
    this._Articles
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.articles;
        }
      );
  }

}

let ArticleList = {
  bindings: {
    limit: '=',
    listConfig: '='
  },
  controller: ArticleListCtrl,
  templateUrl: 'components/article-helpers/article-list.html'
};

export default ArticleList;
