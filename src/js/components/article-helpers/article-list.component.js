class ArticleListCtrl {
  constructor(Articles, $scope) {
    'ngInject';

    this._Articles = Articles;

    this.setListTo(this.listConfig);

    $scope.$on('setPageTo', (ev, pageNumber) => {
      this.setPageTo(pageNumber);
    });
  }

  setListTo(newList) {
    // Set the current list to an empty array
    this.list = [];

    // Set listConfig to the new list's config
    this.listConfig = newList;

    this.runQuery();
  }

  setPageTo(pageNumber){
    this.listConfig.currentPage = pageNumber;
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

    if(!this.listConfig.currentPage) {
      this.listConfig.currentPage = 1;
    }

    // queryConfig.filters.offset = (this.limit * (this.listConfig.currentPage - 1))

    // Run the query
    this._Articles
      .query(queryConfig)
      .then(
        (res) => {
          this.loading = false;

          // Update list and total pages
          this.list = res.articles;

          this.listConfig.totalPages = Math.ceil(res.articlesCount / this.limit);
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
