const baseUrl =
  'https://pixabay.com/api/?image_type=photo&orientation=horizontal';
const proxyUrl = 'https://cors-anywhere.herokuapp.com/';
export default {
  page: 1,
  query: '',
  per_page: 12,
  fetchImage(query) {
    const key = '16514596-ae86f2ec8e88e471e6f58eaaa';
    const requestParams = `&q=${this.query}&page=${this.page}&per_page=${this.per_page}&key=`;

    return fetch(proxyUrl + baseUrl + requestParams + key).then(response =>
      response.json().then(parsedResponse => {
        this.incrementPage();
        return parsedResponse.hits;
      }),
    );
  },
  get searchQuery() {
    return this.query;
  },
  set searchQuery(value) {
    this.query = value;
  },
  incrementPage() {
    this.page += 1;
  },
  resetPage() {
    this.page = 1;
  },
};

// key Pixabay('16514596-ae86f2ec8e88e471e6f58eaaa');
// /pixabay.com/api/?image_type=photo&orientation=horizontal&q=что_искать&page=номер_страницы&per_page=12&key=твой_ключ
